import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor(private db: AngularFirestore) {
    this.initializeCartItems();
   }

   initializeCartItems() {
    return this.db.collection("orders-list").valueChanges();
    }
 


  // async getItems()  {
   
  //   return this.cartItems;
  // }

  addToCart(product: any, quantity: number) {
    try {
      const existingItem = this.cartItems.find((item) => item.product.id === product.id);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({ product, quantity });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter((item) => item.product.id !== productId);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
  }

  
}
