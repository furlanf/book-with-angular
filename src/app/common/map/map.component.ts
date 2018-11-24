import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { MapService } from "./map.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() location: string;
  @Input() locationSubject: Subject<any>;

  isPositionError: boolean = false;

  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(private mapService: MapService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }

  ngOnDestroy() {
    if (this.locationSubject) {
      this.locationSubject.unsubscribe();
    }
  }

  getLocation(location) {
    this.mapService.getcodeLocation(location).subscribe(
      coordinates => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      },
      error => {
        this.isPositionError = true;
        this.ref.detectChanges();
      }
    );
  }

  mapReadyHandler() {
    this.getLocation(this.location);
  }
}
