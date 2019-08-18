import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Quick Vehicle Facilitation System';
  constructor(private router: Router, public authService: FirebaseService) {}

  ngOnInit() {}

  onLogoutClick() {
    this.authService.logoutUser().then(val => {
      console.log('User Logged out');
      this.router.navigate(['login']);
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn().then((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        return false;
      }
    });
    // if (firebase.auth().currentUser !== undefined) { return true; } else { return false; }
  }
}
