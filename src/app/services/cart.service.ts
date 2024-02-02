import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() { }
  getItems() {
    return this.cartItems;
  }

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
