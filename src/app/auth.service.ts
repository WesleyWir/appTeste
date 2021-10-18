import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { auth } from 'firebase';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public ngFireAuth : AngularFireAuth,
    public router: Router,
    public toastController: ToastController,
    public ngZone: NgZone,
  ) { 
    this.ngFireAuth.authState.subscribe(user => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }else{
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  public login(email: string, senha: string)
  {
    return this.ngFireAuth.signInWithEmailAndPassword(email, senha);
  }

  public cadastrar(email: string, senha: string)
  {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, senha);;
  }

  public loginWithGmail(){
    this.AuthLogin(new auth.GoogleAuthProvider());
  }

  public AuthLogin(provider)
  {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
      this.presentToast("Logou com Google.");
      this.ngZone.run(() => {
        this.router.navigate(["home"]);
      })
    })
    .catch((error) => {
      this.presentToast(error);
    })
  }

  public isLogged(): boolean
  {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null) ? true : false; 
  }

  public getLoggedUser(): User
  {
    const user = JSON.parse(localStorage.getItem('user'));

    return (user !== null) ? user : null;
  }

  public resetSenha(email : string)
  {
    return this.ngFireAuth.sendPasswordResetEmail(email)
    .then(() => {
      this.presentToast("Enviado para o email: "+ email);
    })
    .catch((error) => {
      this.presentToast("Email não cadastrado.");
    });
  }

  public logout()
  {
    return this.ngFireAuth.signOut()
    .then(() => {
      this.presentToast("Volte Sempre!");
      localStorage.removeItem('user');
      this.ngZone.run(() => {
        this.router.navigate(["login"]);
      });
    })
  }

  async presentToast(message: string)
  {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });

    toast.present();
  }
}
