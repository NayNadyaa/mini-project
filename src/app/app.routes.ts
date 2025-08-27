import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeListComponent } from './pages/employees/employee-list/employee-list.component';
import { EmployeeAddComponent } from './pages/employees/employee-add/employee-add.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'employees', 
        children: [
            { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
            { path: 'employee-list', component: EmployeeListComponent },
            { path: 'employee-add', component: EmployeeAddComponent },
        ]
     },
];
