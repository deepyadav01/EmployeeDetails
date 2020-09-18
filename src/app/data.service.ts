import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const GetIP = 'https://api.ipify.org/?format=json';
const Currentlocation = 'https://api.ipgeolocation.io/ipgeo?apiKey=0f4e06b0721a4a2b82bce38abc80b31a&ip=';

@Injectable({
  providedIn: 'root'
})
export class DataService {

employeeData = [];
updateIndex = null;
updateEmployeeData = false;
map: any;
lat: any;
long: any;
currentLoaction;
camera = true;
  constructor(public http: HttpClient) { }
  getIpAddress() {
    return this.http
      .get(GetIP)
      .pipe(
        catchError(this.handleError)
      );
  }

  getGEOLocation(ip) {
    const url = `${Currentlocation}${ip}` ;
    return this.http
      .get(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


}
