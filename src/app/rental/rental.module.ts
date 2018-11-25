import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgPipesModule, UcWordsPipe } from "ngx-pipes";
import { Daterangepicker } from "ng2-daterangepicker";

import { FormsModule } from "@angular/forms";

import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalComponent } from "./rental.component";
import { RentalDetailBookingComponent } from "./rental-detail/rental-detail-booking/rental-detail-booking.component";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";

import { MapModule } from "../common/map/map.module";
import { AuthGuard } from "../auth/shared/auth.guard";

import { HelperService } from "../common/service/helper.service";
import { RentalService } from "./rental-service/rental.service";
import { BookingService } from "../booking/shared/booking.service";
import { RentalSearchComponent } from "./rental-search/rental-search.component";
import { RentalCreateComponent } from "./rental-create/rental-create.component";
import { RentalUpdateComponent } from "./rental-update/rental-update.component";
import { EditableModule } from "../common/components/editable/editable.module";
import { RentalGuard } from "./rental-service/rental.guard";
import { ImageUploadModule } from "../common/components/image-upload/image-upload.module";

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      {
        path: "new",
        component: RentalCreateComponent,
        canActivate: [AuthGuard]
      },
      { path: ":id", component: RentalDetailComponent },
      {
        path: ":id/edit",
        component: RentalUpdateComponent,
        canActivate: [AuthGuard, RentalGuard]
      },
      { path: ":city/homes", component: RentalSearchComponent }
    ]
  }
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    RentalDetailBookingComponent,
    RentalSearchComponent,
    RentalCreateComponent,
    RentalUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    FormsModule,
    EditableModule,
    ImageUploadModule,
    Daterangepicker
  ],
  providers: [
    RentalService,
    HelperService,
    BookingService,
    UcWordsPipe,
    RentalGuard
  ]
})
export class RentalModule {}
