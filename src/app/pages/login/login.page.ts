import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private _formLogar: FormGroup;
  private _isSubmitted: boolean = false;


  constructor(public alertController: AlertController,
    public auth: AuthService,
    public router: Router,
    public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // this.headerTitle = "Login";
    this._formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get errorControl() {
    return this._formLogar.controls;
  }

  public submitForm() {
    this._isSubmitted = true;
    if (!this._formLogar.valid) {
      this.alert("Agenda", "ERRO - Campos Vazios", "Todos os campos são obrigatórios");
      return false;
    }
    this.logar();
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

  private logar(): void{
    let email = this._formLogar.value["email"];
    let senha = this._formLogar.value["senha"];
    this.auth.login(email, senha)
      .then((res) => {
        this.alert("Agenda", "SUCESSO", "Seja Bem Vindo!");
        this.router.navigate(["/home"]);
      })
      .catch((err) => {
        this.alert("Agenda", "ERRO", "Erro ao logar, tente novamente.");
      });
  }

  private loginWithGmail():void
  {
    this.auth.loginWithGmail();
  }

  private irParaCadastrar() : void
  {
    this.router.navigate(["/register-user"]);
  }
}
