import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { employeesData } from '../mock-data/mock-employees';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms'; 
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';

interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToastModule, IconFieldModule, 
    InputIconModule, InputTextModule, FormsModule, DropdownModule, DialogModule, EmployeeDetailComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [MessageService]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  visible = false;
  selectedEmployee!: Employee;

  searchUsername = '';
  selectedStatus = null;
  statusOptions = [
    { label: 'All', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Probation', value: 'Probation' },
    { label: 'Resigned', value: 'Resigned' }
  ];
  
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.employees = employeesData;
    this.filteredEmployees = [...this.employees];
  }

  viewData(data: Employee) {
    this.selectedEmployee = { ...data };
    this.visible = true;
  }

  editData(data: any) {
    this.messageService.add({ severity: 'warn', summary: 'Employee Edited', detail: data.username });
  }

  deleteData(data: any) {
    this.messageService.add({ severity: 'error', summary: 'Employee Deleted', detail: data.username });
  }

  applyFilter() {
    this.filteredEmployees = this.employees.filter(emp => {
      const matchUsername = this.searchUsername
        ? emp.username.toLowerCase().includes(this.searchUsername.toLowerCase())
        : true;

      const matchStatus = this.selectedStatus
        ? emp.status === this.selectedStatus
        : true;

      return matchUsername && matchStatus; // AND rule
    });
  }
}