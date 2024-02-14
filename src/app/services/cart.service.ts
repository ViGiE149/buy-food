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

 initializeCartItems()  {
    // Example: Fetch initial data from Firestore or set initial values
    this.db.collection("orders-list").valueChanges().subscribe(
      async (data: any[]) => {
        this.cartItems = data;
        console.log('Initial Cart Items:', data);
        return this.cartItems;
   
      },
      (error) => {
        console.error('Error fetching initial cart items:', error);
      }
    );
  }


  // async getItems()  {
   
  //   return this.cartItems;
  // }

  addToCart(product: any, quantity: number) {
    const existingItem = this.cartItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
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
