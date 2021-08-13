import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  private _contatos: any[];

  constructor() {
    this._contatos = [
      {nome: 'Wesley', tel: '(42) 9 9999 9999'}, 
      {nome: 'Ana', tel: '(42) 9 9999 9999'}, 
      {nome: 'João', tel: '(42) 9 9999 9999'}, 
      {nome: 'Jô', tel: '(42) 9 9999 9999'}, 
    ];
  }

}
