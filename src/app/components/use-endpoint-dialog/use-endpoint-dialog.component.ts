import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEndpointComponent } from '../add-endpoint/add-endpoint.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Endpoint } from 'src/app/classes/endpoint';
import { EndpointServiceService } from 'src/app/services/endpoint-service.service';
import { allowedEnvironmant } from 'src/app/classes/Vaildators';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-use-endpoint-dialog',
  templateUrl: './use-endpoint-dialog.component.html',
  styleUrls: ['./use-endpoint-dialog.component.css']
})
export class UseEndpointDialogComponent implements OnInit {

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<AddEndpointComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
  private endpointService : EndpointServiceService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  enpoint_name = this.data.endpoint_name;

  endpoint = new Endpoint();

  useEndpointForm = this.fb.group({
    using_for : ['', Validators.required]
  //  used_environment : ['', [Validators.required, allowedEnvironmant]]
    
  })

  envs  = ['qa-it', 'qa-master'];

  useEndpoint(){
    this.endpoint.endpoint_id = this.data.endpoint_id;
    this.endpoint.endpoint_name = this.data.endpoint_name;
    this.endpoint.occupied_by = this.localStorageService.getLocalStroageData("username");
    this.endpoint.occupied_for = this.useEndpointForm.get("using_for").value;
  //  this.endpoint.environment = this.useEndpointForm.get("used_environment").value;
    this.endpoint.environment = this.data.environment;
    this.endpoint.is_occupied = true;
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
  environment : string;
 }
