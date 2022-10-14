import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../../common/services/authorization/authorization.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ISeo } from '../../../../common/interfaces/ISeo';
import { SeoService } from '../../../../common/services/seo/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, ISeo {

  form: FormGroup;
  error: string;

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private seoService: SeoService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
    this.seo({});
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe(response => {
      if (response.status === 200) {
        this.authService.saveToken(<string>response.body);
        this.router.navigate(['room']);
      }
    }, httpErrorResponse => {
      if (httpErrorResponse instanceof HttpErrorResponse) {
        switch (httpErrorResponse.status) {
          case 404:
            this.error = 'Неверный пароль или email.';
            break;
          default:
            this.error = httpErrorResponse.statusText;
            break;
        }
      }
    });

  }

  seo(_) {
    this.seoService.loginPage();
  }
}
