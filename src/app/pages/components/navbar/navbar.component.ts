import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, ConfirmDialogModule, CommonModule, BlockUIModule, ProgressSpinnerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [ConfirmationService]
})
export class NavbarComponent {
  loading = false;

  constructor(private router: Router, private confirmationService: ConfirmationService) {}

  onLogout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Logout?',
      accept: () => {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }, 2000);
      },
      reject: () => {}
    });
  }
}
