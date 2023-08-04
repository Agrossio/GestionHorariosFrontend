import { Component, Input, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TaskRequest } from 'src/app/models/Request/TaskRequest';
import { AlertsService } from 'src/app/services/alerts.service';
import { TasksService } from 'src/app/services/tasks.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectAdminViewComponent } from 'src/app/pages/project-admin-view/project-admin-view.component';

@Component({
  selector: 'app-create-edit-task-modal',
  templateUrl: './create-edit-task-modal.component.html',
  styleUrls: ['./create-edit-task-modal.component.css'],
})
export class CreateEditTaskModalComponent {

  @Input()project_id!: number;
  @Input()modalButtonText!: String;
  @Input()taskId!: number;

  showLoader: boolean = false;
  taskForm: FormGroup = new FormGroup({});
  modalTitle: string = '';
  modalButton: string = '';

  isModalVisible: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private modalService: NgbModal,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    const currentDate = new Date();
    this.taskForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      horas_estimadas: ['', [Validators.required]],
      prioridad: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      fechaI: [
        currentDate.toISOString().substring(0, 10),
        [Validators.required],
      ],
      fechaF: [
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 5
        )
          .toISOString()
          .substring(0, 10),
        [Validators.required],
      ],
    });
    this.taskForm.patchValue({ prioridad: 'LOW' });
    this.taskForm.patchValue({ estado: 'PENDING' });

    this.modalTitle =
      this.modalButtonText === 'Crear' ? 'Crear Tarea' : 'Editar Tarea';
    this.modalButton = this.modalButtonText === 'Editar' ? 'Editar' : 'Crear';
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValues = this.taskForm.value;
      const valores: TaskRequest = {
        title: formValues.titulo,
        description: formValues.descripcion,
        hours_estimate: formValues.horas_estimadas,
        priority_name: formValues.prioridad,
        status_name: formValues.estado,
        story_points: formValues.puntos,
        project_id: this.project_id,
        start_date: formValues.fechaI,
        end_date: formValues.fechaF,
      };

      this.taskService.createTask(valores).subscribe({
        next: (res) => {
          this.alertService.alert('success', "Tus datos fueron registrados exitosamente.", false).then((result) => {
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
            this.modalService.dismissAll();
            this.alertService.alert(
              'error',
              'Hubo un problema al procesar la solicitud',
              false
            );
          }
        },
      });
    } else {
      this.alertService.alert(
        'warning',
        'Formulario invalido. Por favor, revise los datos ingresados y envielos nuevamente.',
        true
      );
    }
    this.closeModal();
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal(){
    this.isModalVisible = false;
  }

  editTask(taskId: number): void {
    const formValues = this.taskForm.value;
    const taskEdited = {
      title: formValues.titulo,
      description: formValues.descripcion,
      hours_estimate: formValues.horas_estimadas,
      priority_name: formValues.prioridad,
      status_name: formValues.estado,
      story_points: formValues.puntos,
      project_id: this.project_id,
      start_date: formValues.fechaI,
      end_date: formValues.fechaF,
    };

    this.alertService
      .alert('question', 'Seguro que desea realizar los cambios?', true)
      .then((result) => {
        if (result.isConfirmed) {
          this.taskService.updateTask(taskId, taskEdited).subscribe({
            next: (resp) => {
              this.alertService.alert(
                'success',
                'Tus datos fueron registrados exitosamente.',
                false
              );
            },
            error: (err) => {
              if (err.status == 403) {
                this.modalService.dismissAll();
                this.alertService.tokenTimeOut();
              } else {
                this.modalService.dismissAll();
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
      this.closeModal();
  }

  validateYear(id: string, name: string) {
    const input: HTMLInputElement = document.getElementById(
      id
    ) as HTMLInputElement;
    const selectedDate: string = input.value;
    const parts: string[] = selectedDate.split('-');
    const year: number = parseInt(parts[0]);
    const initialDateControl: AbstractControl<any, any> | null =
      this.taskForm.get(name);
    if (initialDateControl) {
      if (year.toString().length !== 4) {
        initialDateControl.setErrors({ invalidYear: true });
      } else {
        initialDateControl.setErrors(null);
      }
    }
  }
}
