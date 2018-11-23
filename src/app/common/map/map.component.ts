import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() location: string;
  isPositionError: boolean = false;
  
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(private mapService: MapService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  mapReadyHandler(){
    this.mapService.getcodeLocation(this.location).subscribe((coordinates) => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.ref.detectChanges();
      

    }, (error) => {
      this.isPositionError = true;
      this.ref.detectChanges();
      
    })
  }

}
