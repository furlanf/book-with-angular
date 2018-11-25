import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "../rental-service/rental.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { Subject } from "rxjs";
import { UcWordsPipe } from "ngx-pipes";
import { Rental } from "../rental-service/rental.model";

@Component({
  selector: "app-rental-update",
  templateUrl: "./rental-update.component.html",
  styleUrls: ["./rental-update.component.scss"]
})
export class RentalUpdateComponent implements OnInit {
  rental: Rental = new Rental();

  categories: any[] = Rental.CATEGORIES;

  locationSubject: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private vcr: ViewContainerRef,
    private toastr: ToastrService,
    private ucwords: UcWordsPipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getRental(params.id);
    });
  }

  getRental(id: string) {
    this.rentalService.getRentalById(id).subscribe((rental: Rental) => {
      this.rental = rental;
    });
  }

  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.patchRentalById(rentalId, rentalData).subscribe(
      (rental: Rental) => {
        this.toastr.success("Rental updated!", "Success!");
        this.rental = rental;

        if (rentalData.city || rentalData.street) {
          this.locationSubject.next(
            this.rental.city + ", " + this.rental.street
          );
        }
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.error.errors[0].detail, "Failed!");
        this.getRental(rentalId);
      }
    );
  }

  countBedrooms(number: number) {
    return parseInt(<any>this.rental.bedrooms, 10) + number;
  }

  uppercase(string: string): string {
    return this.ucwords.transform(string);
  }
}
