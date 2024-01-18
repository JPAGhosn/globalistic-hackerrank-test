import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, UpdateMode} from "../../types";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Output() onAddToCart: EventEmitter<Product> = new EventEmitter();
  @Output() onQuantityUpdate: EventEmitter<Product> = new EventEmitter();

  ngOnInit() {}

  addToCart(product: Product) {
    this.onAddToCart.emit(product)
  }

  substract(product: Product) {
    this.products.map((item) => {
      if(item.id === product.id) {
        return {
          id: product.id,
          name: product.name,
          cartQuantity: product.cartQuantity - 1,
          price: product.price,
          image: product.image,
        }
      }
      return item;
    })
    product.cartQuantity = product.cartQuantity - 1;
    this.update(product);
  }

  add(product: Product) {
    this.products.map((item) => {
      if(item.id === product.id) {
        return {
          id: product.id,
          name: product.name,
          cartQuantity: product.cartQuantity + 1,
          price: product.price,
          image: product.image,
        }
      }
      return item;
    })
    product.cartQuantity = product.cartQuantity + 1;
    this.update(product);
  }

  update(product: Product) {
    this.onQuantityUpdate.emit(product)
  }
}


