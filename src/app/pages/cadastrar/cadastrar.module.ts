import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPageRoutingModule } from './cadastrar-routing.module';

import { CadastrarPage } from './cadastrar.page';
import { IonicTabsComponent } from '../../components/ionic-tabs/ionic-tabs.component';
import { IonicHeaderComponent } from 'src/app/components/ionic-header/ionic-header.component';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    IonicModule,
    CadastrarPageRoutingModule
  ],
  declarations: [CadastrarPage, IonicTabsComponent, IonicHeaderComponent]
})
export class CadastrarPageModule {}
