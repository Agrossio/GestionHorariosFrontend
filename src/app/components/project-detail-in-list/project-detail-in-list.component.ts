import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectData } from 'src/app/models/Response/ProjectResponse';
import { TaskData } from 'src/app/models/Response/TaskResponse';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ReportService } from 'src/app/services/report.service';
import { TasksService } from 'src/app/services/tasks.service';
import { CreateEditProjectModalComponent } from '../create-edit-project-modal/create-edit-project-modal.component';

@Component({
  selector: 'app-project-detail-in-list',
  templateUrl: './project-detail-in-list.component.html',
  styleUrls: ['./project-detail-in-list.component.css'],
})
export class ProjectDetailInListComponent implements OnChanges, OnInit {
  @Input() rolAdmin: boolean = false;
  @Input() rolDeveloper: boolean = false;
  @Input() rolManagement: boolean = false;
  @Input() projectSelected!: ProjectData;
  @Input() projectSelectedTasks: TaskData[] = [];
  graphAsImage: string = '';
  dataPercentages: number[] = [0, 0, 0, 0, 0];
  loadedData: boolean = false;
  project_id!: number;

  constructor(
    private service: ProjectsService,
    private alertService: AlertsService,
    private modalService: NgbModal,
    private taskService: TasksService,
    private router: Router,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.project_id = this.projectSelected.project_id
  }
  
  ngOnChanges(): void {
    this.loadedData = false;
    this.graphAsImage = '';
    this.dataPercentages = [0, 0, 0, 0, 0];
    if (this.rolAdmin || this.rolManagement) {
      const STATUS: Record<string, () => void> = {
        DONE: () => this.dataPercentages[0]++,
        IN_PROGRESS: () => this.dataPercentages[1]++,
        PENDING: () => this.dataPercentages[2]++,
        REVIEWING: () => this.dataPercentages[3]++,
        CANCELLED: () => this.dataPercentages[4]++,
      };
      this.taskService.getAllTasks(this.projectSelected.project_id).subscribe({
        next: (resp) => {
          this.projectSelectedTasks = resp.data.content as TaskData[];
          this.projectSelectedTasks.forEach((task) => {
            STATUS[task.status_name]();
          });
          if (this.dataPercentages.reduce((acc, el) => acc + el, 0) == 0) {
            this.dataPercentages[2]++;
          }
          this.loadedData = true;
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
  }

  getGraphAsImage(graphFromChart: string): void {
    this.graphAsImage = graphFromChart;
  }

  createPDF() {
    this.reportService.createPDF(
      this.projectSelected,
      this.graphAsImage,
      this.dataPercentages
    );
  }

  deleteProject(projectId: number) {
    this.alertService
      .alert('question', 'Seguro que desea eliminar el proyecto?', true)
      .then((result: any) => {
        if (result.isConfirmed) {
          this.service.deleteProject(projectId).subscribe({
            next: (resp: any) => {
              this.alertService.alert('success', 'Proyecto eliminado', false);
              this.service.renderDeleteProject(this.projectSelected);
            },
            error: (err: any) => {
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

  openModal() {
    const modalRef = this.modalService.open(CreateEditProjectModalComponent);
    modalRef.componentInstance.modalTitle = 'Editar proyecto';
    modalRef.componentInstance.modalButtonText = 'Editar';
    modalRef.componentInstance.projectSelected = this.projectSelected;
    modalRef.componentInstance.modalClosed.subscribe();
  }

  viewTask(){
    this.project_id = this.projectSelected.project_id;
  }

}
