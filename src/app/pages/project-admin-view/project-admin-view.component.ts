import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectData } from 'src/app/models/Response/ProjectResponse';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';
import { ReportService } from 'src/app/services/report.service';
import { TaskData } from 'src/app/models/Response/TaskResponse';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-project-admin-view',
  templateUrl: './project-admin-view.component.html',
  styleUrls: ['./project-admin-view.component.css'],
})
export class ProjectAdminViewComponent {
  formMode: 'create' | 'edit' = 'create';

  projectId!: number;
  taskId!: number;
  projectSelected: ProjectData | null = null;
  modalTitle: String = '';
  modalButtonText: String = '';
  closeResult = '';
  size!: number;
  totalElements!: number;
  totalPages!: number;
  tasks: any[] | undefined;
  currentPage!: number;
  taskDone: number = 0;
  taskPending: number = 0;
  allTasks: any[] | undefined;
  people: any[] | undefined;
  graphAsImage: string = '';
  dataPercentages: number[] = [0, 0, 0, 0, 0];
  projectSelectedTasks: TaskData[] = [];
  loadedData: boolean = false;

  constructor(
    private projectService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertsService,
    private router: Router,
    private taskService: TasksService,
    private modalService: NgbModal,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.projectId = params['project-id'];
      this.projectService.getProjectById(this.projectId).subscribe({
        next: (resp) => {
          this.projectSelected = resp.data;
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
    });

    const STATUS: Record<string, () => void> = {
      DONE: () => this.dataPercentages[0]++,
      IN_PROGRESS: () => this.dataPercentages[1]++,
      PENDING: () => this.dataPercentages[2]++,
      REVIEWING: () => this.dataPercentages[3]++,
      CANCELLED: () => this.dataPercentages[4]++,
    };
    this.taskService.getTaskByProjectId(this.projectId, 0).subscribe((data) => {
      this.tasks = data.data.content;
      this.tasks!.forEach((task) => {
        STATUS[task.status_name]();
      });
      if (this.dataPercentages.reduce((acc, el) => acc + el, 0) == 0) {
        this.dataPercentages[2]++;
      }
      this.loadedData = true;
      this.size = data.data.size;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
      this.currentPage = data.data.pageable.pageNumber;
    });
    this.projectService.getProjectById(this.projectId).subscribe((data) => {
      this.people = data.data.people;
    });

    this.taskService.getAllTasks(this.projectId).subscribe((data) => {
      this.allTasks = data.data.content;
      this.allTasks?.forEach((element) => {
        if (element.status_name === 'DONE') {
          this.taskDone++;
        } else if (element.status_name != 'CANCELLED') {
          this.taskPending++;
        }
      });
    });
  }
  getGraphAsImage(graphFromChart: string): void {
    this.graphAsImage = graphFromChart;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.previousPage();
    } else if (event.key === 'ArrowRight') {
      this.nextPage();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchData();
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchData();
    }
  }

  fetchData() {
    this.taskService
      .getTaskByProjectId(this.projectId, this.currentPage)
      .subscribe((data) => {
        this.currentPage = data.data.pageable.pageNumber;
        this.size = data.data.size;
        this.totalPages = data.data.totalPages;
        this.totalElements = data.data.totalElements;
        this.tasks = data.data.content;
      });
  }

  createPDF() {
    this.reportService.createPDF(
      this.projectSelected!,
      this.graphAsImage,
      this.dataPercentages
    );
  }

  deleteProject(projectId: number) {
    this.alertService
      .alert('question', 'Seguro que desea eliminar el proyecto?', true)
      .then((result) => {
        if (result.isConfirmed) {
          this.projectService.deleteProject(projectId).subscribe({
            next: (resp) => {
              this.alertService.alert('success', 'Proyecto eliminado', false);
              this.router.navigate(['/projects']);
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

  openForm(mode: 'create' | 'edit') {
    this.formMode = mode;
  }

  saveIdTask(idTask: number) {
    this.taskId = idTask;
  }

  async deleteTask(taskId: number): Promise<void> {
    const confirmed = await this.alertService
      .alert('question', 'Seguro que desea eliminar el proyecto?', true);
        if (confirmed.isConfirmed) {
          try {
            const res = await firstValueFrom(this.taskService.deleteTask(taskId));
            this.alertService.alert('success', 'Tarea eliminada.', false);
            if(this.tasks){
              const index = this.tasks.findIndex((task) => task.task_id === taskId);
              if(index !== -1){
                this.tasks.splice(index, 1);
              }
            }
          } catch (error) {
            this.alertService.alert(
              'error',
              'Hubo un problema al procesar la solicitud',
              false
            ); 
          }
        }
      
  }

  // -------------- MODAL -----------------------
  setModalTexts(modalTitle: String, modalButtonText: String) {
    this.modalTitle = modalTitle;
    this.modalButtonText = modalButtonText;
  }

  open(content: any) {
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
  peopleDetail() {
    const listItems = this.people
      ?.map(
        (person) =>
          `<div style="margin-bottom: 25px; font-size: 18px; border: 1px solid #4B3832; border-radius: 10px;">${person.name} ${person.lastname} - ${person.email}</div>`
      )
      .join('');

    Swal.fire({
      title: 'Integrantes del proyecto',
      html: `<ul style="list-style: none;">${listItems}</ul>`,
      customClass: {
        container: 'custom-swal-container',
      },
    });
  }
}
