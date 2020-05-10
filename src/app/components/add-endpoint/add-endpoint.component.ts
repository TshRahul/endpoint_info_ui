import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, Validator } from '@angular/forms';
import { EndpointServiceService } from 'src/app/services/endpoint-service.service';
import { Endpoint } from 'src/app/classes/endpoint';
import {allowedEnvironmant } from 'src/app/classes/Vaildators';

@Component({
  selector: 'app-add-endpoint',
  templateUrl: './add-endpoint.component.html',
  styleUrls: ['./add-endpoint.component.css']
})
export class AddEndpointComponent implements OnInit {

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<AddEndpointComponent>, private endpointService : EndpointServiceService) { }

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
  })

  }

  

}