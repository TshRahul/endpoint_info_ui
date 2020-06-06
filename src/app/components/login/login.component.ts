import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { Authenticate } from 'src/app/classes/Authenticate';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from 'src/app/classes/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakeBarComponent } from '../snake-bar/snake-bar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb : FormBuilder, private authService : AuthenticationServiceService, private router: Router, private cookie : CookieService,
    private localStorageService: LocalStorageService, private _snackBar: MatSnackBar) { }

  loginForm = this.fb.group({

    username : ['', [Validators.required, Validators.minLength(3)]],
    password : ['', [Validators.required]]
  
  })

  ngOnInit() {
    
  }

  showProgressBar = false;

  authenticate = new Authenticate();
  user = new  User();

  authenticateUser() {
    this.authenticate.username = this.loginForm.get("username").value;
    this.authenticate.password = this.loginForm.get("password").value;

    this.authService.authenticateUser(this.authenticate)
    .subscribe((response) => {
      this.showProgressBar = true;
      if(response.status = '200'){
        this.cookie.set('jwt', response.body.jwt);
        this.user = response.body.user; 
        this.localStorageService.storeOnLocalStorage("username", this.user.username);
        this.localStorageService.storeOnLocalStorage("email", this.user.email);
        this.localStorageService.storeOnLocalStorage("role", this.user.roles)
        this.router.navigateByUrl('endpoint_data');
      }
    },
    (error) => {                              //Error callback
      console.log(error);
      if(error.status = '403'){
      this.openSnackBar('Authentication Failed !!', 'Close', 'red-snackbar');
      }
    }
    )
  }

  // durationInSeconds = 4;
  // openSnackBar() {
  //   this._snackBar.openFromComponent(SnakeBarComponent, {
  //     duration: this.durationInSeconds * 1000,
  //     verticalPosition: 'top',
  //     panelClass: ['red-snackbar']
      
  //   });
  // }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'left',
      panelClass: [className]
    });
  }

}
