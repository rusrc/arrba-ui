import { Component, OnInit } from '@angular/core';
import { GRECAPTCHA_SITEKEY } from '../../../../common/constants/constants';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorizationService } from '../../../../common/services/authorization/authorization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../common/services/message/message.service';
import { Meta, Title } from '@angular/platform-browser';
import { map, filter } from 'rxjs/operators';
import { SeoService } from '../../../../common/services/seo/seo.service';

@Component({
  selector: 'app-add-new-item-check-guest',
  templateUrl: './add-new-item-check-guest.component.html'
})
export class AddNewItemCheckGuestComponent implements OnInit {
  siteKey = GRECAPTCHA_SITEKEY;
  form: FormGroup;
  error: string;

  constructor(
    private meta: Meta,
    private title: Title,
    private seoService: SeoService,
    private authService: AuthorizationService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    // TODO: add SEO for category
    // this.activeRoute.params
    //   .pipe(
    //     map(params => +params['categoryId']),
    //     filter(categoryId => !!categoryId)
    //   )
    //   .subscribe(categoryId => {
    //     // this.seoService.addNewItemPage(null);
    //   });

    this.form = new FormGroup({
      'grecaptchaToken': new FormControl('')
    });
  }

  resolvedCaptcha(grecaptchaToken) {
    const control = this.form.get('grecaptchaToken');
    control.setValue(grecaptchaToken);
    this.onSubmit();
  }

  onSubmit() {
    this.authService.loginAsGuest(this.form.value).subscribe(response => {
      if (response.status === 200) {
        this.authService.saveGuestToken(<string>response.body);
        const selectedCategoryId = this.activeRoute.snapshot.params['categoryId'];
        if (selectedCategoryId) {
          this.router.navigate(['/add-new-item', selectedCategoryId], { relativeTo: this.activeRoute });
        } else {
          this.router.navigate(['add-new-item']);
        }
      }
    }, httpErrorResponse => {
      this.messageService.throwError(httpErrorResponse);
    });
  }
}
