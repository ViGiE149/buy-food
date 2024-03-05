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
async  updateCart() {
    this.cartService.initializeCartItems().subscribe(
      async (data: any[]) => {
        this.cartItems = data || []; // Ensure cartItems is not undefined
        console.log('Initial Cart Items:', data);
        this.totalPrice = this.cartService.getTotalPrice();
       // this.totalItems = this.cartService.getTotalItems();

      this.totalPrice =
      await this.cartItems ? 
      this.cartItems.reduce((total: any, item: { order: { order: { quantity: any; price: any } } }) =>
        total + (item.order?.order?.quantity || 0) * (item.order?.order?.price || 0), 0) : 0;
   

        this.totalItems =
      (await this.cartItems
        ? this.cartItems.reduce(
            (total: any, item: { order: { order: { quantity: any } } }) =>
              total + (item.order?.order?.quantity || 0),
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
    this.totalItems = await this.cartItems ? this.cartItems.reduce((total: any, item: { order: { order: { quantity: any; }; }; }) => total + (item.order?.order?.quantity || 0), 0) : 0;
  
    //console.log(this.cartItems[0]?.order?.order?.quantity || "");
  }
  

result:any;
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

        // Remove from the local cartItems array
       // this.cartItems.splice(index, 1);
       // this.calculateTotal();
      });
    });
  }
}

  clearCart() {
   // this.cartService.clearCart();
    this.updateCart();
  }
  

 

  deleteItem(deleteItem:string){


  }
 
}
