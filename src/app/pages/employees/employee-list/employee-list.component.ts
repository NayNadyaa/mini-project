import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { employeesData } from '../mock-data/mock-employees';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
  imports: [CommonModule, TableModule, ButtonModule, ToastModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [MessageService]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  rowsPerPageOptions = [5, 10, 20];
  
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.employees = employeesData;
  }

  editData(data: any) {
    // open modal
    this.messageService.add({ severity: 'warn', summary: 'Employee Selected', detail: data.username });
  }

  deleteData(data: any) {
    // open modal
    this.messageService.add({ severity: 'error', summary: 'Employee Selected', detail: data.username });
  }
}