import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectData} from 'src/app/models/Response/ProjectResponse';
import {AlertsService} from 'src/app/services/alerts.service';
import {ProjectsService} from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {

  projectId!: number;
  projectSelected: ProjectData | null = null;

  constructor(private projectService: ProjectsService,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params['project-id'];
      this.projectService.getProjectById(this.projectId)
        .subscribe({
          next: (resp) => {
            this.projectSelected = resp.data
          },
          error: (err) => {
            this.alertService.alert('error', 'Hubo un problema al procesar la solicitud', false)
          }
        })
    })
  }

}
