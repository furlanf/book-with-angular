import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rental } from "./rental.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RentalService {
  constructor(private http: HttpClient) {}

  public getRentalById(id: string): Observable<any> {
    return this.http.get("/api/v1/rentals/" + id);
  }

  public getRentals(): Observable<any> {
    return this.http.get("/api/v1/rentals");
  }

  public getRentalsByCity(city: string): Observable<any> {
    return this.http.get(`/api/v1/rentals?city=${city}`);
  }

  public createRental(rental: Rental): Observable<any> {
    return this.http.post(`api/v1/rentals`, rental);
  }

  public getUserRentals(): Observable<any> {
    return this.http.get(`api/v1/rentals/manage`);
  }

  public deleteRentalById(id: String): Observable<any> {
    return this.http.delete(`api/v1/rentals/${id}`);
  }
}
