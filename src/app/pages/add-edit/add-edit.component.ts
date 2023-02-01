import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  addEmployees:FormGroup
  submitted: boolean = false;
  phoneValid:boolean = false;
  pageView: any;
  id: any;
  type: any;
  city: any = [];
  country: any;
  area: any;
  numberDetails: any;
  pinCode: any;
  arr: any;
  value: any;
  separateDialCode = true;
 SearchCountryField = SearchCountryField;
 CountryISO = CountryISO;
 PhoneNumberFormat = PhoneNumberFormat;

 preferredCountries: CountryISO[] = [CountryISO.UnitedStates, 
  CountryISO.UnitedKingdom];
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private common:CommonService,
    private _toastrService: ToastrService,
    ) {
    this.addEmployees = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),]],
      phone: ['', [Validators.required, Validators.minLength(7),Validators.maxLength(15)]],
      countrycode: [''],
   });
   this.route.params.subscribe((params: Params) => this.id = params['id']);
   this.route.params.subscribe((params: Params) => this.pageView = params['view']);
   this.type = this.pageView;
  //  this.pageView = this.route.snapshot.paramMap.get('type')
  //  console.log(this.pageView);
   this.numberDetails = {
    phone: '',
      countryCode: '',
      disabled: false,
   };
 };

   ngOnInit(): void {
    if (this.pageView !== 'add') {
      this.getby(this.id)
    }
  }
    
  getby(id:any){
    this.auth.getRequestWithID('merchant/' ,id).subscribe((res:any)=>{
      console.log(res)
      this.addEmployees.patchValue(res.data)
      
      this.addEmployees.patchValue({phone: res.data.countryCode + res.data.phone})
      // if (this.type == "view") {
      //   this.addEmployees.disable();
      //   this.numberDetails={
      //     phone: res.data.phone,
      //     countryCode: res.data.countryCode,
      //     disabled: true,
      //   };
      // }
    });
  }
  // fetchNumberOutput(event: any) {
  //   if (event.valid) {
  //     this.phoneValid = true;
  //     this.addEmployees.patchValue({
  //       phone: event['number'],
  //       countryCode: event['dialCode'],
  //     });
  //   } else {
  //     this.phoneValid = false;
  //     this.addEmployees.patchValue({
  //       phone: event['number'],
  //       countryCode: event['dialCode'],
  //     });
  //   }
  // }

  onSubmit(){
    // debugger
    
    console.log(this.addEmployees.value)
    this.submitted = true;
    if(this.addEmployees.valid){
    // let tempCountryCode = this.addEmployees['controls']['countryCode']['value'];

    // if (tempCountryCode) {
    //   let phone = this.addEmployees['controls']['phone']['value'];

    //   if (phone.includes(tempCountryCode)) {
    //     phone = phone.split(tempCountryCode);

    //     this.addEmployees.patchValue({
    //       phone: phone[1].trim(),
    //     });
    //   }
    // }
    
    (this.type == 'add'
    ? this.auth.postRequestwithoutToken('merchant', this.addEmployees.value)
    : this.auth.putWithID('merchant', this.id, this.addEmployees.value)
  ).subscribe((result) => {
        this.common.presentsToast('success', 'top-end', result.message);

     console.log(result);
    this.router.navigateByUrl('/list')
  })

  if (this.addEmployees.valid) {
    this.addEmployees.enabled
  }

  else {
    this.addEmployees.markAllAsTouched()
  }
}
}
handleAddressChange(event:any){
  let long: any;
  let lat: any;
  (long = event.geometry.location.lng()),
    (lat = event.geometry.location.lat());
  this.addEmployees.patchValue({
    address: event.formatted_address,
    longitude: long,
    latitude: lat,
  });

}
  }


