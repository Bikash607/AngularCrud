import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsGaurdService implements CanActivate {

  constructor(private employeeService: EmployeeService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.employeeService.getEmployee(+route.paramMap.get('id')).pipe(
      map(employee => {
        const epmloyeeExist = !!employee;
        if (epmloyeeExist) {
          return true;
        } else {
          this.router.navigate(['notFound']);
          return false;
        }
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }
}
