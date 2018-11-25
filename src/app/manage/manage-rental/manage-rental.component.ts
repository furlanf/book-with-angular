import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RentalService } from "../../rental/rental-service/rental.service";
import { Rental } from "../../rental/rental-service/rental.model";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-manage-rental",
  templateUrl: "./manage-rental.component.html",
  styleUrls: ["./manage-rental.component.scss"]
})
export class ManageRentalComponent implements OnInit {
  rentals: Rental[];
  rentalDeleteIndex: any;
  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.getUserRental();
  }

  async delete(rental) {
    return await this.rentalService.deleteRentalById(rental._id).subscribe(
      response => {
        this.rentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.error.errors[0].detail, "Failed!");
      }
    );
  }

  async getUserRental() {
    return await this.rentalService.getUserRentals().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      err => {}
    );
  }
}
