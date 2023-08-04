import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProjectData } from '../../models/Response/ProjectResponse';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskData } from 'src/app/models/Response/TaskResponse';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{

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
    this.activatedRoute.params.subscribe( params => {
      this.projectId = params['project-id'];
      this.taskService.getAlltaskAvailables(this.projectId).subscribe({
        next: (res) => {
          this.tasks = res.data.content;     
        },
      }); 
    })
    if(sessionStorage.getItem('email') != null){
      const storedEmail = sessionStorage.getItem('email');
      this.email = storedEmail !== null ? storedEmail : 'default@example.com';
    }
    this.taskService.getAllTaskByDeveloper(this.email, this.projectId).subscribe({
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

  selectTask(task: any, index: number) {
    this.taskSelected = task;
    this.selectedProjectIndex = index;
    this.view = 'Detalles';
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
