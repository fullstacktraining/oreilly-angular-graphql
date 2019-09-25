import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser;
  constructor (private authService: AuthService, private router: Router, private apollo: Apollo
    ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  logout() {
    if (localStorage.getItem('temporaryPhotoUrl')) {
      localStorage.removeItem('temporaryPhotoUrl');
    }
    this.apollo.getClient().resetStore();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
