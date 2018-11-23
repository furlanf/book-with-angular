import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import 'rxjs/Rx';

class DecodedToken {
    exp: number;
    username: string = '';
}

@Injectable()
export class AuthService {
    private decodedToken;

    constructor(private http: HttpClient) {
        this.decodedToken = JSON.parse(localStorage.getItem('meta')) || new DecodedToken();
    }

    public register(userData: any): Observable<any> {

        return this.http.post('api/v1/users/register', userData);

    }

    public login(loginData: any): Observable<any> {
        return this.http.post('api/v1/users/auth', loginData).pipe(map((token: string) => this.saveToken(token)))
    }

    public logout(){
        localStorage.removeItem('auth');
        localStorage.removeItem('meta');

        this.decodedToken = new DecodedToken();
    }

    private saveToken(token: string): string {
        this.decodedToken = jwt.decode(token);
        // debugger;
        localStorage.setItem('auth', token);
        localStorage.setItem('meta', JSON.stringify(this.decodedToken));

        return token;
    }

    private getExpiration() {
        return moment.unix(this.decodedToken.exp);
    }

    public isAuthenticated(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    public getAuthToken(): string {
        return localStorage.getItem('auth');
    }
    public getUsername(): string {
        return this.decodedToken.username;
    }
}