import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  ipaddress: any;
  map:any;

  constructor(public dataService: DataService) { }

  ngOnInit(){
    this.currentLocationDate();

  }

  currentLocationDate(): void {

    this.dataService.getIpAddress().subscribe((res: any) => {

      this.ipaddress = res.ip;
      this.dataService.getGEOLocation(this.ipaddress).subscribe((res1: any) => {
        this.dataService.lat = res1.latitude;
        this.dataService.long = res1.longitude;
        this.dataService.currentLoaction = res1.city + ', ' + res1.district + ', ' + res1.state_prov + ', ' + res1.country_name + ', ' + res1.zipcode;

        this.getLocation();
      });

    });
  }

  getLocation() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([+this.dataService.long, +this.dataService.lat]),
        zoom: 12
      })
    });
  }
}
