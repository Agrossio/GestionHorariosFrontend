import { Component, Input, OnInit } from '@angular/core';
import { SprintData } from 'src/app/models/Response/SprintResponse';
import { SprintsService } from 'src/app/services/sprints.service';
import { AlertsService } from 'src/app/services/alerts.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addDays, format } from 'date-fns';

@Component({
  selector: 'app-create-edit-sprint-modal',
  templateUrl: './create-edit-sprint-modal.component.html',
  styleUrls: ['./create-edit-sprint-modal.component.css'],
})
export class CreateEditSprintModalComponent implements OnInit {
  @Input() projectId!: number;

  sprintEditStates: { [sprintId: number]: boolean } = {};
  boxPrincipalSprint: boolean = true;
  formCreateSprint: boolean = false;
  sprints!: SprintData[];
  sprintsSelected: { [sprintId: number]: any } = {};
  editSprintForms: { [sprintId: number]: FormGroup } = {};
  createSprintForm: FormGroup = new FormGroup({});
  numberNewSprint!: number;
  lastSprintId!: number;
  dateLastSprint!: Date;
  dateTwoWeeksLater!: Date;

  constructor(
    private sprintService: SprintsService,
    private alertService: AlertsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.sprintService.getAllSprintByProjectId(this.projectId).subscribe({
      next: (res) => {
        this.sprints = res.data.content as SprintData[];
        this.createEditSprintForms();
        this.lastSprintId = this.sprints[this.sprints.length - 1].sprint_id;
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

  createEditSprintForms() {
    for (const sprint of this.sprints) {
      this.editSprintForms[sprint.sprint_id] = this.formBuilder.group({
        start_date: [sprint.start_date, [Validators.required]],
        end_date: [sprint.end_date, [Validators.required]],
      });
      this.sprintsSelected[sprint.sprint_id] = {
        start_date: sprint.start_date,
        end_date: sprint.end_date,
      };
    }
  }

  showformEditSprint(sprint_id: number) {
    this.sprintEditStates[sprint_id] = true;
    this.boxPrincipalSprint = false;
  }

  cancelEdit(sprintId: number) {
    delete this.sprintEditStates[sprintId];
    this.boxPrincipalSprint = true;
  }

  modifySprint(sprintId: number) {
    const formDataSprintEdited = this.editSprintForms[sprintId].value;
    if (
      JSON.stringify(formDataSprintEdited) ===
      JSON.stringify(this.sprintsSelected[sprintId])
    ) {
      this.alertService.alert(
        'error',
        'No se actualizó el sprint. Debe modificar al menos un campo.',
        false
      );
    } else {
      this.sprintService
        .updateSprint(sprintId, formDataSprintEdited)
        .subscribe({
          next: (resp) => {
            if (resp != null) {
              this.alertService
                .alert('success', 'El Sprint se modificó correctamente.', false)
                .then((result) => {
                  if (result.isConfirmed) {
                    this.modalService.dismissAll();
                  }
                });
            }
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
  }

  showFormCreateSprint() {
    this.formCreateSprint = true;
    this.numberNewSprint =
      this.sprints[this.sprints.length - 1].sprint_number + 1;
    this.dateLastSprint = new Date(
      this.sprints[this.sprints.length - 1].end_date
    );
    this.dateTwoWeeksLater = addDays(this.dateLastSprint, 14);
    this.createSprintForm = this.formBuilder.group({
      start_date: [
        format(this.dateLastSprint, 'yyyy-MM-dd'),
        [Validators.required],
      ],
      end_date: [
        format(this.dateTwoWeeksLater, 'yyyy-MM-dd'),
        [Validators.required],
      ],
    });
  }

  createSprint() {
    const newSprint = {
      sprint_number: this.numberNewSprint,
      start_date: this.createSprintForm.value.start_date,
      end_date: this.createSprintForm.value.end_date,
      project_id: this.projectId,
    };

    this.sprintService.addSprint(newSprint).subscribe({
      next: (resp) => {
        if (resp != null) {
          this.alertService
            .alert('success', 'El Sprint se creó correctamente', false)
            .then((result) => {
              if (result.isConfirmed) {
                this.modalService.dismissAll();
                window.location.reload();
              }
            });
        }
        this.createSprintForm.reset();
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
  cancelCreate() {
    this.formCreateSprint = false;
  }

  deleteSprint(sprintId: number) {
    this.alertService
      .alert('question', 'Seguro que desea eliminar el proyecto?', true)
      .then((result) => {
        if (result.isConfirmed) {
          this.sprintService.deleteSprint(sprintId).subscribe({
            next: (resp) => {
              this.alertService
                .alert('success', 'Sprint eliminado', false)
                .then((result) => {
                  if (result.isConfirmed) {
                    this.modalService.dismissAll();
                    window.location.reload();
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
      });
  }
  validateYear(id: string, name: string, sprintId: number) {
    const input: HTMLInputElement = document.getElementById(
      id
    ) as HTMLInputElement;
    const selectedDate: string = input.value;
    const parts: string[] = selectedDate.split('-');
    const year: number = parseInt(parts[0]);
    const initialDateControl: AbstractControl<any, any> | null =
      this.createSprintForm.get(name);
    const sprintForm: FormGroup = this.editSprintForms[sprintId];
    if (sprintForm) {
      const initialDateControlEdit: AbstractControl<any, any> | null =
        sprintForm.get(name);
      if (initialDateControlEdit && sprintId != -1) {
        if (year.toString().length !== 4) {
          initialDateControlEdit.setErrors({ invalidYear: true });
        } else {
          initialDateControlEdit.setErrors(null);
        }
      }
    }
    if (initialDateControl) {
      if (year.toString().length !== 4) {
        initialDateControl.setErrors({ invalidYear: true });
      } else {
        initialDateControl.setErrors(null);
      }
    }
  }
}
