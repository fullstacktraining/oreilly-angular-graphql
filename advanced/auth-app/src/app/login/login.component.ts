import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // if (this.authService.currentUser) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(({ data }) => {
      console.log('subscribe');
      const token = data['login'].token;
      localStorage.setItem('token', token);
      this.router.navigate(['/profile']);
      console.log('hello');
      console.log(this.router.navigate(['/profile']));
      this.authService.currentUserSubject.next(token);
    }, (error) => {
      this.error = error;
      console.log('there was an error sending the query', error);
    });
  }

}
