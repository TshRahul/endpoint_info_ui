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
import { MatSnackBar } from '@angular/material/snack-bar';import { DeleteEndpointComponent } from '../delete-endpoint/delete-endpoint.component';
  ``  

@Component({
  selector: 'app-endpoint-data',
  templateUrl: './endpoint-data.component.html',
  styleUrls: ['./endpoint-data.component.css']
})
export class EndpointDataComponent implements OnInit {

  constructor(private endpointService : EndpointServiceService, public dialog: MatDialog, private router: Router,
    private cookie : CookieService,
    private localStorageService: LocalStorageService, private _snackBar: MatSnackBar) { }
  endpoints : Endpoint[];
  masterEndpoints : Endpoint[] = [];
  itEndpoints : Endpoint[] = []; 

  current_user : string;
  user_role : string;
  not_admin : boolean;
  ngOnInit() {
    this.endpointService.getAllEndpoints()
    .subscribe(response => {
      this.current_user = this.localStorageService.getLocalStroageData("username");
      this.user_role = this.localStorageService.getLocalStroageData("role");
      if(this.user_role == "User"){
        this.not_admin = true;
      }
      response.body.forEach(value => {
        if(value.environment == "qa-master"){
          this.masterEndpoints.push(value);
        } else if(value.environment == "qa-it"){
          this.itEndpoints.push(value);
        }
      })
      },
      (error) => {                              //Error callback
        console.log(error);
        if(error.status = '0'){
          this.router.navigateByUrl('login');
        }
      }
      )
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
    if(this.not_admin == true){
      return;
    }
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

  releaseEndpoint(endpoint_name : string, endpoint_id : number, occupied_by : string): void {
    if(occupied_by == this.current_user){
    const dialogRef = this.dialog.open(ReleaseEndpointDialogComponent, {
     width: '400px',
     data: {endpoint_name: endpoint_name, endpoint_id : endpoint_id}
   });

   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
} else {
  this.openSnackBar('Endpoint must be released by user who occupied it.', 'Close', 'red-snackbar');
}
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
        'background-color': '#ff0000',
        //'background-image': 'linear-gradient(316deg, #f42b03 0%, #ffbe0b 74%)'
      }
     }else {
    if(isOccupied){
      myStyles = {
        'background-color': '#FFA500',
       // 'background-image': 'linear-gradient(315deg, #ff7878 0%, #ff0000 74%)'
      }
    } else {
      myStyles = {
        'background-color': '#75FF33',
      //  'background-image': 'linear-gradient(315deg, #f8ef42 0%, #0fd64f 74%)'
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
  
  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'left',
      panelClass: [className]
    });
  }

  deleteEndpoint(): void {
    const dialogRef = this.dialog.open(DeleteEndpointComponent, {
     width: '400px'
   });

   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  }
}
