import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { DataService } from '../data.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  createEmployeeForm: FormGroup;
  map;
  camera = false;
  public webcamImage: WebcamImage = null;
  constructor( public formBuilder: FormBuilder, public dataService: DataService, public route : Router ) {

      if(this.dataService.employeeData.length > 0 &&  (this.dataService.updateIndex || this.dataService.updateIndex == 0) && this.dataService.updateEmployeeData ){
       let data =  this.dataService.employeeData[this.dataService.updateIndex];
       this.generateForm(data);
      }
      if(!this.dataService.updateEmployeeData){
        this.controlGenerator();
      }
 
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
   this.imageUrl =  webcamImage.imageAsDataUrl
  }

  ngOnInit(): void {
   this.map =  this.dataService.map;
  }
  currentLocation(){
    this.createEmployeeForm.get("address").setValue(this.dataService.currentLoaction, {emitEvent:false})
  }


  back(){
    this.route.navigate(['']);
  }

  clear(){
    this.dataService.camera = !this.dataService.camera;
    this.imageUrl = null;
  }
  

  controlGenerator(){
    this.createEmployeeForm = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      phone:["", [Validators.required,ValidatePhone]],
      email: ["", [Validators.email, Validators.required]],
    });
  }

  fileToUpload: any;
  imageUrl: any;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  createEmployee(){
    this.createEmployeeForm.markAllAsTouched();
    if(this.createEmployeeForm.valid){
    let finalData = {};
      finalData =  this.createEmployeeForm.value;
      finalData["imageUrl"] = this.imageUrl;
      if(this.dataService.updateIndex || this.dataService.updateIndex == 0){
        this.dataService.employeeData[this.dataService.updateIndex] = finalData;
        this.dataService.updateIndex = null;
      }else{
        this.dataService.employeeData.push(finalData);
      }
    this.route.navigate(['']);
    this.dataService.updateEmployeeData = false;
    } 
   }

   reset(){
     this.createEmployeeForm.reset();
     this.imageUrl =undefined;
   }

   generateForm(data){
     if(!this.createEmployeeForm){
       this.controlGenerator();
     }
      this.createEmployeeForm.get('name').setValue(data.name, {eventEmit:false});
      this.createEmployeeForm.get('phone').setValue(data.phone, {eventEmit:false});
      this.createEmployeeForm.get('address').setValue(data.address, {eventEmit:false});
      this.createEmployeeForm.get('email').setValue(data.email, {eventEmit:false});
      this.imageUrl = data.imageUrl;
   }

}


function ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {
  if (control.value && control.value.length != 10 || isNaN(control.value)) {
    return { 'phoneNumberInvalid': true };
  }
  return null;
} 