import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EndpointServiceService } from 'src/app/services/endpoint-service.service';
import { Endpoint } from 'src/app/classes/endpoint';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mark-endpoint-bad',
  templateUrl: './mark-endpoint-bad.component.html',
  styleUrls: ['./mark-endpoint-bad.component.css']
})
export class MarkEndpointBadComponent implements OnInit {

  constructor(private fb : FormBuilder,public dialogRef: MatDialogRef<MarkEndpointBadComponent> , private endpointService : EndpointServiceService) { }
endpoints : Endpoint[];
filteredEps : Endpoint[] = [];

  ngOnInit() {
    this.endpointService.getAllEndpoints()
    .subscribe(response => {
     this.endpoints = response;
     this.endpoints.forEach(value => {
       if(!value.bad && !value.is_deleted && value.environment != null){
         this.filteredEps.push(value);
       }
     })
    })
  }

  endpointForm = this.fb.group({
   endpoint_id : ['', Validators.required]
  })

  updateEndpointIsBad(){
    let id = this.endpointForm.get("endpoint_id").value;
    this.endpointService.updateIsBad(id, true)
    .subscribe(response => {
      if(response.status = '200'){
        window.location.reload();
       }
    })
  }




}
