import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EndpointServiceService } from 'src/app/services/endpoint-service.service';

@Component({
  selector: 'app-mark-endpoint-good',
  templateUrl: './mark-endpoint-good.component.html',
  styleUrls: ['./mark-endpoint-good.component.css']
})
export class MarkEndpointGoodComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MarkEndpointGoodComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
  private endpointService : EndpointServiceService) { }
  enpoint_name = this.data.endpoint_name;
  ngOnInit() {
  }

  markEndpointGood() {
    this.endpointService.updateIsBad(this.data.endpoint_id, false)
    .subscribe(response => {
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