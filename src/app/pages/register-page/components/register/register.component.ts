import { Component, OnInit } from '@angular/core';
import { GRECAPTCHA_SITEKEY } from '../../../../common/constants/constants';
import { FormGroup, FormControl } from '@angular/forms';
import { Property } from '../../../../models/property';
import { ControlType } from '../../../../models/ControlType';
import { SignUpService } from '../../../../common/services/signUp/sign-up.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from '../../../../common/services/authorization/authorization.service';
import { Router } from '@angular/router';
import { ISeo } from '../../../../common/interfaces/ISeo';
import { SeoService } from '../../../../common/services/seo/seo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, ISeo {

  siteKey = GRECAPTCHA_SITEKEY;
  error: string;
  form: FormGroup;
  email: Property;
  password: Property;
  // repeatPassword: Property;
  ruleAgree: Property;
  passwordTypeToggle = 'password';

  constructor(
    private signUpService: SignUpService,
    private authService: AuthorizationService,
    private router: Router,
    private seoService: SeoService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'grecaptchaToken': new FormControl(''),
      'password': new FormControl('')
    });
    this.email = new Property('email', ControlType.Value, 'Ваш email', '');
    // this.password = new Property('password', ControlType.Value, 'Ваш email', '');
    // this.repeatPassword = new Property('repeatPassword', ControlType.Value, 'Ваш email', '');
    this.ruleAgree = new Property('ruleAgree', ControlType.CheckBox, 'Поддтвердите ', '');
    this.seo({});
  }

  resolvedCaptcha(grecaptchaToken) {
    const control = this.form.get('grecaptchaToken');
    control.setValue(grecaptchaToken);
  }

  onTogglePassword() {
    if (this.passwordTypeToggle === 'password') {
      this.passwordTypeToggle = 'text';
    } else {
      this.passwordTypeToggle = 'password';
    }
  }

  onSubmit() {
    this.signUpService.register(this.form.value).subscribe(response => {
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
    this.seoService.registerPage();
  }

}
