import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Contato } from 'src/app/contato';
import { ContatoService } from 'src/app/contato.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  private _contatos: Contato[];
  private _user : User;
  headerTitle : string;

  constructor(
    private router : Router, 
    private contatoService: ContatoService,
    private auth: AuthService) {
    this._user = this.auth.getLoggedUser();
    this.headerTitle = "Página Inicial";
    this._contatos = this.contatoService.getContatos();
  }

  public goToCadastrar(): void {
    this.router.navigate(['/cadastrar']);
  }

  public goToDetalhar(contato : Contato): void {
    this.router.navigateByUrl('/detalhar', {state: {contato}});
  }

  public logout(): void 
  {
    this.auth.logout();
  }
}
