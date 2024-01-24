import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {


  product: any; // Replace 'any' with your actual product type/interface
  quantity: number = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve product details from route parameters
    this.route.params.subscribe((params) => {
      // Replace 'getProductById' with your actual method to fetch product details
      this.product = this.getProductById(params['productId']);
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    // Implement logic to add the product to the cart
    // You can use a service to manage the cart state
    // For example, call a method in a CartService
    // cartService.addToCart(this.product, this.quantity);
  }

  // Replace this with your actual method to fetch product details
  private getProductById(productId: string) {
    // Implement logic to fetch product details from a service or API
    // For example, call a method in a ProductService
    // productService.getProductById(productId);
    return {
      id: productId,
      name: 'Product Name',
      description: 'Product Description',
      price: 9.99,
      imageUrl: 'https://example.com/product.jpg',
      // ... other product details
    };
  }


}
