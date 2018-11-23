import { Component, OnInit } from '@angular/core';
import { Rental } from '../rental-service/rental.model';
import { RentalService } from '../rental-service/rental.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  constructor(private rentalService: RentalService, private router: Router) { }
  newRental: Rental;
  rentalCategories: any = Rental.CATEGORIES;
  errors: any[] = [];


  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental() {
    this.rentalService.createRental(this.newRental).subscribe((rental: Rental) => {
      this.router.navigate([`rentals/${rental._id}`]);
    }, (err: HttpErrorResponse) => {
      this.errors = err.error.errors;

    });
    console.log(this.newRental);
  }

  handleImageChange() {
    console.log('hangle image called');
    this.newRental.image = "https://picsum.photos/600/400?random";
  }

}
