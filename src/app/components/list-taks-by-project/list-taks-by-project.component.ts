import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TaskData } from 'src/app/models/Response/TaskResponse';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-list-taks-by-project',
  templateUrl: './list-taks-by-project.component.html',
  styleUrls: ['./list-taks-by-project.component.css']
})
export class ListTaksByProjectComponent implements OnInit, OnChanges{

  @Input() project_id!: number;

  selectedProjectIndex: number = -1;
  taskSelected: any;
  view: string = 'Detalles';

  rolAdmin: boolean = false;
  rolDeveloper: boolean = false;
  rolManagement: boolean = false;

  projectId!: number;
  tasks: any[] = [];
  tasksDev: any[] = [];
  filterTask: string = '';
  currenteDate: number = new Date().getDate();
  showLoader: boolean = true;
  allTasks: any[]|undefined;
  people: any[]|undefined;
  email!: string;
  modalTitle: String = '';
  modalButtonText: String = '';
  closeResult = '';

  constructor(
    private taskService: TasksService,
    private projectService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private alertService: AlertsService
  ){
    this.taskService.projectEvent.subscribe((tasksInService: TaskData[]) => {
      this.tasks = tasksInService;
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('email') != null){
      const storedEmail = sessionStorage.getItem('email');
      this.email = storedEmail !== null ? storedEmail : 'default@example.com';
    }
    this.taskService.getAllTaskByDeveloper(this.email, this.project_id).subscribe({
      next: (res) => {
        this.tasksDev = res.data.content;
      },
    }); 

    if (sessionStorage.getItem('roles')?.includes('ADMIN')) {
      this.rolAdmin = true;
    } else if (sessionStorage.getItem('roles')?.includes('DEVELOPER')) {
      this.rolDeveloper = true;
    } else if (sessionStorage.getItem('roles')?.includes('MANAGEMENT')) {
      this.rolManagement = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project_id']) {
      this.taskService.getAlltaskAvailables(this.project_id).subscribe({
        next: (res) => {
          this.tasks = res.data.content;     
        },
      });
    }
    this.taskService.getAllTaskByDeveloper(this.email, this.project_id).subscribe({
      next: (res) => {
        this.tasksDev = res.data.content;
      },
    }); 
  }

  selectTask(task: any, index: number) {
    this.taskSelected = task;
    this.selectedProjectIndex = index;
    this.view = 'Detalles';
    console.log("Id project " + this.project_id)
  }

  loadTask(){
    const projectId = 23;
    this.taskService.getAllTasks(projectId).subscribe(
      (res) => {
        this.tasks = res;
      }, (error) => {
        console.log(error);
      }
    );
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

}
