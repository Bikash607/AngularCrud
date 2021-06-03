import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { CreateEmployeeCanDeactivateGuardService } from './services/create-employee-can-deacvivate-guard.service';
import { EmployeeService } from './services/employee.service';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { SelectRequireValidatorDirective } from './shared/select-required-validator.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { HomeComponent } from './home/home.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { ListEmpComponent } from './employees/list-emp.component';
import { EmployeeListResover } from './services/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeDetailsGaurdService } from './services/employee-details-gaurd.service';
import { DisplayEmpComponent } from './employees/display-emp.component';
import { AccordionComponent } from './shared/accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    HomeComponent,
    CreateEmployeeComponent,
    SelectRequireValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    ListEmpComponent,
    PageNotFoundComponent,
    DisplayEmpComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService, EmployeeListResover, EmployeeDetailsGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
