import { ActivatedRoute } from '@angular/router';
import { Employee } from './../model/employee.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  private employeeDteails: Employee;
   empId: number;
  private selectedEmployeeId: number;

   /// for each property change it will attach property to each indivisual property
  @Input()
  set employeeId(val: number) {
    console.log('Previous Employee ID:' + (this.empId !== undefined ? this.empId : 'NULL'));
    console.log('Current Employee ID:' + val);
    this.empId = val;
  }
  get employeeId(): number {
    return this.empId;
  }

  @Input() employee: Employee;

  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  //// All changed property will be attached to SimpleChanges object

  ngOnChanges(changes: SimpleChanges) {

    /// employee object and its Id also can be accessed (all changed object can be accessed)
    /*for (const propName of Object.keys(changes)) {
       const change = changes[propName];
       const prevValue = change.previousValue;
       const newValue = change.currentValue;
    } */

    this.selectedEmployeeId = +this.route.snapshot.paramMap.get('id');
    const previousValue = changes.employee.previousValue as Employee;
    const currentValue = changes.employee.currentValue as Employee;

    console.log('Previous Employee Name:' + (previousValue !== undefined ? previousValue.name : 'NULL'));
    console.log('Current Employee Name:' + currentValue.name);
  }

  handelNotify() {
    this.notify.emit(this.employee);
  }

  getEmployeeNameAndGender() {  // calling this property in list employee component html page  to access cheild metod from parant
    return  'Template Reference Variable: ' + this.employee.name + ' : ' + this.employee.gender;
  }
}
