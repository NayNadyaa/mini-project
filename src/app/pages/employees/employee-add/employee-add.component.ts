import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, DropdownModule, ToastModule, CardModule, CalendarModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
  providers: [MessageService]
})
export class EmployeeAddComponent {
  employeeForm!: FormGroup;
  maxDate: Date | undefined;

  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Probation', value: 'Probation' },
    { label: 'Resigned', value: 'Resigned' }
  ];

  groupOptions = [
    { label: 'HR', value: 'HR' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'IT', value: 'IT' },
  ];

  constructor(private form: FormBuilder, private router: Router, private messageService: MessageService) {
    this.employeeForm = this.form.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.maxDate = new Date();
  }

  onSave() {
    if (this.employeeForm.valid) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success Add Employee' });
      console.log('Form Data:', this.employeeForm.value);
    }
  }

  onCancel() {
    this.router.navigate(['employees']);
  }
}
