import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, Validator } from '@angular/forms';
import { EndpointServiceService } from 'src/app/services/endpoint-service.service';
import { Endpoint } from 'src/app/classes/endpoint';
import {allowedEnvironmant } from 'src/app/classes/Vaildators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-endpoint',
  templateUrl: './add-endpoint.component.html',
  styleUrls: ['./add-endpoint.component.css']
})
export class AddEndpointComponent implements OnInit {

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<AddEndpointComponent>, private endpointService : EndpointServiceService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  envs = ['qa-it', 'qa-master'];

  addEndpointForm = this.fb.group({
    endpoint_name : ['', Validators.required],
    environment : ['', [Validators.required, allowedEnvironmant]]
  })
  endpoint = new Endpoint();
  addEndpoint(){
  this.endpoint.endpoint_name = this.addEndpointForm.get("endpoint_name").value;
  this.endpoint.environment = this.addEndpointForm.get("environment").value;
  this.endpointService.addEndpoint(this.endpoint)
  .subscribe(response => {
    console.log(response);
    if(response.status = '200'){
      window.location.reload();
     }
  },
  (error) => {                              //Error callback
    console.log(error);
    if(error.status = '409'){
      this.openSnackBar('Endpoint name: ' + this.endpoint.endpoint_name + ' already exists' , 'Close', 'red-snackbar');
    }
  }
  )

  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'left',
      panelClass: [className]
    });
  }

  

}