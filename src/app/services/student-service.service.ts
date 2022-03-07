import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  URL: string = "http://localhost:8888/api/students";

  constructor( private http: HttpClient ) { }

  postStudent(data: any): Observable<any> {
    return this.http.post<any>(this.URL, data)
  }

  getStudent() {
    return this.http.get<any>(this.URL);
  }

  /* // In the bakend was implemented
  getStudentById(id: number) {
    return this.http.get<any>(this.URL + "/id");
  }
  */
 
  putStudent(data: any, id: number) {
    return this.http.put<any>(this.URL + "/" +id, data);
  }
  
  deleteStudent(id:number) {
    return this.http.delete<any>(this.URL + "/"  + id);
  }
}
