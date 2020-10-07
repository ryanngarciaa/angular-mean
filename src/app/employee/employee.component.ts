import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  profileForm: FormGroup;
  name = new FormControl('');
  position = new FormControl('');
  office = new FormControl('');
  salary = new FormControl('');
  employees: any;
  isEdit = false;
  id: string;

  constructor(
    public employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getList();
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      name: this.name,
      position: this.position,
      office: this.office,
      salary: this.salary,
    });
  }

  submit(): void {
    if (this.isEdit) {
      this.employeeService
        .updateEmployeeById(this.id, this.profileForm.value)
        .subscribe(() => {
          this.getList();
          this.profileForm.reset();
          this.isEdit = false;
        });
    } else {
      this.employeeService
        .postEmployee(this.profileForm.value)
        .subscribe(() => {
          this.getList();
          this.profileForm.reset();
        });
    }
  }

  getList(): void {
    this.employeeService.getEmployeeList().subscribe((data) => {
      this.employees = data;
    });
  }

  edit(id: string): void {
    this.isEdit = true;
    this.employeeService.getEmployeeById(id).subscribe((data) => {
      this.id = id;
      this.setDefaultValue(data);
    });
  }

  delete(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe((data) => {
      this.getList();
    });
  }

  setDefaultValue(data: any): void {
    Object.keys(data).map((key) => {
      if (this.profileForm.controls[key]) {
        this.profileForm.controls[key].setValue(data[key]);
      }
    });
  }

  reset(): void {
    this.profileForm.reset();
  }
}
