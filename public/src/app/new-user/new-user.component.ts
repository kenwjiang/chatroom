import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import { AuthService } from '../auth.service'
import { ActivatedRoute, Params, Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
    newUser: any;

    constructor(
        private _httpService: HttpService,
        private _auth: AuthService,
        private _route: ActivatedRoute,
        private _router: Router
        ){}

  ngOnInit() {
     this.newUser={username: '', password: ''};
  }
  addUser(){
      let observable = this._auth.registerUser(this.newUser);
      observable.subscribe(data => {
          console.log('receiving adduser data', data);
          localStorage.setItem("token", data.token);
          this._router.navigate(['/chat']);
      });

  }
}
