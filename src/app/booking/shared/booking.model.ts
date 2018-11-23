import { Rental } from "../../rental/rental-service/rental.model";

export class Booking {
  static readonly DATE_FORMAT = "Y/MM/DD";

  _id: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  guests: number;
  days: number;
  createdAt: number;
  rental: Rental;
}
