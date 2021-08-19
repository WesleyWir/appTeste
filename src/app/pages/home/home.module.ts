import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { IonicTabsComponent } from '../../components/ionic-tabs/ionic-tabs.component';
import { IonicHeaderComponent } from 'src/app/components/ionic-header/ionic-header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, IonicTabsComponent, IonicHeaderComponent]
})
export class HomePageModule {}
