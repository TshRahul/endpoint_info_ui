import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/classes/User';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb : FormBuilder, private userService : UserServiceService, private router: Router,
    private _snackBar: MatSnackBar) { }

  Roles : any =  ['Admin', 'User'];

registrationForm = this.fb.group({

  username : ['', [Validators.required, Validators.minLength(3)]],
  Firstname : ['', [Validators.required]],
  Lastname : ['' ,[Validators.required]],
  email : ['', [Validators.required, Validators.email]],
  password : ['', [Validators.required]],
  roles : ['', [Validators.required]]

})

 matcher = new MyErrorStateMatcher();

  ngOnInit() {


  }

  user = new User();

  isRegistered = false;
  createUser() {
    this.user.username = this.registrationForm.get("username").value;
    this.user.firstname = this.registrationForm.get("Firstname").value;
    this.user.lastname = this.registrationForm.get("Lastname").value;
    this.user.email = this.registrationForm.get("email").value;
    this.user.password = this.registrationForm.get("password").value;
    this.user.roles = this.registrationForm.get("roles").value;
    this.userService.addUser(this.user)
    .subscribe(response =>{
      console.log(response);
      console.log(response.status);
      if(response.status = '200'){
       this.isRegistered = true;
      }
      this.openSnackBar('User created successfully', 'Close', 'green-snackbar');
      this.router.navigateByUrl('login');
    },
    (error) => {                              //Error callback
      console.log(error);
      // if(error.status = '403'){
      this.openSnackBar('User creation failed', 'Close', 'red-snackbar');
   //   }
    }
      )
  } 

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'left',
      panelClass: [className]
    });
  }

}
