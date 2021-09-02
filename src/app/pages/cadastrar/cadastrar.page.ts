import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/contato';
import { ContatoService } from 'src/app/contato.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  private nome: string;
  private telefone: string;
  private sexo : string;
  private data_nascimento : any;
  private headerTitle : string;

  constructor(public alertController: AlertController, 
    public router : Router,
    public contatoService : ContatoService) { 
      this.headerTitle = "Cadastrar Contato";
    }

  ngOnInit() {
  }

  public cadastrar(): void {
    if(this.validate(this.nome) && this.validate(this.telefone) && this.validate(this.sexo) && this.validate(this.data_nascimento)){
      let contatoModel = new Contato(this.nome, this.telefone, this.sexo, this.formatDate(this.data_nascimento));
      this.contatoService.inserir(contatoModel);
      this.alert("Agenda", "SUCESSO", "Cadastro efetuado!");
      this.router.navigate(["/home"]);
    }else{
      this.alert("Agenda", "ERRO - Campos Vazios", "Todos os campos são obrigatórios");
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
