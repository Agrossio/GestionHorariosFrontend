import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/services/alerts.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-status-task-modal',
  templateUrl: './edit-status-task-modal.component.html',
  styleUrls: ['./edit-status-task-modal.component.css']
})
export class EditStatusTaskModalComponent implements OnInit{

  @Input() taskSelected!: any;
  formChangeStatus: FormGroup = new FormGroup({});
  showInputHoursWorked: boolean = false;
  
  constructor(
    private taskService: TasksService,
    private alertService: AlertsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.formChangeStatus = this.formBuilder.group({
      status: [this.taskSelected.status_name, [Validators.required]]
    })
  }

  addInputHoursWorked() { 
    if (this.formChangeStatus.value.status === "DONE") {
      this.showInputHoursWorked = true;
    } else { 
      this.showInputHoursWorked = false;
    }
  }

  editStatus() { 
    if (
      this.taskSelected.status_name === this.formChangeStatus.value.status
    ) {
      this.alertService.alert(
        'error',
        'No se actualizó el status de la tarea. Debe seleccionar un status diferente.',
        false
      );
    } else { 
      this.taskService.editStatusTask(this.formChangeStatus.value.status, this.taskSelected.task_id).subscribe({
        next: (resp) => {  
          if (resp != null) {
            this.alertService
              .alert('success', 'A la tarea se le modificó el status correctamente.', false)
              .then((result) => {
                if (result.isConfirmed) {
                  this.modalService.dismissAll();
                  window.location.reload();
                }
              });
          }
        },
        error: (err) => {
          this.alertService.alert(
            'error',
            'Hubo un problema al procesar la solicitud',
            false
          );
        },
      });
    }
  }

  cancelAssignTask() { 
    this.modalService.dismissAll();
  }
}