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

   productInfor:any;
  product: any; // Replace 'any' with your actual product type/interface
  quantity: number = 1;
  subtotal:any;

  constructor(private auth:AuthService,private service:ManageDataService, private route: ActivatedRoute, private router: Router) {


  }

  async ngOnInit() {
    this.product=  await this.passedProductInfor();

    // Retrieve product details from route parameters
    // this.route.params.subscribe((params) => {
    //   // Replace 'getProductById' with your actual method to fetch product details
    //   this.product = this.getProductById(params['productId']);
    // });
  }

  increaseQuantity() {
    this.quantity++;
    this.updateProductQuantity(); 
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.product.price += this.productInfor.price,
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



  addToCart() {
    if(this.quantity==1){
    this.subtotal=this.productInfor.price;
    }

    this.calculateSubtotal();
    // Implement logic to add the product to the cart
    // You can use a service to manage the cart state
    // For example, call a method in a CartService
    // cartService.addToCart(this.product, this.quantity);

    const userEmail=  this.auth.getUserEmail();
    console.log(userEmail);
    const orderObject = {
      // ... other project properties
     
      order: {
        ...this.product,
        subtotal: this.subtotal,
        userEmail  

      }
    };

    this.service.addToCart().add({
     order:orderObject 
    })
    .then((docRef) => {
      console.log("Category added with ID: ", docRef.id);
       this.router.navigateByUrl("/checkout")

    })
    .catch((error) => {
      console.error("Error adding category: ", error);
    });
  }

  // Replace this with your actual method to fetch product details
  async passedProductInfor() {
    // Implement logic to fetch product details from a service or API
    // For example, call a method in a ProductService
    // productService.getProductById(productId);
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
      quantity:this.quantity,
      subtotal:this.subtotal
      
    };
    //this.calculateSubtotal()
  }
  
 

}
