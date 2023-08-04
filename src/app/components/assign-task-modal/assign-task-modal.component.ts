import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/services/alerts.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-assign-task-modal',
  templateUrl: './assign-task-modal.component.html',
  styleUrls: ['./assign-task-modal.component.css']
})
export class AssignTaskModalComponent implements OnInit{

  @Input() taskSelected!: any;
  @Input() email!: string;

  constructor(
    private taskService: TasksService,
    private alertService: AlertsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void { 
    console.log(this.taskSelected)
  }

  assignTaskDev() { 
    this.taskService.assignTask(this.email, this.taskSelected.task_id).subscribe({
      next: (resp) => {
        if (resp != null) {
          this.alertService
            .alert('success', 'La tarea se le fue asignada correctamente.', false)
            .then((result) => {
              if (result.isConfirmed) {
                this.modalService.dismissAll();
              }
            });
        }
      },
      error: (err) => {
        console.log(err)
        this.alertService.alert(
          'error',
          'Hubo un problema al procesar la solicitud',
          false
        );
      },
    });
  }

  cancelAssignTask() { 
    this.modalService.dismissAll();
  }
}
