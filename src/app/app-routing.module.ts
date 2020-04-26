import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndpointInfoComponent } from './endpoint-info/endpoint-info.component';
import { EndpointDataComponent } from './components/endpoint-data/endpoint-data.component';


const routes: Routes = [
  { path: '',   redirectTo: '/endpoint_data', pathMatch: 'full' },
  { path: 'endpoint_info', component: EndpointInfoComponent },
  { path: 'endpoint_data', component: EndpointDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
