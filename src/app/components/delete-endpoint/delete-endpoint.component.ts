import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Endpoint } from 'src/app/classes/endpoint';
import { EndpointServiceService } from 'src/app/services/endpoint-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-endpoint',
  templateUrl: './delete-endpoint.component.html',
  styleUrls: ['./delete-endpoint.component.css']
})
export class DeleteEndpointComponent implements OnInit {

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<DeleteEndpointComponent>, private endpointService : EndpointServiceService,
    private _snackBar: MatSnackBar) { }

  endpoints : Endpoint[];

  ngOnInit(): void {
    this.endpointService.getAllEndpoints()
    .subscribe(response => {
      this.endpoints = response.body;
    })
  }

  endpointForm = this.fb.group({
    endpoint_id : ['', Validators.required]
   })

   deleteEndpoint(){
    let id = this.endpointForm.get("endpoint_id").value;
    this.endpointService.deleteEndpoint(id)
    .subscribe();
    window.location.reload();
   
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
