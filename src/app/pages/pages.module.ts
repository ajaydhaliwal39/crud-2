import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { IntlTelInputModule } from '../component/intl-tel-input/intl-tel-input.module';
import { PaginatorModule } from '../component/paginator/paginator.module';
import { SearchModule } from '../component/search/search.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatInputModule } from '@angular/material/input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
@NgModule({
    declarations: [
        HomeComponent,
        ListComponent,
        AddEditComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        MatInputModule,
        SearchModule,
        PaginatorModule,
        IntlTelInputModule,
        MaterialModule,
        NgxIntlTelInputModule,
        GooglePlaceModule
    ]
})
export class PagesModule { }
