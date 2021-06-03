import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../services/employee.service';
import { Employee } from './../model/employee.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.css']
})
export class ListEmpComponent implements OnInit {

  employees: Employee[];
  filterdEmployee: Employee[];
  searchText: string;
  displayEmployee: Employee;
  nextEmpIndex = 1;
  showAll = true;
  selectedEmployee: Employee;
  constructor(private emplooyeeService: EmployeeService, private route: Router, private router: ActivatedRoute) {

  }

  ngOnInit() {
    this.emplooyeeService.getEmployees().subscribe( emplist => {
      this.employees = emplist;
      /* as delay has been applyed for data in service so operation related to service data should
      be performed after data recived so it has bee put inside call back function of subscribe method */
      this.displayEmployee = this.employees[0];

      if (this.router.snapshot.queryParamMap.has('searcTerm')) {
        this.searchTerm = this.router.snapshot.queryParamMap.get('searcTerm');  // same can be done by using queryparam observable aproach without using snapshot
      } else {
        this.filterdEmployee =  this.employees;
      }
    });
  }

  get searchTerm(): string {
    return this.searchText;
  }

  set searchTerm(value: string) {
    this.searchText = value;
    this.filterdEmployee = this.getFilterdEmployee(value);
  }

  nextEmployee() {
    if (this.nextEmpIndex <= 3) {
      this.displayEmployee = this.employees[this.nextEmpIndex];
      this.nextEmpIndex++;
    } else {
      this.displayEmployee = this.employees[0];
      this.nextEmpIndex = 1;
    }
  }

  toggleEmployees() {
    this.showAll = !this.showAll;
  }

  handelChieldData(eventData: Employee) {
    this.selectedEmployee = eventData;
  }

  getFilterdEmployee(searchString: string) {
    return this.employees.filter(employee => employee.name.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);
  }

  onDeleteNotification(id: number) {
    const index = this.filterdEmployee.findIndex(e => e.id === id);
    if (index !== -1) {
      this.filterdEmployee.splice(index, 1);
    }
  }
}
