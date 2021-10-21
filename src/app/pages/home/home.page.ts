import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Contato } from 'src/app/contato';
import { CrudContatoService } from 'src/app/crud-contato.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  private _contatos: Contato[];
  private _user : User;
  private data: any;
  headerTitle : string;

  constructor(
    private router : Router, 
    private contatoService: CrudContatoService,
    private auth: AuthService) {
    this.headerTitle = "Página Inicial";
    this._user = this.auth.getLoggedUser();

    this.data = this.contatoService.readContacts();
    this.data.forEach((data) => {
      const list = data as Array<any>;
      this._contatos = [];
      list.forEach(c => {
        let contato = new Contato(
          c.data._nome,
          c.data._telefone,
          c.data._sexo,
          c.data._dataDeNascimento
        )

        contato.id = c.key;
        this._contatos.push(contato);
      })
    })
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
