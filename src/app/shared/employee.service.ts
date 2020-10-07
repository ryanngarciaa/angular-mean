import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly baseURL = 'http://localhost:3000/employees/';

  constructor(private http: HttpClient) {}

  postEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseURL, emp);
  }

  getEmployeeList(): Observable<Employee> {
    return this.http.get<Employee>(this.baseURL);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.baseURL + id);
  }

  updateEmployeeById(id: string, emp: Employee): Observable<Employee> {
    return this.http.patch<Employee>(this.baseURL + id, emp);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(this.baseURL + id);
  }
}
