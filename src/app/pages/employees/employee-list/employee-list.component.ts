import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
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
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

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
  id: number;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToastModule, IconFieldModule, InputIconModule, 
    InputTextModule, FormsModule, DropdownModule, DialogModule, EmployeeDetailComponent, NavbarComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [MessageService]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  currentPage: number = 0; 
  rows: number = 5; 

  @ViewChild('empTable') table!: Table;

  visible = false;
  selectedEmployee!: Employee;

  searchUsername: string = '';
  selectedStatus : string | null = null;
  statusOptions = [
    { label: 'All', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Probation', value: 'Probation' },
    { label: 'Resigned', value: 'Resigned' }
  ];
  
  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit() {
    let storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    if (storedEmployees.length === 0) {
      localStorage.setItem('employees', JSON.stringify(employeesData));
      storedEmployees = employeesData;
    }

    this.employees = storedEmployees;
    this.filteredEmployees = [...this.employees];

    this.searchUsername = sessionStorage.getItem('searchUsername') || '';
    this.selectedStatus = sessionStorage.getItem('selectedStatus') || null;

    if (this.searchUsername || this.selectedStatus) {
      this.applyFilter();
    }
  }

  viewData(data: Employee) {
    // detail dialog
    // this.selectedEmployee = { ...data };
    // this.visible = true;

    // detail page
    this.router.navigate(['/employees/employee-form', data.id]);
  }

  editData(data: any) {
    this.messageService.add({ severity: 'warn', summary: 'Employee Edited', detail: data.username });
  }

  deleteData(data: any) {
    this.messageService.add({ severity: 'error', summary: 'Employee Deleted', detail: data.username });
  }

  applyFilter() {
    sessionStorage.setItem('searchUsername', this.searchUsername);
    sessionStorage.setItem('selectedStatus', this.selectedStatus || '');

    this.filteredEmployees = this.employees.filter(val => {
      const matchUsername = this.searchUsername
        ? val.username.toLowerCase().includes(this.searchUsername.toLowerCase())
        : true;

      const matchStatus = this.selectedStatus
        ? val.status === this.selectedStatus
        : true;

      return matchUsername && matchStatus;
    });

    if (this.table) {
      this.table.reset();
    }
  }

  addEmployee() {
    this.router.navigate(['employees/employee-form']);
  }
}