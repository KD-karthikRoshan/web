import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { DepartmentViewComponent } from './department-view/department-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    AppNavComponent,
    EmployeeViewComponent,
    DepartmentViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
