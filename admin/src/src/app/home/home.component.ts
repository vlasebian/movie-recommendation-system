import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userIsAdmin: boolean = false;

  constructor(
    private router: Router,
    private backendService: BackendService,
  ) { 

  }

  ngOnInit() {
    var currentUser = localStorage.getItem('username');

    if (currentUser == "admin") {
      this.userIsAdmin = true;
    }
  }

  onLogout() {
    this.backendService.logout();
    this.router.navigate(['login/']);
  }

}
