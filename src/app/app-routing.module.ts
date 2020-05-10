import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndpointInfoComponent } from './endpoint-info/endpoint-info.component';
import { EndpointDataComponent } from './components/endpoint-data/endpoint-data.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: 'login/register', redirectTo: 'register' },
  { path: 'login/login', redirectTo: 'login' },
  { path: 'login', component : LoginComponent },
  { path: 'register/login',  redirectTo: 'login' },
  { path: 'register/register', redirectTo : 'register' },
  { path: 'register', component: RegisterComponent },
  { path: 'endpoint_info', component: EndpointInfoComponent },
  { path: 'endpoint_data', component: EndpointDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
