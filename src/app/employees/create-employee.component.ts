import { EmployeeService } from './../services/employee.service';
import { Employee } from './../model/employee.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from './../model/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  //// for disable any attruble we can add disabled attribute in html control (but that item is not in angular form model)
  // isActive = true
  /* to make check box checked by defacult checked attribute will not work as we are using
  ngModel in the control (asign isActive to ture here to set default value) */
  @ViewChild('employeeForm', { static: false }) public createEmployeeForm: NgForm;
  datepickerConfig: Partial<BsDatepickerConfig>;
  previewImage = false;
  imagePath: string;
  employee: Employee;
  panelTitle: string;

  constructor(private employeeServive: EmployeeService, private router: Router, private route: ActivatedRoute) {
    this.datepickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY',
        isAnimated: true,
        adaptivePosition: true
      });

    this.imagePath = 'assets/images/Image03.png';
  }

  gender = 'male'; //// checked attribute does not work in html if we added ngModel is aedded in the contol in html

  departments: Department[] = [
    { id: 100, name: 'Admin' },
    { id: 101, name: 'IT' },
    { id: 102, name: 'PayRoll' },
    { id: 103, name: 'HR' },
    { id: 104, name: 'Accounting' },
    { id: 105, name: 'Sales' }
  ];

  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployeeById(id);
    });
  }

  saveEmployee(empForm: NgForm) {
    if (this.employee.id === null) {
      this.employeeServive.addEmployee(this.employee).subscribe((data: Employee) => {
        console.log(data);
        this.createEmployeeForm.reset();
        this.router.navigate(['employees']);
      }, (error: any) => {
        console.log(error);
      });
    } else {
      this.employeeServive.updateEmployee(this.employee).subscribe(() => {
        this.createEmployeeForm.reset();
        this.router.navigate(['employees']);
      }, (error: any) => {
        console.log(error);
      });
    }
    // const newEmployee = Object.assign({}, this.employee);


    /*
    we can set default value to form after reset by passing object with default vaule in reset method of form
        empForm.reset({
          contactPreference: 'phone'
        });
    */
  }

  toggleImage() {
    this.previewImage = !this.previewImage;
  }

  getEmployeeById(id: number) {
    if (id === 0) {
      this.panelTitle = 'Create Employee';
      this.employee = {
        id: null,
        name: null,
        gender: null,
        department: 'select',
        email: '',
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        isActive: null,
        imagePath: 'assets/images/Image03.png',
        password: null,
        confirmPassword: null
      };
    } else {
      this.panelTitle = 'Edit Employee';
      this.employeeServive.getEmployee(id).subscribe(employee => {
        this.employee = employee;
      }, error => {
        console.log(error);
      });
    }
  }
}
