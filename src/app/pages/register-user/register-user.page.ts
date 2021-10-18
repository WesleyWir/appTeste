import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  private _formCadastrar: FormGroup;
  private _isSubmitted: boolean = false;

  constructor(public alertController,
    public router: Router,
    public auth: AuthService,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.headerTitle = "Cadastrar Usuário";
    this._formCadastrar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl() {
    return this._formCadastrar.controls;
  }

  public submitForm() {
    this._isSubmitted = true;
    if (!this._formCadastrar.valid) {
      this.alert("Agenda", "ERRO - Campos Vazios", "Todos os campos são obrigatórios");
      return false;
    }
    this.cadastrar();
  }

  private cadastrar(): void {
    let email = this._formCadastrar.value["email"];
    let senha = this._formCadastrar.value["senha"];
    this.auth.cadastrar(email, senha)
      .then((res) => {
        this.alert("Agenda", "SUCESSO", "Usuário Cadastrado");
        this.router.navigate(["/login"]);
      })
      .catch((err) => {
        this.alert("Agenda", "ERRO", "Não foi possível fazer o cadastro.");
      });
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
