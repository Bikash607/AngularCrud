import { catchError } from 'rxjs/operators';
import { EmployeeService } from './employee.service';
import { Employee } from './../model/employee.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

// used to prefetch route date it will not render route till its all data is not feteched
@Injectable()
export class EmployeeListResover implements Resolve<Employee[] | string> {
  constructor(private employeeService: EmployeeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
    return this.employeeService.getEmployees().pipe(
      catchError((error: string) => of(error))
    );
  }
}
