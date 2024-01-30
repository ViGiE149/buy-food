import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router,public authService: AuthService) {}
  featuredItems = [
    {
      id:"1",
      name: 'Pizza',
      description: 'Delicious pizza with various toppings',
      price: 10.99,
      imageUrl: 'assets/a79ee.jpg',
    },
    {
      id:"2",
      name: 'Burger',
      description: 'Classic burger with cheese and veggies',
      price: 8.49,
      imageUrl: 'assets/IMG.jpg',
    },
    {
      id:"3",
      name: 'Salad',
      description: 'Fresh and healthy mixed greens salad',
      price: 5.99,
      imageUrl: 'assets/scaled.jpg',
    },
  ];

  promotions = [
    { name: 'Happy Hour', discountPercentage: 20 },
    { name: 'Weekend Special', discountPercentage: 15 },
  ];

  categories = [
    { name: 'Appetizers' },
    { name: 'Main Courses' },
    { name: 'Desserts' },
    { name: 'Exclusive Deals' },
    { name: 'New Chezzy Rage' }
  ];

viewProduct( imageUrl:string,id:string,name:string,price:number,description:string){

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
  
}
