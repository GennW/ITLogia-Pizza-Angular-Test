import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/components/share/popup/popup.component';



@NgModule({
  declarations: [
    AboutComponent,
    MainComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HomeRoutingModule,
    NgbModalModule
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
