import { Employee } from './../model/employee.model';
import { EmployeeService } from './../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  previousUrl: string;
  employee: Employee;
  private id: number;
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.previousUrl = e.url;
        console.log(e);
      }
    });
  }

  ngOnInit() {
    // this.id = +this.route.snapshot.paramMap.get('id'); // it won't work if we navigate from employee details to another employee
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.employeeService.getEmployee(this.id).subscribe( employee => {
        this.employee = employee;
      }, error => {
        console.log(error);
      });
    });
    // we must unsubscribe to observable after subscribing  it  but activateed Route is an exception to it as angular router
    // takes care of it
  }

  viewNextEmployee() {
    if (this.id < 4) {
      this.id = this.id + 1;
    } else {
      this.id = 1;
    }
    this.router.navigate(['/employee', this.id], {queryParamsHandling: 'preserve'});
  }
}
