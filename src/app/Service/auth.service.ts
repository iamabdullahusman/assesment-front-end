import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = "";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(loginRequest: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/auth/login`, loginRequest);
  }
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('your_api_endpoint/students'); // Replace with your actual endpoint
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`your_api_endpoint/students/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('your_api_endpoint/students', student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`your_api_endpoint/students/${student.id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`your_api_endpoint/students/${id}`);
  }
}
