import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ManageDataService } from '../services/manage-data.service';
///

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any;
  totalPrice: number = 0;
  totalItems: number = 0;
  orderList :any[]=[];

  constructor(private cartService: CartService,private service:ManageDataService) {}

  ngOnInit() {
    this.updateCart();
  }

  updateCart() {
    this.cartItems = this.cartService.initializeCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalItems = this.cartService.getTotalItems();
  
      
      // Calculate totalItems by summing up quantities
      this.totalItems = this.cartItems.reduce((total: any, item: { order: { order: { quantity: any; }; }; }) => total + item.order.order.quantity, 0);

    console.log( this.cartItems[0]?.order?.order?.quantity || "")
  }


  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
    this.updateCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.updateCart();
  }
  

 

  deleteItem(deleteItem:string){


  }
 
}
