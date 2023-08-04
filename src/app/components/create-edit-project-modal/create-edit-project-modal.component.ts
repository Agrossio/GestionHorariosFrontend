import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonData } from 'src/app/models/Response/PersonResponse';
import { ProjectData } from 'src/app/models/Response/ProjectResponse';
import { AlertsService } from 'src/app/services/alerts.service';
import { ClientsService } from 'src/app/services/clients.service';
import { DataService } from 'src/app/services/data.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-edit-project-modal',
  templateUrl: './create-edit-project-modal.component.html',
  styleUrls: ['./create-edit-project-modal.component.css'],
})
export class CreateEditProjectModalComponent implements OnInit {
  @Input() modalTitle: string = '';
  @Input() modalButtonText: string = '';
  @Input() projectSelected: any;
  @Output() modalClosed = new EventEmitter();

  showSuggestions: boolean = false;
  users: PersonData[] = [];
  newDeveloperName: string = '';
  developers: string[] = [];
  matchingDevelopers: string[] = [];
  clientsGet: any[] | null = [];
  projectForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private clientService: ClientsService,
    private service: ProjectsService,
    private alertService: AlertsService,
    private userService: UsersService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      project_name: ['', [Validators.required, Validators.maxLength(45)]],
      client_id: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      stack: ['', [Validators.required, Validators.maxLength(45)]],
      hours_estimate: ['', [Validators.required]],
      hour_price: ['', [Validators.required]],
      end_estimate_date: ['', [Validators.required]],
      people: ['', []],
      initial_date: ['', []],
    });

    if (this.projectSelected) {
      this.projectForm.patchValue({
        project_name: this.projectSelected.name,
        client_id: this.projectSelected.client_id,
        description: this.projectSelected.description,
        stack: this.projectSelected.stack,
        hours_estimate: this.projectSelected.hours_estimate,
        hour_price: this.projectSelected.hour_price,
        end_estimate_date: this.projectSelected.end_estimate_date,
      });
      this.developers = this.projectSelected.people.map(
        (person: any) => `${person.name} ${person.lastname}`
      );
    }

    this.clientService.getAllClients().subscribe({
      next: (res) => {
        this.clientsGet = res.data;
      },
      error: (err) => {
        if (err.status == 403) {
          this.modalService.dismissAll();
          this.alertService.tokenTimeOut();
        } else {
          this.alertService.alert(
            'error',
            'Hubo un problema al procesar la solicitud',
            false
          );
        }
      },
    });

    if (this.userService.users.length != 0) {
      this.users = this.userService.users;
    } else {
      this.dataService.getUsers().subscribe({
        next: (list) => {
          this.users = list.data as PersonData[];
          this.userService.users = list.data as PersonData[];
        },
        error: (err) => {
          if (err.status == 403) {
            this.alertService.tokenTimeOut();
          } else {
            this.alertService.alert(
              'error',
              'Hubo un problema al procesar la solicitud',
              false
            );
          }
        },
      });
    }
    this.projectForm.patchValue({ client_id: 'client' });
  }

  addDeveloper(event: Event) {
    event.preventDefault();
    if (this.projectForm.value.people != '') {
      this.developers.push(this.newDeveloperName);
      this.newDeveloperName = '';
    }
  }

  removeDeveloperFromList(developer: string) {
    const index = this.developers.indexOf(developer);
    if (index !== -1) {
      this.developers.splice(index, 1);
    }
  }

  filterDevelopers() {
    this.showSuggestions = true;
    const searchValue = this.projectForm.value.people.toLowerCase().trim();
    if (searchValue.length >= 3) {
      const matchingUsers = this.users.filter((developer) =>
        developer.name.toLowerCase().includes(searchValue)
      );
      const allMatchingDevelopers = matchingUsers.map(
        (user) => `${user.name} ${user.lastname}`
      );
      this.matchingDevelopers = allMatchingDevelopers.filter(
        (developer) => !this.developers.includes(developer)
      );
    } else {
      this.matchingDevelopers = [];
    }
  }

  addDeveloperFromSuggestion(developer: string) {
    this.developers.push(developer);
    this.newDeveloperName = '';
    this.hideSuggestions();
  }

  hideSuggestions() {
    this.showSuggestions = false;
  }

  createProject(): any {
    const developersArray = [];
    for (let index = 0; index < this.developers.length; index++) {
      const foundUser = this.users.find(
        (user) => `${user.name} ${user.lastname}` == this.developers[index]
      );
      if (foundUser != undefined) {
        developersArray.push(foundUser);
      } else {
        return this.alertService.alert(
          'error',
          `Uno de los usuarios ingresados (${this.developers[index]}) no existe en la base de datos`,
          false
        );
      }
    }
    const newProject = {
      name: this.projectForm.value.project_name,
      description: this.projectForm.value.description,
      stack: this.projectForm.value.stack,
      hours_estimate: this.projectForm.value.hours_estimate,
      hour_price: this.projectForm.value.hour_price,
      end_estimate_date: this.projectForm.value.end_estimate_date,
      // #TODO Refactorizar, buscando por nombre del cliente y agregando usuarios.
      // *******************
      client_id: this.projectForm.value.client_id,
      // *******************
      people: developersArray,
    };

    this.service.addProject(newProject).subscribe({
      next: (resp) => {
        if (resp != null) {
          this.alertService
            .alert('success', 'El Proyecto se creó correctamente', false)
            .then((result) => {
              if (result.isConfirmed) {
                this.modalService.dismissAll();
              }
            });
        }
        this.projectForm.reset();
        this.service.addNewProject(<ProjectData>resp.data);
      },
      error: (err) => {
        if (err.status == 403) {
          this.alertService.tokenTimeOut();
        } else if ((err.status = 409)) {
          this.alertService.alert(
            'error',
            'Ya existe un proyecto con ese nombre',
            false
          );
        } else {
          this.alertService.alert(
            'error',
            'Hubo un problema al procesar la solicitud',
            false
          );
        }
      },
    });
  }

  modifyProject(): any {
    const developersArray = [];
    for (let index = 0; index < this.developers.length; index++) {
      const foundUser = this.users.find(
        (user) => `${user.name} ${user.lastname}` == this.developers[index]
      );
      if (foundUser != undefined) {
        developersArray.push(foundUser);
      } else {
        return this.alertService.alert(
          'error',
          `Uno de los usuarios ingresados (${this.developers[index]}) no existe en la base de datos`,
          false
        );
      }
    }
    const updatedClient = {
      project_id: this.projectSelected!.project_id,
      name: this.projectForm.value.project_name,
      description: this.projectForm.value.description,
      stack: this.projectForm.value.stack,
      hours_estimate: this.projectForm.value.hours_estimate,
      hour_price: this.projectForm.value.hour_price,
      end_estimate_date: this.projectForm.value.end_estimate_date,
      // *******************
      client_id: this.projectForm.value.client_id,
      // *******************
      people: developersArray,
    };

    if (
      JSON.stringify(updatedClient) === JSON.stringify(this.projectSelected)
    ) {
      this.alertService.alert(
        'error',
        'No se actualizó el projecto. Debe modificar al menos un campo.',
        false
      );
    }

    this.service
      .updateProject(this.projectSelected!.project_id, updatedClient)
      .subscribe({
        next: (resp) => {
          if (resp != null) {
            this.alertService
              .alert('success', 'El proyecto se modificó correctamente.', false)
              .then((result) => {
                if (result.isConfirmed) {
                  this.modalService.dismissAll();
                }
              });
          }
          this.projectForm.reset();
          const oldProject = this.projectSelected;
          this.projectSelected = <ProjectData>resp.data;
          this.service.renderUpdateProject(oldProject, this.projectSelected);
        },
        error: (err) => {
          if (err.status == 403) {
            this.alertService.tokenTimeOut();
          } else if ((err.status = 409)) {
            this.alertService.alert(
              'error',
              'Ya existe un proyecto con ese nombre',
              false
            );
          } else {
            this.alertService.alert(
              'error',
              'Hubo un problema al procesar la solicitud',
              false
            );
          }
        },
      });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.modalClosed.emit();
  }

  validateYear(id: string, name: string) {
    const input: HTMLInputElement = document.getElementById(
      id
    ) as HTMLInputElement;
    const selectedDate: string = input.value;
    const parts: string[] = selectedDate.split('-');
    const year: number = parseInt(parts[0]);
    const initialDateControl: AbstractControl<any, any> | null =
      this.projectForm.get(name);
    if (initialDateControl) {
      if (year.toString().length !== 4) {
        initialDateControl.setErrors({ invalidYear: true });
      } else {
        initialDateControl.setErrors(null);
      }
    }
  }
}
