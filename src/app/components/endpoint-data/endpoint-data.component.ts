import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EndpointServiceService } from 'src/app/services/endpoint-service.service';
import { Endpoint } from 'src/app/classes/endpoint';
import { AddEndpointComponent } from '../add-endpoint/add-endpoint.component';
import { MatDialog } from '@angular/material/dialog';
import { UseEndpointDialogComponent } from '../use-endpoint-dialog/use-endpoint-dialog.component';
import { ReleaseEndpointDialogComponent } from '../release-endpoint-dialog/release-endpoint-dialog.component';
import { MarkEndpointBadComponent } from '../mark-endpoint-bad/mark-endpoint-bad.component';
import { MarkEndpointGoodComponent } from '../mark-endpoint-good/mark-endpoint-good.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-endpoint-data',
  templateUrl: './endpoint-data.component.html',
  styleUrls: ['./endpoint-data.component.css']
})
export class EndpointDataComponent implements OnInit {

  constructor(private endpointService : EndpointServiceService, public dialog: MatDialog, private router: Router,
    private cookie : CookieService,
    private localStorageService: LocalStorageService) { }
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

  updateEndpointCondition(): void {
    const dialogRef = this.dialog.open(MarkEndpointBadComponent, {
     width: '400px'
   });

   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  }

  markEndpointGood(endpoint_name : string, endpoint_id : number): void {
    const dialogRef = this.dialog.open(MarkEndpointGoodComponent, {
     width: '350px',
     data: {endpoint_name: endpoint_name, endpoint_id : endpoint_id}
   });

   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  }


  getBackgroundColor(isBad : boolean, isOccupied : boolean) 
  {
    let myStyles;
     if(isBad){
      myStyles = {
        'background-color': '#FF9800',
        //'background-image': 'linear-gradient(316deg, #f42b03 0%, #ffbe0b 74%)'
      }
     }else {
    if(isOccupied){
      myStyles = {
        'background-color': '#F44336',
        'background-image': 'linear-gradient(315deg, #ff7878 0%, #ff0000 74%)'
      }
    } else {
      myStyles = {
        'background-color': '#f8ef42',
        'background-image': 'linear-gradient(315deg, #f8ef42 0%, #0fd64f 74%)'
      }
    }
  }
  return myStyles;
  }

  logout(){
    this.cookie.deleteAll();
    this.localStorageService.removeromStroage("username");
    this.localStorageService.removeromStroage("email");
    this.router.navigateByUrl('login');
  }
  

}
