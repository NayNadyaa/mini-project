import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { users } from '../mock-data/mock-users';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputTextModule, PasswordModule, ButtonModule, CardModule, BlockUIModule, ProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading = false;

  constructor(private router: Router) {}

  login() {
    const user = users.find(u => u.username === this.username && u.password === this.password);

    if (user) {
      this.loading = true;
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/employees']);
      }, 2000);
    } else {
      alert('Invalid username or password');
    }
  }
}