import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public ngFireAuth : AngularFireAuth,
    public router: Router,
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

  public AuthLogin(provide)
  {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(["home"]);
      })
    })
    .catch((error) => {
      console.error("Erro ao logar.");
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
      console.log("Enviado para o email.");
    })
    .catch((error) => {
      console.error(error);
    });
  }

  public logout()
  {
    return this.ngFireAuth.signOut()
    .then(() => {
      console.log("Deslogou.");
      localStorage.removeItem('user');
      this.router.navigate[('login')]
    })
  }
}
