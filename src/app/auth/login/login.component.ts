import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = '';
  message = '';
  loginButton = 'Log In';
  constructor(private authService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this.loginButton = 'Logging In...';
    try {
      this.authService.signinUser(form.value.email, form.value.password).then(res => {
        form.reset();
        this.status = res.status;
        this.message = res.msg;
        this.router.navigate(['home']);
      });
    } catch (err) {
      console.log('Already Logged In', err);
      this.router.navigate(['home']);
    }
    this.loginButton = 'Log In';
  }

}
