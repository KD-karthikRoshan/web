import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {

  departments: any[] = [];
  editedDepartment :any;
  newDepartment:any;
  isEditMode = false;
  isCreateMode = false;

  constructor(private http: HttpClient) { }

  
  ngOnInit(): void {
    this.fetchDepartments();
    }
    deleteDepartment(depId: number) {
      if (confirm("Are you sure you want to delete this department?")) {
        const url = `https://localhost:7284/api/department/delete_by_id/${depId}`;
        return this.http.delete(url).subscribe(
          () => {
            // Employee deleted successfully, handle any necessary logic
            alert("Department deleted successfully.");
            // Optionally, refresh the list of employees after deletion
            this.fetchDepartments();
          },
          error => {
            // Handle error
            alert("Error deleting department:" +  error.error);
            // Display error message to the user
            // Example: this.errorMessage = "Failed to delete employee.";
          }
        );
      } else {
        return null;
      }
    }
    fetchDepartments() {
      this.http.get<any[]>('https://localhost:7284/api/department/get_all_department')
        .subscribe(
          response => {
            this.departments = response;
          },
          error => {
            alert('Error fetching departments:' +  JSON.stringify(error));
            // Handle error, e.g., display an error message to the user
          }
        );
    }

    
  editDepartment(department : any) {
    this.editedDepartment = { ...department };
    this.isEditMode = true;
    this.isCreateMode = false;

  }

  updateDepartment(department:any) {
    // Assuming you have a service method to update department through API
    const url = `https://localhost:7284/api/department/update_department/${department.departmentId}`;
  
    return this.http.put(url, department).subscribe(
      () => {
        console.log('Department updated successfully');
        this.fetchDepartments(); // Reload departments after update
        this.isEditMode = false; // Exit edit mode
      },
      error => {
        console.log('Error updating department:', error);
      }
    );
  }

  cancelEdit() {
    this.isEditMode = false;
  }


  
  createDepartment() {
    this.fetchDepartments();
    this.newDepartment = {
      departmentName: '',
      location: ''
    };
    this.isCreateMode = true;
    this.isEditMode = false;
  }

  saveDepartment(department: any) {
    this.http.post('https://localhost:7284/api/department/create', department).subscribe(
      () => {
        console.log('Deparment created successfully');
        this.fetchDepartments(); // Refresh employee list after creation
        this.isCreateMode = false; // Exit create mode
      },
      error => {
        console.error('Error creating department:', error);
        // Handle error
      }
    );
  }
  
  cancelCreate() {
    this.isCreateMode = false;
  }
}
