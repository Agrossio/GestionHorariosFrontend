import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ProjectData,
  ProjectResponse,
} from '../models/Response/ProjectResponse';
import { Observable } from 'rxjs';
import { ProjectRequest } from '../models/Request/ProjectRequest';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private SERVERURL = environment.apiUrl;
  projects: ProjectData[] = [];
  projectEvent: EventEmitter<ProjectData[]> = new EventEmitter<ProjectData[]>();

  constructor(private http: HttpClient) {}

  get serverUrl() {
    return this.SERVERURL;
  }

  addNewProject(newProject: ProjectData) {
    this.projects.push(newProject);
    this.projectEvent.emit(this.projects);
  }

  renderDeleteProject(projectDeleted: ProjectData) {
    const index = this.projects.indexOf(projectDeleted);
    if (index !== -1) {
      this.projects.splice(index, 1);
      this.projectEvent.emit(this.projects);
    }
  }

  renderUpdateProject(oldProject: ProjectData, newProject: ProjectData) {
    const index = this.projects.indexOf(oldProject);
    if (index !== -1) {
      this.projects[index] = newProject;
      this.projectEvent.emit(this.projects);
    }
  }

  httpOptionsWithToken(): object {
    let token: string | null = sessionStorage.getItem("token")
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getProjects(): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(
      `${this.SERVERURL}/project`,
      this.httpOptionsWithToken()
    );
  }

  getProjectById(projectId: number) {
    try {
      return this.http.get<any>(
        `${this.SERVERURL}/project/${projectId}`,
        this.httpOptionsWithToken()
      );
    } catch (error) {
      throw error;
    }
  }

  addProject(project: ProjectRequest): Observable<ProjectResponse> {
    try {
      return this.http.post<any>(
        `${this.SERVERURL}/project`,
        project,
        this.httpOptionsWithToken()
      );
    } catch (error) {
      throw error;
    }
  }

  updateProject(
    projectId: number,
    project: ProjectData | any
  ): Observable<ProjectResponse> {
    try {
      return this.http.put<any>(
        `${this.SERVERURL}/project/${projectId}`,
        project,
        this.httpOptionsWithToken()
      );
    } catch (error) {
      throw error;
    }
  }

  deleteProject(projectId: number): Observable<ProjectResponse> {
    try {
      return this.http.delete<any>(
        `${this.SERVERURL}/project/${projectId}`,
        this.httpOptionsWithToken()
      );
    } catch (error) {
      throw error;
    }
  }
}
