import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  private _formRecoverPassword: FormGroup;
  private _isSubmitted: boolean = false;

  constructor(public alertController: AlertController,
    public auth: AuthService,
    public router: Router,
    public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this._formRecoverPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get errorControl() {
    return this._formRecoverPassword.controls;
  }

  public submitForm() {
    this._isSubmitted = true;
    if (!this._formRecoverPassword.valid) {
      return false;
    }
    this.logar();
  }

  private logar(): void{
    let email = this._formRecoverPassword.value["email"];
    this.auth.recoverPassword(email)
      .then((res) => {
        this.router.navigate(["/home"]);
      })
      .catch((err) => {
      });
  }

  private goToLogin()
  {
    this.router.navigate(['/login']);
  }

}
