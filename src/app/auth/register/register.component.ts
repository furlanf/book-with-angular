import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any[] = [];
  
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
  }


  register(){
    this.authService.register(this.formData).subscribe(() => {
      this.router.navigate(['/login', {
        registered: 'success'
      }]);
    }, (err) => {
      this.errors = err.error.errors;
    });
  }
}
