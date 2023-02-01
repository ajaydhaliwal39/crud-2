import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { HeadbarComponent } from './layout/headbar/headbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    FooterComponent,
    HeadbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  
  ],
  exports: [
    HeadbarComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
