import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalharPageRoutingModule } from './detalhar-routing.module';

import { DetalharPage } from './detalhar.page';
import { IonicTabsComponent } from 'src/app/components/ionic-tabs/ionic-tabs.component';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    IonicModule,
    DetalharPageRoutingModule
  ],
  declarations: [DetalharPage, IonicTabsComponent]
})
export class DetalharPageModule {}
