import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageDataService } from '../services/manage-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  productInfor: any;
  product: any; // Replace 'any' with your actual product type/interface
  quantity: number = 1;
  subtotal: any;
  query: any;

  constructor(
    private auth: AuthService,
    private service: ManageDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.product = await this.passedProductInfor();
  }

  increaseQuantity() {
    this.quantity++;
    this.updateProductQuantity();
  }

  decreaseQuantity() {
     // Update the quantity in the product object
    if (this.quantity > 1) {
      this.quantity--;
      this.updateProductQuantity();
    }
  }

  updateProductQuantity() {
    // Update the quantity in the product object
    this.product.quantity = this.quantity;
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    // Calculate the subtotal based on the quantity and product price
    this.subtotal = this.quantity * this.product.price;
  }

  async addToCart() {
    if (this.quantity == 1) {
      this.subtotal = this.productInfor.price;
    }

    this.calculateSubtotal();
    const userEmail = this.auth.getUserEmail();
    //console.log('user email', userEmail);
    // const orderObject = {
    //   ...this.product,
    //   subtotal: this.subtotal,
    //   userEmail,
    // };
    //console.log(this.product.subtotal);
    this.service.checkOnCart(this.product.id).subscribe(async (data: any) => {
      this.query = await data;
    });

    if (!this.query) {
      this.service
        .addToCart()
        .add({
          id: this.product.id,
          name: this.product.name,
          userEmail: userEmail,
          quantity: this.product.quantity,
          subtotal: this.subtotal,
          price: this.product.price,
          description: this.product.description,
          imageUrl: this.product.imageUrl,
        })
        .then((docRef) => {
          console.log('Category added with ID: ', docRef.id);
          this.router.navigateByUrl('/cart');
        })
        .catch((error) => {
          console.error('Error adding category: ', error);
        });
    } else {
      console.log('it got into the esle statement');
    }
  }

  //fetch product details that are passed 
  async passedProductInfor() {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.productInfor = this.router.getCurrentNavigation()?.extras.state;
      console.log(this.productInfor);
    }
    console.log(this.productInfor.id);
    return {
      id: this.productInfor.id,
      name: this.productInfor.name,
      description: this.productInfor.description,
      price: this.productInfor.price,
      imageUrl: this.productInfor.imageUrl,
      quantity: this.quantity,
      subtotal: this.subtotal,
    };
   
  }
}
