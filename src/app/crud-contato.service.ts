import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Contato } from './contato';

@Injectable({
  providedIn: 'root'
})
export class CrudContatoService {
  private _PATH : string = 'contatos/';
  constructor(private db : AngularFireDatabase) { }

  criarContato(contato : Contato){
    return this.db.database.ref(this._PATH).push(contato);
  }

  editarContato(chave : string, contato : Contato){

  }

  getContatos(){

  }

  getContato(chave : string){

  }
}
