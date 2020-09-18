import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent  {
  displayedColumns = [ 'name', 'address', 'phone','email', 'action' ];
  dataSource = this.dataService.employeeData;
  deleteIcon = "../assets/icon/delete-24px.svg";
  editIcon = "../assets/icon/edit-24px.svg";
  employeeIcon = "../assets/icon/person_add-24px.svg";

  @ViewChild(MatTable) table: MatTable<any>;
  constructor(public route : Router, public dataService: DataService){}

  delete(row: any): void {
    const index = this.dataSource.indexOf(row, 0);
    if (index > -1) {
      this.dataSource.splice(index, 1);
    }
    this.table.renderRows();
  }

  createEmployee() {
    this.route.navigate(["employee"]);
  }

  update(row){
    const index = this.dataSource.indexOf(row, 0);
    if (index > -1) {
      this.dataService.updateIndex = index;
      this.dataService.updateEmployeeData = true;
      this.route.navigate(["employee"]);
    }
  }

  employeeeDetails(row){
    const index = this.dataSource.indexOf(row, 0);
    if (index > -1) {
      this.dataService.updateIndex = index;
      this.route.navigate(["employee-full-details"]);
    }
  }

}

const data = [
  {
    name: "eggs",
    phone: "9876543210",
    email: "deep@gmail.com",
    address: "Cell definition for the mat-table. Captures the template of a column's data row cell as well as cell-specific properties.    ",
  },
  {
    name: "cheese",
    phone: "9876543210",
    email: "deep@gmail.com",
    address: "Cell definition for the mat-table. Captures the template of a column's data row cell as well as cell-specific properties.    ",
  },
  {
    name: "broccoli",
    phone: "9876543210",
    email: "deep@gmail.com",
    address: "Cell definition for the mat-table. Captures the template of a column's data row cell as well as cell-specific properties.    ",

  }
]