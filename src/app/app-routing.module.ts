import { EmployeeDetailsGaurdService } from './services/employee-details-gaurd.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListEmpComponent } from './employees/list-emp.component';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { CreateEmployeeCanDeactivateGuardService } from './services/create-employee-can-deacvivate-guard.service';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { HomeComponent } from './home/home.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListResover } from './services/employee-list-resolver.service';

const routes: Routes = [
  {path: 'list', component: ListEmployeesComponent, resolve: {emplpyeeList: EmployeeListResover}},
  {path: 'employees', component: ListEmpComponent},
  {path: 'home', component: HomeComponent},
  {path: 'edit/:id', component: CreateEmployeeComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsGaurdService]},
  {path: 'notFound', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
