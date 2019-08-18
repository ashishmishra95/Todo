import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string;
  status: string;
  user: any;
  registerButton = 'Register';
  constructor(private authService: FirebaseService, private router: Router) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    if (form.value.password !== form.value.confirmPassword) {
      return;
    }
    try {
      this.user = {
        name: {
          firstName: form.value.firstName,
          lastName: form.value.lastName
        },
        username: form.value.username,
        email: form.value.email,
        password: form.value.password
      };
      this.registerButton = 'Registering...';
      this.authService
        .signupUser(this.user)
        .then(res => {
          this.status = 'alert alert-success';
          this.message = 'User account created successfully';
          form.reset();
          this.registerButton = 'Register';
          this.router.navigate(['/login']);
        })
        .catch(err => {
          console.log(err);
          this.status = 'alert alert-warning';
          this.message = err.message;
          form.reset();
          this.registerButton = 'Register';
        });
    } catch (err) {
      console.log(err);
      this.status = 'alert alert-danger';
      this.message = 'Some error occurred.';
      this.registerButton = 'Register';
    }
  }
}
