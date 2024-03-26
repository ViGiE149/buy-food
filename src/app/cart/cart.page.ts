import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ManageDataService } from '../services/manage-data.service';
import { NavigationExtras, Router } from '@angular/router';
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
  result:any;
  subtotal:any;
  constructor(private router: Router,private cartService: CartService,private service:ManageDataService) {}

  ngOnInit() {
    this.updateCart();
  }
async  updateCart() {
    this.cartService.initializeCartItems().subscribe(
      async (data: any[]) => {
        this.cartItems = data || []; // Ensure cartItems is not undefined
        console.log('Initial Cart Items:', data);
        this.totalPrice = this.cartService.getTotalPrice();
       // this.totalItems = this.cartService.getTotalItems();

      this.totalPrice =
      await this.cartItems ? 
      this.cartItems.reduce((total: any, item:any) =>
        total + (item?.quantity || 0) * (item.price || 0), 0) : 0;
   

        this.totalItems =
      (await this.cartItems
        ? this.cartItems.reduce(
            (total: any, item: any) =>
              total + (item.quantity || 0),
            0
          )
        : 0
      );
      },
      (error: any) => {
        console.error('Error fetching initial cart items:', error);
      }
    );
  
    // Calculate totalItems by summing up quantities
    this.totalItems = await this.cartItems ? this.cartItems.reduce((total: any, item:any) => total + (item.quantity || 0), 0) : 0;
  
    //console.log(this.cartItems[0]?.order?.order?.quantity || "");
  }
  


removeFromCart(productId: string) {
  // Find the index of the item with the specified productId
  const index = this.cartItems.findIndex((item: { id: string; }) => item.id === productId);

  // Remove the item if found
  if (index !== -1) {
    // Find the document in Firestore where 'id' is equal to the productId
    this.cartService.removeFromCart(productId).subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        // Delete the document
          doc.ref.delete().then(() => {
          console.log('Document successfully deleted from Firestore!');
        }).catch((error) => {
          console.error('Error removing document: ', error);
        });
      });
    });
  }
}

  clearCart() {
   // this.cartService.clearCart();
    this.updateCart();
  }
  
  goTViewProduct(imageUrl:string,id:string,name:string,price:number,description:string){
    let navi: NavigationExtras = {
      state: {
       imageUrl:imageUrl,
        id: id,
        name:name,
        price:price,
        description:description
      },
   };
   this.router.navigate(['view-product'], navi);

  }
 

  deleteItem(deleteItem:string){


  }


  increaseQuantity(item: any) {

    item.quantity++; // Increase quantity
    this.updateTotalPriceAndItems(); // Recalculate total price and total items
    item.subtotal+=item.price;
    const result= this.cartService.updateQ(item.id,item.quantity,item.subtotal); 
    console.log(result);
  }
  
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--; // Decrease quantity if greater than 1
      this.updateTotalPriceAndItems();
      item.subtotal-=item.price;
       const result= this.cartService.updateQ(item.id,item.quantity, item.subtotal);
       console.log(result);
      
    }
  }
  
  updateTotalPriceAndItems() {
    this.totalPrice = this.cartItems.reduce((total: number, item: any) =>
      total + (item.quantity || 0) * (item.price || 0), 0);
  
    this.totalItems = this.cartItems.reduce(
      (total: any, item: any) => total + (item.quantity || 0), 0
    );
 
    //const result= this.cartService.updateQ(:any);
    //console.log(result);

}





}




