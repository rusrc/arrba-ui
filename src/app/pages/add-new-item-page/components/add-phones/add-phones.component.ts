import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { AuthorizationService } from '../../../../common/services/authorization/authorization.service';
import { PhoneService } from '../../../../common/services/phone/phone.service';

const controlName = 'phoneNumbers';
@Component({
  selector: 'app-add-phones',
  templateUrl: './add-phones.component.html',
  styleUrls: ['./add-phones.component.css']
})
export class AddPhonesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() phoneNumbers: string[];

  constructor(
    private authService: AuthorizationService,
    private phoneService: PhoneService
  ) { }

  ngOnInit() {
    if (this.authService.isAuthorized && this.phoneNumbers) {
      if (this.phoneNumbers && this.phoneNumbers.length > 0) {
        const existedPhones = this.phoneNumbers.map(phn => new FormControl(phn));
        this.form.addControl(controlName, new FormArray(existedPhones));
      } else {
        this.form.addControl(controlName, new FormArray([new FormControl('', Validators.required)]));
      }
    } else {
      this.form.addControl(controlName, new FormArray([new FormControl('', Validators.required)]));
    }
  }

  get phoneNumbersForm() {
    return this.form.get(controlName) as FormArray;
  }

  addPhoneField(event) {
    event.preventDefault();
    this.phoneNumbersForm.push(new FormControl('', Validators.required));
  }

  removePhoneField(event, index: number) {
    event.preventDefault();
    if (this.phoneNumbersForm.length === 1) {
      return false;
    }

    const control = this.phoneNumbersForm.controls[index];
    if (control.value) {
      this.phoneService.delete(control.value).subscribe(response => {
        console.log(response);
        if (response.ok || response.status === 404) {
          this.phoneNumbersForm.removeAt(index);
        }
      });
    } else {
      // Remove fields if no value
      this.phoneNumbersForm.removeAt(index);
    }
  }
}
