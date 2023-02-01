import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntlTelInputComponent } from './intl-tel-input.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input'
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IntlTelInputComponent],
  exports: [IntlTelInputComponent]
})
export class IntlTelInputModule { }
