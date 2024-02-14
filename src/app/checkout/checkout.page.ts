import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ManageDataService } from '../services/manage-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  totalItems: number = 0;
  totalPrice: number = 0;
  selectedPaymentOption: string = 'creditCardDebitCard'; 
  orderList :any[]=[];
  constructor(private cartService: CartService,private service:ManageDataService) {}

  ngOnInit() {
    this.updateCart();
    this.getOrderList();
  }

  updateCart() {
    this.totalItems = this.cartService.getTotalItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  // Simulate payment process (replace with actual payment integration)
  processPayment(paymentOption: string) {
    if (paymentOption === 'creditCard') {
      // Implement credit card payment logic
      console.log('Processing payment with credit card');
    } else if (paymentOption === 'debitCard') {
      // Implement debit card payment logic
      console.log('Processing payment with debit card');
    } else if (paymentOption === 'inStore') {
      // Implement in-store payment logic
      console.log('In-store payment');
    }

    // Clear the cart after successful payment
    this.cartService.clearCart();
    this.updateCart();
  }


  getOrderList() {
    this.service.getOrdersList().subscribe(
      (data: any) => {
        // Handle the data here
  
        this.orderList=data;
        console.log('Categories Data:', this.orderList);
      },
      (error) => {
        // Handle errors here
        console.error('Error fetching categories:', error);
      }
    );
  }
  
}
