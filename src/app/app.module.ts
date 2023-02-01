import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SetInterceptorService } from './core/intercepter/set-interceptor/set-interceptor.service';
import { GetInterceptorService } from './core/intercepter/get-interceptor/get-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width'
    }),

  ],
  providers: [

    NgxSpinnerService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GetInterceptorService,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
