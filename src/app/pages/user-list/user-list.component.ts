import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/services/alerts.service';
import { PersonData } from '../../models/Response/PersonResponse';
import { DataService } from '../../services/data.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProjectsMockService } from '../../services/moks/projects-mock.service';
import { UsersService } from 'src/app/services/users.service';
import {SocketService} from "../../services/socket.service";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: PersonData[] | undefined = undefined;

  filterUser = '';
  userSelected: PersonData | null = null;
  selectedUserIndex: number = -1;
  solicitudes: PersonData[] | null = null;
  closeResult = '';
  emailModal = '';
  nameModal = '';
  acceptForm: FormGroup;
  personForm: FormGroup;
  view: string = 'Solicitudes';
  projectsClient!: any[];
  showLoader: boolean = true;

  connecteds: string[] = [];
  userConnected!: any[];
  valueConn!: string;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertsService,
    private personService: DataService,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private projectsMock: ProjectsMockService,
    private socket: SocketService
  ) {
    this.projectsClient = this.projectsMock.getProjectsClientUser();
    this.acceptForm = formBuilder.group({
      ADMIN: false,
      MANAGEMENT: false,
      DEVELOPER: false,
      startJobRelation: ['', Validators.compose([Validators.required])],
    });
    this.personForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(45)]],
      lastname: ['', [Validators.required, Validators.maxLength(45)]],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email, Validators.maxLength(45)],
      ],
      cuil: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      tel: ['', [Validators.required, Validators.maxLength(15)]],
      hours_journal: [null, [Validators.required, Validators.max(10)]],
      ADMIN: false,
      MANAGEMENT: false,
      DEVELOPER: false,
      startJobRelation: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  this.personService.getUsers().subscribe({
      next: (list) => {
        this.users = list.data as PersonData[];
        this.userService.users = list.data as PersonData[];
        this.personService.getSolicitudes().subscribe({
          next: (list) => {
            this.showLoader = false;
            this.solicitudes = list.data as PersonData[];
            this.socket.connecteds$.subscribe((connecteds) => {
              this.userConnected = this.users!.filter(user => connecteds.includes(user.email));
            });
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

  open(content: any, email: any, name: any) {
    this.emailModal = email;
    this.nameModal = name;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  acceptRequest(email: any) {
    let roleNames: string[] = [];
    if (this.acceptForm.value.ADMIN) roleNames.push('ADMIN');
    if (this.acceptForm.value.MANAGEMENT) roleNames.push('MANAGEMENT');
    if (this.acceptForm.value.DEVELOPER) roleNames.push('DEVELOPER');

    let accept = {
      email: email,
      roleNames: roleNames,
      start_job_relation: this.acceptForm.value.startJobRelation,
    };
    this.personService.acceptPerson(accept).subscribe({
      next: (user) => {
        this.solicitudes = this.solicitudes!.filter((u) => u.email !== email);
        this.alertService
          .alert('success', 'La solicitud se aceptó correctamente', false)
          .then((result) => {
            if (result.isConfirmed) {
              this.modalService.dismissAll();
            }
          });
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

  deletePerson(email: string) {
    this.alertService
      .alert('info', '¿Deseas eliminar este usuario?', true)
      .then((result) => {
        if (result.isConfirmed) {
          this.users = this.users?.filter((u) => u.email !== email);
          this.solicitudes = this.solicitudes!.filter((u) => u.email !== email);

          this.personService.delete(email).subscribe({
            next: (data) => {
              this.alertService.alert('success', 'Usuario eliminado', false);
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
      });
  }

  openUpdate(update: any) {
    this.personForm.patchValue({
      name: this.userSelected?.name,
      lastname: this.userSelected?.lastname,
      email: this.userSelected?.email,
      cuil: this.userSelected?.cuil,
      tel: this.userSelected?.tel,
      hours_journal: this.userSelected?.hours_journal,
      ADMIN: this.userSelected!.roles!.some((r) => r.role_name === 'ADMIN'),
      MANAGEMENT: this.userSelected!.roles!.some(
        (r) => r.role_name === 'MANAGEMENT'
      ),
      DEVELOPER: this.userSelected!.roles!.some(
        (r) => r.role_name === 'DEVELOPER'
      ),
      startJobRelation: this.userSelected?.start_job_relation,
    });
    this.modalService
      .open(update, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  updatePerson() {
    let roleNames: string[] = [];
    if (this.personForm.value.ADMIN) roleNames.push('ADMIN');
    if (this.personForm.value.MANAGEMENT) roleNames.push('MANAGEMENT');
    if (this.personForm.value.DEVELOPER) roleNames.push('DEVELOPER');
    let update: any = {
      name: this.personForm.value.name,
      lastname: this.personForm.value.lastname,
      email: this.personForm.value.email,
      cuil: this.personForm.value.cuil,
      tel: this.personForm.value.tel,
      start_job_relation: this.personForm.value.startJobRelation,
      hours_journal: this.personForm.value.hours_journal,
      roleNames: roleNames,
    };
    this.personService
      .adminUpdatePerson(this.userSelected?.email, update)
      .subscribe({
        next: (res) => {
          let updatedPerson = res.data as PersonData;
          let index = this.users?.findIndex(
            (u) => u.email === this.userSelected?.email
          );
          if (index !== -1) {
            this.users?.splice(index!, 1, updatedPerson);
          }
          this.alertService
            .alert('success', 'Usuario actualizado correctamente', false)
            .then((result) => {
              if (result.isConfirmed) {
                this.modalService.dismissAll();
              }
            });
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
  }

  selectUser(email: any) {
    this.personService.getByEmail(email).subscribe({
      next: (res) => {
        this.userSelected = res.data as PersonData;
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

  validateYear(id: string, name: string) {
    const input: HTMLInputElement = document.getElementById(
      id
    ) as HTMLInputElement;
    const selectedDate: string = input.value;
    const parts: string[] = selectedDate.split('-');
    const year: number = parseInt(parts[0]);
    const initialDateControl: AbstractControl<any, any> | null =
      this.acceptForm.get(name);
    const initialDateControlPerson: AbstractControl<any, any> | null =
      this.personForm.get(name);
    if (initialDateControl) {
      if (year.toString().length !== 4) {
        initialDateControl.setErrors({ invalidYear: true });
      } else {
        initialDateControl.setErrors(null);
      }
    }
    if (initialDateControlPerson) {
      if (year.toString().length !== 4) {
        initialDateControlPerson.setErrors({ invalidYear: true });
      } else {
        initialDateControlPerson.setErrors(null);
      }
    }
  }
}
