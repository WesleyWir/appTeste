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
  private telefone: number;
  private sexo : string;
  private data_nascimento : any;

  constructor(public alertController: AlertController, 
    public router : Router,
    public contatoService : ContatoService) { }

  ngOnInit() {
  }

  public cadastrar(): void {
    if(this.validate(this.nome) && this.validate(this.telefone)){
      let contato = new Contato(this.nome, this.telefone);
      this.contatoService.inserir(contato);
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
