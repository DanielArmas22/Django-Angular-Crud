import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToUsers() {
    this.router.navigate(['/users']);
  }
}