import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private _formDetalhar: FormGroup;
  private _isSubmitted: boolean = false;
  private _editar: boolean = false;

  constructor(
    private router: Router,
    public alertController: AlertController,
    public contatoService: ContatoService,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this._contato = nav.extras.state.contato;

    this._formDetalhar = this.formBuilder.group({
      nome: [this._contato.nome, [Validators.required, Validators.minLength(8)]],
      telefone: [this._contato.telefone, [Validators.required, Validators.minLength(10)]],
      sexo: [this._contato.sexo, [Validators.required]],
      dataNascimento: [this._contato.dataDeNascimento, [Validators.required]],
    });
  }

  get errorControl() {
    return this._formDetalhar.controls;
  }

  public submitForm() {
    this._isSubmitted = true;
    if (!this._formDetalhar.valid) {
      this.alert("Agenda", "ERRO - Campos Vazios", "Todos os campos são obrigatórios");
      return false;
    }

    this.editar();
  }

  public editar(): void {

    let contatoModel = new Contato(
      this._formDetalhar.value['nome'], 
      this._formDetalhar.value['telefone'], 
      this._formDetalhar.value['sexo'], 
      this.formatDate(this._formDetalhar.value['dataNascimento'])
    );
    let status = this.contatoService.editar(this._contato, contatoModel);
    if (status) {
      this.alert("Agenda", "SUCESSO", "Edição efetuada!");
      this.router.navigate(["/home"]);
    } else {
      this.alert("Agenda", "ERRO - Campos Vazios", "Todos os campos são obrigatórios");
    }
  }

  public excluir(): void {
    let status = this.contatoService.excluir(this._contato);

    if (status) {
      this.alert("Agenda", "SUCESSO", "Exclusão efetuada!");
      this.router.navigate(["/home"]);
    } else {
      this.alert("Agenda", "ERRO", "Contato não encontrado!");
    }
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
