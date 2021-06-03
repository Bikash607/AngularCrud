import { EmployeeService } from './../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './../model/employee.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-display-emp',
  templateUrl: './display-emp.component.html',
  styleUrls: ['./display-emp.component.css']
})
export class DisplayEmpComponent implements OnInit, OnChanges {

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
  @Input() searchTerm: string;
  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDetete: boolean;
  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  //// All changed property will be attached to SimpleChanges object

  ngOnChanges(changes: SimpleChanges) {

    /// eployee object anf its Id also can be accessed (all changed object can be accessed)
    /*for (const propName of Object.keys(changes)) {
       const change = changes[propName];
       const prevValue = change.previousValue;
       const newValue = change.currentValue;
    } */
    this.selectedEmployeeId = +this.route.snapshot.paramMap.get('id');
  }

  handelNotify() {
    this.notify.emit(this.employee);
  }

  getEmployeeNameAndGender() {  // calling this property in list employee component html page  to access cheild metod from parant
    return 'Template Reference Variable: ' + this.employee.name + ' : ' + this.employee.gender;
  }
  ViewEmployee() {
    this.router.navigate(['/employee', this.employee.id], {
      queryParams: {   // passing query sting params
        searcTerm: this.searchTerm
      }
    });
  }

  EditEmployee() {
    this.router.navigate(['/edit', this.employee.id]);
  }

  DeleteEmployee() {
    this.employeeService.DeleteEmployee(this.employee.id).subscribe(() => {
      console.log(`Employee with Id= ${this.employee.id} deleted`);
    },
      error => console.log(error)
    );
    this.notifyDelete.emit(this.employee.id);
  }
}
