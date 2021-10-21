import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/contato';
import { CrudContatoService } from 'src/app/crud-contato.service';
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  private _formCadastrar: FormGroup;
  private _isSubmitted: boolean = false;
  private headerTitle: string;

  constructor(public alertController: AlertController,
    public router: Router,
    public contatoService: CrudContatoService,
    public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.headerTitle = "Cadastrar Contato";
    this._formCadastrar = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(8)]],
      telefone: ['', [Validators.required, Validators.minLength(10)]],
      sexo: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this._formCadastrar.controls;
  }

  public submitForm() {
    this._isSubmitted = true;
    if (!this._formCadastrar.valid) {
      return false;
    }

    this.cadastrar();
  }

  public cadastrar(): void {
    let contatoModel = new Contato(
      this._formCadastrar.value['nome'], 
      this._formCadastrar.value['telefone'], 
      this._formCadastrar.value['sexo'], 
      this.formatDate(this._formCadastrar.value['dataNascimento'])
    );
    this.contatoService.createContact(contatoModel)
    .then(() => {
      this.alert("Agenda", "SUCESSO", "Cadastro efetuado!");
      this.router.navigate(["/home"]);
    }).catch((e) => {
      this.alert("Agenda", "Erro", "Erro ao Cadastrar!");
    });

  }

  private formatDate(date: string): string {
    //Fazer de uma forma melhor ou encontrar solução no framework.
    let dateSliced = date.slice(0, 10);
    let dateSplitted = dateSliced.split("-");

    let dateFormatted = dateSplitted[2];
    dateFormatted += "/" + dateSplitted[1] + "/";
    dateFormatted += dateSplitted[0];

    return dateFormatted;
  }

  async alert(title: string, subtitle: string, message: string) {
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
