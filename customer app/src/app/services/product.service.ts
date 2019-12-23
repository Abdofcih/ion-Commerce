import { Injectable } from '@angular/core';

import { AngularFireDatabase  } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  filterCategory;
  constructor(private db: AngularFireDatabase) { }

  create(product) { 
    return this.db.list('/products').push(product);
  }

 
  getAll() {
    return this.db.list('/products')
    .snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
  }
  get(productId) { 
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) { 
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) { 
    return this.db.object('/products/' + productId).remove();
  }
}


