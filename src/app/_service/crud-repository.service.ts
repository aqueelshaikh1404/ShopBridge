import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudRepositoryService {

  constructor(private firestore: AngularFirestore) { }

  create(tableName,data) {
    // return new Promise<any>((resolve, reject) =>{
    //     this.firestore
    //         .collection(tableName)
    //         .add(data)
    //         .then(res => {}, err => reject(err));
    // });
   return this.firestore.collection(tableName).add(data);
}
getData(tableName) { 
  return this.firestore.collection(tableName).valueChanges();
}
update(key,data,tableName) {
  return this.firestore
      .collection(tableName)
      .doc(key)
      .set(data);
}

/*Categories Table*/
getCategoryList(){
  return this.firestore.collection('categories').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const ids = a.payload.doc.id;
      let catObj= Object.assign({key:ids},data);
      return catObj;
    }))
  );
}
getFilteredCategoryList(val){
  return this.firestore.collection('categories',ref => ref.orderBy('title').startAt(val.charAt(0).toUpperCase() + val.slice(1))
  .endAt(val.charAt(0).toUpperCase() + val.slice(1) + '\uf8ff')).valueChanges();
}

getCategoryListByKey(key){
  return this.firestore.collection('categories').doc(key).snapshotChanges().pipe(
    map(a => {
      const data = a.payload.data();
      const id = a.payload.id;
      let catObj= Object.assign({key:id},data);
      return catObj;
    })
  );
}


}
