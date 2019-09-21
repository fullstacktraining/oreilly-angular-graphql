import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser;
  constructor (private authService: AuthService, private router: Router,
    ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
