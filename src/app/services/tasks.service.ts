import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { TaskData, TaskResponse } from '../models/Response/TaskResponse';
import { Observable } from 'rxjs';
import { TaskRequest } from '../models/Request/TaskRequest';
import { environment } from 'src/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private SERVERURL = environment.apiUrl;

  tasks: TaskData[] = [];
  projectEvent: EventEmitter<TaskData[]> = new EventEmitter<TaskData[]>();


  constructor(private http: HttpClient) { }

  private httpOptionsWithToken(): object {
    let token: string | null = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  get serverUrl() {
    return this.SERVERURL;
  }

  createTask(task: TaskRequest): Observable<any> {
     try{
      return this.http.post<TaskRequest>(`${this.SERVERURL}/task`, task, this.httpOptionsWithToken());
    } catch(error){
      console.log(error);
      throw error;
    } 
  }

   updateTask(task_id: number, taskData: any): Observable<any>{
    try{
      return this.http.put<any>(`${this.SERVERURL}/task/${task_id}`, taskData, this.httpOptionsWithToken());
    } catch(error){
      throw error;
    }
  }

  deleteTask(taskId: number): Observable<any>{
    try{
      return this.http.delete<any>(`${this.SERVERURL}/task/${taskId}`, this.httpOptionsWithToken());
    } catch(error){
      throw error;
    }
  }

  getAllTaskByProjectId(project_id: number) { 
    try {
      return this.http.get<TaskResponse>(`${this.SERVERURL}/task/${project_id}?isDisabled=false`, this.httpOptionsWithToken())
       }
     catch (error) {
      throw error;
    }
  };
  
  getAllTaskByDeveloper(
    email: string, project_id: number): Observable<any> {
    try {
      return this.http.get(`${this.SERVERURL}/task/filter?email=${email}&projectId=${project_id}`, this.httpOptionsWithToken());
    } catch (error) {
      throw error;
    }
  }

  getAlltaskAvailables(project_id: number): Observable<any>{
    try {
      return this.http.get(`${this.SERVERURL}/task/available/${project_id}`, this.httpOptionsWithToken());
    } catch (error) {
      throw error;
    }
  }
  

  getAllTasks(projectId: number){
    try {
      return this.http.get<any>(`${this.SERVERURL}/task/${projectId}`, this.httpOptionsWithToken())
    }
    catch (error) {
      throw error;
    }
  }


  getTaskByProjectId(projectId: number, pageNumber: number){
    try {
      return this.http.get<any>(`${this.SERVERURL}/task/${projectId}?page=${pageNumber}&size=6`, this.httpOptionsWithToken())
    }
    catch (error) {
      throw error;
    }
  }
  
  assignTask(email: string, task_id: number): Observable<any> {
    try {
      const url = `${this.SERVERURL}/task/add-dev/${email}/${task_id}`; 
      return this.http.patch<any>(url, null, this.httpOptionsWithToken());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  editStatusTask(status: string, task_id: number): Observable<any> {
    try {
      const url = `${this.SERVERURL}/task/change-status/${status}/${task_id}`; 
      return this.http.patch<any>(url, null, this.httpOptionsWithToken());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
