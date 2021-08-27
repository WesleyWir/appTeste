import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato } from 'src/app/contato';
import { ContatoService } from 'src/app/contato.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  private _contatos: Contato[];

  constructor(private router : Router, private contatoService: ContatoService) {
    this._contatos = this.contatoService.getContatos();
  }

  public goToCadastrar(): void {
    this.router.navigate(['/cadastrar']);
  }
}
