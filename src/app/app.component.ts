import {ChangeDetectorRef, Component} from '@angular/core';
import {Cart, CartItem, Product} from "../types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // need to update this cart
  products: Product[];

  cart: Cart;

  constructor(private cdf: ChangeDetectorRef) {
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
    // get index of the product
    const index = this.products.findIndex(item => item.id === product.id);

    // check if already in card
    const cartIndex = this.cart.items.findIndex(item => item.id === product.id);
    if(cartIndex > -1) {
      return;
    }

    this.cart.items.push({
      id: product.id,
      quantity: 1,
      item: product.name
    } as CartItem);
  }

  updateCart(product: Product) {
    const productIndex = this.products.findIndex(item => item.id === product.id);
    const cardIndex = this.cart.items.findIndex(item => item.id === product.id);

    console.log(product)

    // update product quantity
    this.products[productIndex] = product;
    console.log(this.products)

    if(product.cartQuantity <= 0) {
      this.cart.items = this.cart.items.filter(item => item.id !== product.id);
    }
    else {
      // update cart quantity
      this.cart.items[cardIndex] = {
        ...this.cart.items[cardIndex],
        quantity: product.cartQuantity,
      }
    }

    console.log(this.cart)
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
