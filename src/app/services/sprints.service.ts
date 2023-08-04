import { Injectable } from '@angular/core';
import { environment } from "../../environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { SprintResponse } from '../models/Response/SprintResponse';
import {Observable} from "rxjs";
import { SprintRequest } from '../models/Request/SprintRequest';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  private SERVER_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  httpOptionsWithToken(): object {
    let token: string | null = sessionStorage.getItem("token")
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  };

  getAllSprintByProjectId(project_id: number): Observable<any> { 
    try {
      return this.http.get<SprintResponse>(`${this.SERVER_URL}/sprint/${project_id}?isDisabled=false`, this.httpOptionsWithToken())
       }
     catch (error) {
      throw error;
    }
  };

  getSprintById(project_id: number): Observable<SprintResponse> {
    try{
      return this.http.get<any>(`${this.SERVER_URL}/sprint/details/${project_id}`, this.httpOptionsWithToken())
    }
    catch (error) {
      throw error;
    }
  }

  updateSprint(sprint_id: number, sprint: SprintResponse): Observable<SprintResponse> {
    try{
      return this.http.put<any>(`${this.SERVER_URL}/sprint/${sprint_id}`, sprint, this.httpOptionsWithToken())
    }
    catch (error){
      throw error;
    }
  }

  addSprint(sprint: SprintRequest): Observable<SprintResponse> { 
    try{
      return this.http.post<any>(`${this.SERVER_URL}/sprint`, sprint, this.httpOptionsWithToken())
    }
    catch (error){
      throw error;
    }
  }

  deleteSprint(sprint_id: number): Observable<SprintResponse>{
    try{
      return this.http.delete<any>(`${this.SERVER_URL}/sprint/${sprint_id}`, this.httpOptionsWithToken())
    } catch (error){
      throw error;
    }
  }

 }
