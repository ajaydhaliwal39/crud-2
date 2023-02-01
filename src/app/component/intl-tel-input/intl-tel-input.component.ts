import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-intl-tel-input',
  templateUrl: './intl-tel-input.component.html',
  styleUrls: ['./intl-tel-input.component.scss'],
})
export class IntlTelInputComponent implements OnInit {
  @Input() numberDetails: Object = {
    phone: null,
    countryCode: null,
    disabled: false,
  };

  @Output() numberOutput: EventEmitter<any> = new EventEmitter();

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Morocco,
    CountryISO.UnitedKingdom,
  ];

  phoneFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.phoneFormGroup = this.formBuilder.group({
      phone: [
        { value: '', disabled: this.numberDetails },
        [Validators.required],
      ],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.numberDetails != undefined) {
      // this.phoneFormGroup.get('phone').patchValue({
      //   dialCode: this.numberDetails['countryCode'],
      //   e164Number: this.numberDetails['phone'],
      //   number:
      //     this.numberDetails['countryCode'] + ' ' + this.numberDetails['phone'],
      // });
    }

    if (this.numberDetails == true) {
      this.phoneFormGroup.controls['phone'].disable();
    } else {
      this.phoneFormGroup.controls['phone'].enable();
    }
  }

  ngOnInit() {}

  changeEvent(event: any) {
    if (this.phoneFormGroup.valid) {
      let data = {
        valid: this.phoneFormGroup.valid,
        countryCode: event['countryCode'],
        dialCode: event['dialCode'],
        e164Number: event['e164Number'],
        internationalNumber: event['internationalNumber'],
        nationalNumber: event['nationalNumber'],
        number: event['number'],
      };
      this.numberOutput.emit(data);
    } else {
      let data = {
        valid: false,
        countryCode: event['countryCode'],
        dialCode: event['dialCode'],
        e164Number: event['e164Number'],
        internationalNumber: event['internationalNumber'],
        nationalNumber: event['nationalNumber'],
        number: event['number'],
      };
      this.numberOutput.emit(data);
    }
  }

  event2(event:any) {
    // if (this.phoneFormGroup.valid) {
    //   let data = {
    //     valid: this.phoneFormGroup.valid,
    //     countryCode: this.phoneFormGroup.controls['phone']['countryCode'],
    //     dialCode: this.phoneFormGroup.controls['phone']['dialCode'],
    //     e164Number: this.phoneFormGroup.controls['phone']['e164Number'],
    //     internationalNumber:
    //       this.phoneFormGroup.controls['phone']['internationalNumber'],
    //     nationalNumber: this.phoneFormGroup.controls['phone']['nationalNumber'],
    //     number: this.phoneFormGroup.controls['phone']['number'],
    //   };
    //   this.numberOutput.emit(data);
    // } else {
    //   let data = {
    //     valid: false,
    //     countryCode: event['countryCode'],
    //     dialCode: event['dialCode'],
    //     e164Number: event['e164Number'],
    //     internationalNumber: event['internationalNumber'],
    //     nationalNumber: event['nationalNumber'],
    //     number: event['number'],
    //   };
    //   this.numberOutput.emit(data);
    // }
  }
}
