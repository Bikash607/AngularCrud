import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Employee } from './../model/employee.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
  baseUrl = 'http://localhost:3000/employees';
  constructor(private httpClient: HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    // return  of(this.listEmployees).pipe(delay(2000)); // rxjs 6+ syntax for delay and of
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`).pipe(
      delay(1500),
      catchError(this.handleError)
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
      /*const maxId = this.listEmployees.reduce((e1, e2) => {
        return (e1.id > e2.id) ? e1 : e2;
      }).id;
      employee.id = maxId + 1;
      this.listEmployees.push(employee); */
      return this.httpClient.post<Employee>(`${this.baseUrl}`, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    // return this.listEmployees.find(x => x.id === id);
  }

  DeleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    /*const index = this.listEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.listEmployees.splice(index, 1);
    } */
  }

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log('Client side error: ', errorResponse.error.message);
    } else {
      console.log('Server side error: ', errorResponse.error.message);
    }

    return throwError('There is sompe problem in server. please try after some time');
  }
}
