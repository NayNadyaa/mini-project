import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { employeesData } from '../../mock-data/mock-employees';
import { InputNumberModule } from "primeng/inputnumber";

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, DropdownModule, ToastModule, CardModule, CalendarModule, InputNumberModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  providers: [MessageService]
})
export class EmployeeFormComponent {
  employeeForm!: FormGroup;
  maxDate: Date | undefined;
  employeeData!: any;
  idData = null;
  isDetailMode = false;
  title = '';
  loading = false;

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
    { label: 'Support', value: 'Support' },
    { label: 'Developer', value: 'Developer' },
    { label: 'BA', value: 'BA' },
    { label: 'QA', value: 'QA' },
    { label: 'SA', value: 'SA' },
  ];

  constructor(private form: FormBuilder, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
    this.employeeForm = this.form.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: [0, Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.maxDate = new Date();

    this.route.params.subscribe(params => {
      this.idData = params['id'];
    });

    if (this.idData) {
      this.isDetailMode = true;
      this.employeeForm.disable();
      const tempEmployeeData = JSON.parse(localStorage.getItem('employees') || '[]');

      this.employeeData = tempEmployeeData.find((val: any) => this.idData === String(val.id))
      if (this.employeeData) {
        this.employeeForm.patchValue({ 
          ...this.employeeData,
          birthDate: new Date(this.employeeData?.birthDate),
        });
      }
    }

    this.title = this.idData ? 'Detail Employee' : 'Add Employee';
  }

  onSave() {
    if (this.employeeForm.valid) {
      this.loading = true;
      const employees = JSON.parse(localStorage.getItem('employees') || '[]');
      const newEmployee = {
        ...this.employeeForm.value,
        id: employees?.length + 1
      };

      employees.unshift(newEmployee);
      localStorage.setItem('employees', JSON.stringify(employees));

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Added', life: 1500 });
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/employees']);
      }, 1500);
    }
  }

  onCancel() {
    this.router.navigate(['employees']);
  }
}
