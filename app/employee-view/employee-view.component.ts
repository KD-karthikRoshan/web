import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  employees: any[] = [];
  departments: any[] = [];
  editedEmployee: any;
  isCreateMode = false;
  isEditMode = false;
  newEmployee: any;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.fetchEmployees();
  }

  deleteEmployee(employeeId: number) {
    if (confirm("Are you sure you want to delete this employee?")) {
      const url = `https://localhost:7284/api/employee/delete_by_id/${employeeId}`;
      return this.http.delete(url).subscribe(
        () => {
          // Employee deleted successfully, handle any necessary logic
          console.log("Employee deleted successfully.");
          // Optionally, refresh the list of employees after deletion
          this.fetchEmployees();
        },
        error => {
          // Handle error
          console.error("Error deleting employee:", error);
          // Display error message to the user
          // Example: this.errorMessage = "Failed to delete employee.";
        }
      );
    } else {
      return null;
    }
  }
  fetchEmployees() {
    this.http.get<any[]>('https://localhost:7284/api/employee/get_all_employee')
      .subscribe(
        response => {
          this.employees = response;
        },
        error => {
          console.error('Error fetching employees:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
  }
  editEmployee(employee: any) {
    this.fetchDepartments();
    this.editedEmployee = { ...employee };
    this.isEditMode = true;
    this.isCreateMode = false;
  }

  convertDate(inputDate: string): string {
    const parts = inputDate.split('-');
    // Ensure correct order of year, month, and day
    const formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0] + 'T00:00:00.00';
    return formattedDate;
  }
  updateEmployee(employee: any) {
    // Assuming you have a service method to update department through API
    const url = `https://localhost:7284/api/employee/update_employee/${employee.employeeId}`;

    employee.dateOfBirth = this.convertDate(employee.dateOfBirth);
    return this.http.put(url, employee).subscribe(
      () => {
        console.log('Employee updated successfully');
        this.fetchEmployees(); // Reload departments after update
        this.isEditMode = false; // Exit edit mode
      },
      error => {
        console.log('Error updating dmployee:', error);
      }
    );
  }

  cancelEdit() {
    this.isEditMode = false;
  }
  fetchDepartments() {
    this.http.get<any[]>('https://localhost:7284/api/department/get_all_department')
      .subscribe(
        response => {
          this.departments = response;
        },
        error => {
          alert('Error fetching departments:' + JSON.stringify(error));
          // Handle error, e.g., display an error message to the user
        }
      );
  }
  createEmployee() {
    this.fetchDepartments();
    this.newEmployee = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      annualSalary: '',
      departmentName: '',
      location: ''
    };
    this.isCreateMode = true;
    this.isEditMode = false;
  }
  generateDateOfBirthPlaceholder(): string {
    return 'Use format dd-mm-yyyy'; // Customize the format as needed
  }
  saveEmployee(employee: any) {
    employee.dateOfBirth = this.convertDate(employee.dateOfBirth);
    this.http.post('https://localhost:7284/api/employee/create', employee).subscribe(
      () => {
        console.log('Employee created successfully');
        this.fetchEmployees(); // Refresh employee list after creation
        this.isCreateMode = false; // Exit create mode
      },
      error => {
        alert('Error creating employee: ' + error.error);
        // Handle error
      }
    );
  }

  cancelCreate() {
    this.isCreateMode = false;
  }
}
