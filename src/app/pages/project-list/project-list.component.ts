import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProjectData } from '../../models/Response/ProjectResponse';
import { ProjectsService } from '../../services/projects.service';
import { TaskData } from 'src/app/models/Response/TaskResponse';
import { TasksService } from 'src/app/services/tasks.service';
import { DataService } from 'src/app/services/data.service';
import { PersonData } from 'src/app/models/Response/PersonResponse';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  selectedProjectIndex: number = -1;
  projectSelected!: ProjectData;
  view: string = 'Detalles';

  rolAdmin: boolean = false;
  rolDeveloper: boolean = false;
  rolManagement: boolean = false;

  modalTitle: String = '';
  modalButtonText: String = '';
  projects: ProjectData[] = [];
  filterProject: string = '';
  currenteDate: number = new Date().getDate(); //para comparar fecha
  showLoader: boolean = true;
  developer: any=[];

  constructor(
    private service: ProjectsService,
    private dataService: DataService,
    private alertService: AlertsService,
  ) {
    this.service.projectEvent.subscribe((projectsInService: ProjectData[]) => {
      this.projects = projectsInService;
    });
  }

  ngOnInit(): void {
    this.service.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data as ProjectData[];
        this.service.projects = res.data as ProjectData[];
        this.showLoader = false;
      },
      error: (err) =>{
        if (err.status == 403) {
          this.alertService.tokenTimeOut();
        } else {
          this.alertService.alert(
            'error',
            'Hubo un problema al procesar la solicitud',
            false
          );
        }
      }
    });
    this.dataService.getByEmail(sessionStorage.getItem('email')).subscribe(data =>{
      this.developer = data;
    })
    if (sessionStorage.getItem('roles')?.includes('ADMIN')) {
      this.rolAdmin = true;
    } else if (sessionStorage.getItem('roles')?.includes('DEVELOPER')) {
      this.rolDeveloper = true;
    } else if (sessionStorage.getItem('roles')?.includes('MANAGEMENT')) {
      this.rolManagement = true;
    }
  }

  selectionarProject() { 
    console.log(this.projectSelected.project_id)
  }
}
