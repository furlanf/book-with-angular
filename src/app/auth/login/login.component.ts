import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(params => {
      if (params["registered"] === "success") {
        this.notifyMessage = "You have been succesfully registered!";
      }
    });
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }

  isValidForm(fieldName: any): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }

  isRequired(fieldName: any): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigate(["/rentals"]);
      },
      err => {
        this.errors = err.error.errors;
      }
    );
  }
}
