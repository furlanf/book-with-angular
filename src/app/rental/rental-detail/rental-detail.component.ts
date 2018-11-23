import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../rental-service/rental.service';
import { Rental } from '../rental-service/rental.model';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  rental: Rental = new Rental();

  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getRental(params.id);
    })
  }

  getRental(id: string) {
    this.rentalService.getRentalById(id)
      .subscribe((rental: Rental) => {
        this.rental = rental;
      });
  }

}
