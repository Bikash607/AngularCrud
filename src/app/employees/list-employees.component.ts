import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from './../model/employee.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styles: ['./list-employees.component.css'],
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  searchTerm: string;
  displayEmployee: Employee;
  nextEmpIndex = 1;
  showAll = true;
  selectedEmployee: Employee;
  error: string;
  constructor(private route: Router, private router: ActivatedRoute) {
    const resolvedData = this.router.snapshot.data.emplpyeeList;
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
      this.displayEmployee = this.employees[0];
    } else {
      this.error = resolvedData;
    }
  }

  ngOnInit() {

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

  onClick(employeeId: number) {
    this.route.navigate(['/employee', employeeId], {queryParams: {   // passing query sting params
      searcTerm: this.searchTerm, testParam: 'testValue'
    }});
  }

  changeEmployeename() {
    // bellow change is pure change as we are changing object reference of pipe input so custom pipe will work (works when route params does not change)
    const newEmployees = Object.assign([], this.employees);
    newEmployees[0].name = 'PAUL';
    this.employees = newEmployees;
    // bellow change is impure change (pipe will not work)
    /* this.employees[0].name = 'Paul';*/
  }

  onMouseMove() {
    console.log('Mouse Moved');
  }
}
