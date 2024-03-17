import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  constructor(private db: AngularFirestore) { }

  getCatergories() {
    return this.db.collection("options").valueChanges();
  }

  getallProducts() {
    return this.db.collection("product-list").valueChanges();
  }

  getProductByType(type:any){
     return this.db.collection("product-list", ref => ref.where("type", "==", type)).valueChanges();
  }

  getProductBySearchFilter(searchTerm:any){
    return this.db.collection("product-list", ref => ref.where("name", "==", searchTerm)).valueChanges();
 }

 checkOnCart(id:any) {
  return this.db.collection("orders-list", ref => ref.where("id", "==", id)).valueChanges();
}

addToCart() {
  return this.db.collection("orders-list");
}
getOrdersList(){
  return this.db.collection("orders-list").valueChanges();
}
}
