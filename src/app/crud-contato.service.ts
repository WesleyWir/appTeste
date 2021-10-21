import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Contato } from './contato';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudContatoService {
  private _PATH : string = 'contatos/';
  constructor(private db : AngularFireDatabase) { }

  createContact(contato : Contato){
    return this.db.database.ref(this._PATH).push(contato);
  }

  editContact(key : string, contato : Contato){
    return this.db.database.ref(this._PATH)
    .child(key).update(contato);
  }

  deleteContact(key: string)
  {
    return this.db.database.ref(this._PATH+key).remove();
  }

  readContacts(){
    return this.db.list(this._PATH).snapshotChanges().pipe(
      map((action) => {
        return action.map((c) => ({
          key: c.payload.key,
          data: c.payload.val()
        }))
      })
    );
  }

  readContact(key : string){
    return this.db.list(this._PATH, ref => ref.orderByKey().equalTo(key))
    .snapshotChanges().pipe(
      map((action) => {
        return action.map((c) => ({
          key: c.payload.key,
          data: c.payload.val()
        }))
      })
    );
  }
}
