import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;

  constructor(
      // private persistenceService: PersistenceService,
      private _auth: AuthService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
  }

  loginUser(){
      this._auth.loginUser({username: this.username, password: this.password})
      .subscribe(
          res=> {
              console.log("loggedin", res);
              localStorage.setItem("token", res.token);
              console.log(localStorage.getItem('token'));
              this._router.navigate(['/chat']);
          },
          err=> console.log(err)
      )
  }

}
