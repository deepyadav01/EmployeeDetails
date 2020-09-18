import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeFullDetailsComponent } from './employee-full-details/employee-full-details.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {path:'', redirectTo: "/employee-details", pathMatch:"full"},
  {path:'employee-details', component:EmployeeDetailsComponent},
  {path:'employee', component:EmployeeComponent},
  {path:'employee-update', component:EmployeeComponent},
  {path:'employee-full-details', component:EmployeeFullDetailsComponent},
  {path:'**', redirectTo: "/employee-details", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
