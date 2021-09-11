import { Injectable } from '@angular/core';
import { Contato } from './contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _contatos : Contato[] = [];

  constructor() 
  { 

  }

  public getContatos(): Contato[]{
    return this._contatos;
  }

  public inserir(contato: Contato): void{
    this._contatos.push(contato);
  }

  public editar(contato : Contato, editedContato : Contato): boolean
  {
    for(let i = 0; i < this._contatos.length; i++){
      if(this._contatos[i].id == contato.id){
        this._contatos[i].nome = editedContato.nome;
        this._contatos[i].telefone = editedContato.telefone;
        this._contatos[i].sexo = editedContato.sexo;
        this._contatos[i].dataDeNascimento = editedContato.dataDeNascimento;
        return true;
      }
    }

    return false;
  }

  public excluir(contato: Contato): boolean
  {
    console.log(contato);
    console.log(this._contatos);
    for(let i = 0; i < this._contatos.length; i++){
      if(this._contatos[i].id == contato.id){
        this._contatos.slice(i, 1);
        return true;
      }
    }

    return false;
  }
}

