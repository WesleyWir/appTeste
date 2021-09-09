import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/contato';
import { ContatoService } from 'src/app/contato.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  private _contato: Contato;
  private nome: string;
  private telefone: string;
  private sexo : string;
  private data_nascimento : any;
  private _editar : boolean = false;

  constructor(
    private router : Router, 
    public alertController: AlertController,
    public contatoService : ContatoService) { 

  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this._contato = nav.extras.state.contato;

    this.nome = this._contato.nome;
    this.telefone = this._contato.telefone;
    this.sexo = this._contato.sexo;
    this.data_nascimento = this._contato.dataDeNascimento;
  }

  public editar(): void {
    if(this.validate(this.nome) && this.validate(this.telefone) && this.validate(this.sexo) && this.validate(this.data_nascimento)){
      let contatoModel = new Contato(this.nome, this.telefone, this.sexo, this.formatDate(this.data_nascimento));
      let status = this.contatoService.editar(this._contato, this.nome, this.telefone, this.sexo, this.formatDate(this.data_nascimento));
      if(status){
        this.alert("Agenda", "SUCESSO", "Edição efetuada!");
        this.router.navigate(["/home"]);
      }else{
        this.alert("Agenda", "ERRO - Cadastro não encontrado.", "Cadastro não encontrado.");
      }
    }else{
      this.alert("Agenda", "ERRO - Campos Vazios", "Todos os campos são obrigatórios");
    }
  }

  public excluir(): void{
    let status = this.contatoService.excluir(this._contato);

    if(status){
      this.alert("Agenda", "SUCESSO", "Exclusão efetuada!");
      this.router.navigate(["/home"]);
    }else{
      this.alert("Agenda", "ERRO", "Contato não encontrado!");
    }
  }

  private validate(campo: any): boolean {
    if (campo) {
      return true;
    }

    return false;
  }

  private formatDate(date: string): string
  {
    //Fazer de uma forma melhor ou encontrar solução no framework.
    let dateSliced = date.slice(0, 10);
    let dateSplitted = dateSliced.split("-");

    let dateFormatted = dateSplitted[2];
    dateFormatted += "/"+dateSplitted[1]+"/";
    dateFormatted += dateSplitted[0];

    return dateFormatted;
  }

  async alert(title : string, subtitle : string, message : string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
