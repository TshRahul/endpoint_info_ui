import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EndpointServiceService } from 'src/app/services/endpoint-service.service';
import { Endpoint } from 'src/app/classes/endpoint';
import { AddEndpointComponent } from '../add-endpoint/add-endpoint.component';
import { MatDialog } from '@angular/material';
import { UseEndpointDialogComponent } from '../use-endpoint-dialog/use-endpoint-dialog.component';
import { ReleaseEndpointDialogComponent } from '../release-endpoint-dialog/release-endpoint-dialog.component';

@Component({
  selector: 'app-endpoint-data',
  templateUrl: './endpoint-data.component.html',
  styleUrls: ['./endpoint-data.component.css']
})
export class EndpointDataComponent implements OnInit {

  constructor(private endpointService : EndpointServiceService, public dialog: MatDialog) { }
  endpoints : Endpoint[];
  masterEndpoints : Endpoint[] = [];
  itEndpoints : Endpoint[] = []; 
 
  ngOnInit() {
    this.endpointService.getAllEndpoints()
    .subscribe(response => {
      this.endpoints = response;
      this.endpoints.forEach(value => {
        if(value.environment == "qa-master"){
          this.masterEndpoints.push(value);
        } else if(value.environment == "qa-it"){
          this.itEndpoints.push(value);
        }
      })
      })
  }

  addEndpoint(): void {
    const dialogRef = this.dialog.open(AddEndpointComponent, {
      width: '350px'
    });
    

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  useEndpoint(endpoint_name : string, endpoint_id : number): void {
    const dialogRef = this.dialog.open(UseEndpointDialogComponent, {
     width: '350px',
     data: {endpoint_name: endpoint_name, endpoint_id : endpoint_id}
   });

   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  }

  

  endpoint = new Endpoint();

  drop(event: CdkDragDrop<Endpoint[]>, env : string) {  
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        var data = event.container.data[event.currentIndex];
                        let id  = data.endpoint_id;
        this.endpointService.updateEnvironment(id, (env == 'qaMaster') ? 'qa-master' : 'qa-it')
       .subscribe(response => {
      console.log(response);
      if(response.status = '200'){
        window.location.reload();
       }
    })
    }
  }

  releaseEndpoint(endpoint_name : string, endpoint_id : number): void {
    const dialogRef = this.dialog.open(ReleaseEndpointDialogComponent, {
     width: '400px',
     data: {endpoint_name: endpoint_name, endpoint_id : endpoint_id}
   });

   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  }


  getBackgroundColor(isOccupied : boolean) 
  {

    if(isOccupied){
      return '#f44336';
    }
  
    return '#4CAF50';

  }

}
