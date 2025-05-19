import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { DepartmentViewComponent } from './department-view/department-view.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeViewComponent },
  { path: 'departments', component: DepartmentViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
