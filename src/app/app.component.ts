import {Component} from '@angular/core';
import {Cart, CartItem, Product} from "../types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: Product[];
  cart: Cart;

  constructor() {
    this.cart = {
      items: []
    } as Cart
  }

  ngOnInit() {
    this.products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/assets/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
    });
  }

  addToCart(product: Product) {
    if(this.cart.items.filter(item => item.id === product.id).length > 0) return;

    this.cart.items.push({
      id: product.id,
      item: product.name,
      quantity: product.cartQuantity
    })
  }

  updateCart(product: Product) {
    console.log("updating ", product)
    this.cart.items = this.cart.items.map((item) => {
      if(item.id === product.id) {
        console.log("found")
        return {
          id: product.id,
          item: product.name,
          quantity: product.cartQuantity
        }
      }
      return item;
    })
  }
}


export const PRODUCTS: Product[] = [
  {
    name: "Cap",
    price: 5
  },
  {
    name: "HandBag",
    price: 30
  },
  {
    name: "Shirt",
    price: 35
  },
  {
    name: "Shoe",
    price: 50
  },
  {
    name: "Pant",
    price: 35
  },
  {
    name: "Slipper",
    price: 25
  }
];
