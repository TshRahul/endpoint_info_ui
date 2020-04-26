import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Endpoint } from '../classes/endpoint';
import { EndpointServiceService } from '../services/endpoint-service.service';
import { AddEndpointComponent } from '../components/add-endpoint/add-endpoint.component';
import { UseEndpointDialogComponent } from '../components/use-endpoint-dialog/use-endpoint-dialog.component';
import { ReleaseEndpointDialogComponent } from '../components/release-endpoint-dialog/release-endpoint-dialog.component';

@Component({
  selector: 'app-endpoint-info',
  templateUrl: './endpoint-info.component.html',
  styleUrls: ['./endpoint-info.component.css']
})
export class EndpointInfoComponent implements OnInit {

  constructor(private endpointService : EndpointServiceService, public dialog: MatDialog) {
   
 
   }

   endpoints : Endpoint[]
   displayedColumns: string[]
   dataSource: MatTableDataSource<Endpoint>;
   count : number;
   counts = new Array();
  ngOnInit() {
    this.endpointService.getAllEndpoints()
    .subscribe(response => {
      this.endpoints = response;
      this.count = this.endpoints.length;
      var k = 0;
      var i;
      for(i = 1; i<= this.count; i++){
        this.counts.push(i);
      }
      this.displayedColumns = ['id', 'name', 'status', 'action'];
      this.dataSource = new MatTableDataSource(this.endpoints);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  releaseEndpoint(endpoint_name : string, endpoint_id : number): void {
    const dialogRef = this.dialog.open(ReleaseEndpointDialogComponent, {
     width: '400px',
     data: {endpoint_name: endpoint_name, endpoint_id : endpoint_id}
   });

   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  }
  

}
