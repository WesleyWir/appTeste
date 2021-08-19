import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPageRoutingModule } from './cadastrar-routing.module';

import { CadastrarPage } from './cadastrar.page';
import { IonicTabsComponent } from '../../components/ionic-tabs/ionic-tabs.component';
import { IonicHeaderComponent } from 'src/app/components/ionic-header/ionic-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPageRoutingModule
  ],
  declarations: [CadastrarPage, IonicTabsComponent, IonicHeaderComponent]
})
export class CadastrarPageModule {}
