import { Component } from '@angular/core';
// import { IUser } from './models/user';
// import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recommendr.';
  // currentUser: IUser;

  // constructor(
  //   private backendService: BackendService,
  // ) {
  //   this.backendService.currentUser.subscribe(user => this.currentUser = user);
  // }

}
