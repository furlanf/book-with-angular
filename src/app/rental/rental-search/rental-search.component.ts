import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../rental-service/rental.service';
import { Rental } from '../rental-service/rental.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {

  city: any;
  rentals: Rental[] = [];
  errors: any[] = [];

  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.city = params.city;
      this.getRentals();
    });
  }

  getRentals() {
    this.errors = [];
    this.rentals = [];

    this.rentalService.getRentalsByCity(this.city).subscribe((rentalsFound: Rental[]) => {
      this.rentals = rentalsFound;
    }, (err: HttpErrorResponse) => {
      this.errors = err.error.errors;
    });
  }



}
