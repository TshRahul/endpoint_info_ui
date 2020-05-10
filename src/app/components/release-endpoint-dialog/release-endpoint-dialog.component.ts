import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { EndpointServiceService } from 'src/app/services/endpoint-service.service';
import { Endpoint } from 'src/app/classes/endpoint';

@Component({
  selector: 'app-release-endpoint-dialog',
  templateUrl: './release-endpoint-dialog.component.html',
  styleUrls: ['./release-endpoint-dialog.component.css']
})
export class ReleaseEndpointDialogComponent implements OnInit {

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<ReleaseEndpointDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
  private endpointService : EndpointServiceService) { }

  ngOnInit() {
  }

  enpoint_name = this.data.endpoint_name;

  endpoint = new Endpoint();
  releaseEndpoint() {
    this.endpoint.endpoint_id = this.data.endpoint_id;
    this.endpoint.endpoint_name = this.data.endpoint_name;
    this.endpoint.is_occupied = false;
    this.endpointService.updateEndpointInfo(this.endpoint)

    .subscribe(response => {
      console.log(response);
      if(response.status = '200'){
        window.location.reload();
       }
    })
  }

}

export interface DialogData {
  endpoint_name: string
  endpoint_id : number;
 }
