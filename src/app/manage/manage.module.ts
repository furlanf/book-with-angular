import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ManageRentalComponent } from "./manage-rental/manage-rental.component";
import { ManageBookingComponent } from "./manage-booking/manage-booking.component";
import { ManageComponent } from "./manage.component";
import { RentalService } from "../rental/rental-service/rental.service";
import { BookingService } from "../booking/shared/booking.service";
import { NgPipesModule } from "ngx-pipes";
import { FormatDatePipes } from "../common/pipes/format-date.pipe";
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';

const routes: Routes = [
  {
    path: "manage",
    component: ManageComponent,
    children: [
      { path: "rentals", component: ManageRentalComponent },
      { path: "bookings", component: ManageBookingComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ManageRentalComponent,
    ManageComponent,
    ManageBookingComponent,
    FormatDatePipes,
    ManageRentalBookingComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), NgPipesModule],
  providers: [RentalService, BookingService]
})
export class ManageModule {}
