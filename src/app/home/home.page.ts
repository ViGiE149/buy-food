import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  featuredItems = [
    {
      id:"1",
      name: 'Pizza',
      description: 'Delicious pizza with various toppings',
      price: 10.99,
      imageUrl: 'https://example.com/pizza.jpg',
    },
    {
      id:"2",
      name: 'Burger',
      description: 'Classic burger with cheese and veggies',
      price: 8.49,
      imageUrl: 'https://example.com/burger.jpg',
    },
    {
      id:"3",
      name: 'Salad',
      description: 'Fresh and healthy mixed greens salad',
      price: 5.99,
      imageUrl: 'https://example.com/salad.jpg',
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
console.log(imageUrl);

  }
}
