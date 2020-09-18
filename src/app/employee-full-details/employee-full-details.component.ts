import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-employee-full-details',
  templateUrl: './employee-full-details.component.html',
  styleUrls: ['./employee-full-details.component.css']
})
export class EmployeeFullDetailsComponent implements OnInit, OnDestroy {
data;
map: any;

  constructor(public dataService: DataService, public route: Router) { 
    this.data = this.dataService.employeeData[this.dataService.updateIndex]
  }

  ngOnInit(): void {    
  }
 

ngOnDestroy(): void {
 this.dataService.updateIndex = null;
}  

back(){
  this.route.navigate(['employee-details']);
}

}
