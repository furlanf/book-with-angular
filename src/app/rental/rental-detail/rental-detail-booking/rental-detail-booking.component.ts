import { Component, OnInit, Input, OnChanges, ViewContainerRef, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Rental } from '../../rental-service/rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import * as moment from "moment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../../../booking/shared/booking.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { AuthService } from '../../../auth/shared/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnChanges {

  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  public daterange: any = {};
  bookedOutDates: any[] = [];
  newBooking: Booking;
  modalRef: any;
  errors: any[] = [];


  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDates.bind(this),
    autoUpdateInput: false
  };

  constructor(private helper: HelperService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private vcr: ViewContainerRef,
    public auth: AuthService,
    private bookingService: BookingService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnChanges() {
    this.newBooking = new Booking();
    this.computeTakenDates();
  }

  private computeTakenDates() {
    const bookings: Booking[] = this.rental.bookings;


    if (bookings && bookings.length) {
      bookings.forEach(booking => {
        const daterange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...daterange);
      });
    }
  }

  private resetDatepicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  private addNewBookedDate(bookingData: any) {
    const daterange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...daterange);
  }

  createBooking() {
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe((bookingData: any) => {
      this.newBooking = new Booking();
      this.addNewBookedDate(bookingData);
      this.modalRef.close();
      this.toastr.success('Booking has been successfully created!', 'Success!');
      this.resetDatepicker();
    }, (err: any) => {
      this.errors = err.error.errors;
    })
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  public selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

}
