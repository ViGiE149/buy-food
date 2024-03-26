import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor(private db: AngularFirestore) {
    //this.initializeCartItems();
   }

   async updateQ(id:any,quantity:any,subtotal:any): Promise<string> { // Specify return type as Promise<string>

    try {
      const query = this.db.collection("orders-list", (ref) =>
        ref.where("id", "==", id)
      );
  
      const querySnapshot = await query.get().toPromise();
  
      const promises: Promise<any>[] = []; // Array to store promises
  
      querySnapshot?.forEach((documentSnapshot: { id: any; }) => {
        const documentId = documentSnapshot.id;
  
        // Push the update promise into the promises array
        promises.push(
          this.db.collection("orders-list").doc(documentId).update({
            quantity: quantity, // Update the comments in the Firestore document
            subtotal: subtotal
          }).then(() => {
            // this.getConfessionData();
            // this.newComment  = '';
            console.log("quantity and subtotal updated successfully.");
            return "quantity and subtotal updated successfully."; // Return the success message
          })
        );
      });
  
      // Wait for all update promises to resolve
      await Promise.all(promises);
  
      return "All documents updated successfully."; // Return success message after all updates are done
    } catch (error) {
      console.error("Error updating comments: ", error);
      return "Error updating comments: " + error; // Return error message
    }
  }



   initializeCartItems() {
    return this.db.collection("orders-list").valueChanges();
    }

    private async removeCartItemFromFirestore(productId: string) {
      console.log(productId);
      // Remove the item from Firestore (Assuming you have a 'cartItems' collection in Firestore)
     return  await this.db.collection('cartItems').doc(productId).delete();
    }


  // async getItems()  {
   
  //   return this.cartItems;
  // }

  addToCart(product: any, quantity: number) {
    try {
      const existingItem = this.cartItems.find((item) => item.product.id === product.id);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({ product, quantity });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  

  removeFromCart(productId: string) {
   console.log('Document successfully deleted from Firestore!');
     return this.db.collection('cartItems', ref => ref.where('id', '==', productId)).get();
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
