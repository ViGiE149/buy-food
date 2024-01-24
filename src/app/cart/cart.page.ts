import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  totalItems: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.updateCart();
  }

  updateCart() {
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalItems = this.cartService.getTotalItems();
  }


  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
    this.updateCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.updateCart();
  }
 
}
