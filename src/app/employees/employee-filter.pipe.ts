import { Employee } from './../model/employee.model';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'employeeFilter',
  pure: true
})
export class EmployeeFilterPipe implements PipeTransform {
  private count = 0;
  transform(employees: Employee [], searchTerm: string) {
    this.count++;
    console.log('Filter executed' + this.count + ' times');
    if (!employees || !searchTerm) {
      return employees;
    }

    return employees.filter(employee => employee.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1);
  }
}
