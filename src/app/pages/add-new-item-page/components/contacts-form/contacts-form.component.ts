import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Property } from '../../../../models/property';
import { ControlType } from '../../../../models/ControlType';
import { AuthorizationService } from '../../../../common/services/authorization/authorization.service';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html'
})
export class ContactsFormComponent implements OnInit {

  @Input() form: FormGroup;
  commentModeProperty: Property;

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
    this.form.addControl('phoneNumbers', new FormArray([new FormControl('', Validators.required)]));
    this.form.addControl('additionalComment', new FormControl(''));

    if (!this.isAuthorized) {
      this.form.addControl('email', new FormControl('', Validators.required));
    }

    this.commentModeProperty = new Property('commentMode', ControlType.Select, '', '', [
      { ID: 101, Name: 'Все могут комментировать' },
      { ID: 102, Name: 'Могут комментировать толко зарегистрированные пользователи' },
      { ID: 103, Name: 'Никто не может комментировать' },
    ]);
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get additionalComment() {
    return this.form.get('additionalComment') as FormControl;
  }

  get phoneNumbersForm() {
    return this.form.get('phoneNumbers') as FormArray;
  }

  get isAuthorized() {
    return this.authService.isAuthorized;
  }

  addPhoneNumber(event) {
    event.preventDefault();
    this.phoneNumbersForm.push(new FormControl('', Validators.required));
  }

  removePhoneNumber(event, index: number) {
    event.preventDefault();
    if (this.phoneNumbersForm.length === 1) {
      return false;
    }
    this.phoneNumbersForm.removeAt(index);
  }

}
