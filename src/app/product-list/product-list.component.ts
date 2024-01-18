import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  constructor(private cdef: ChangeDetectorRef) {
  }

  addToCart(product: Product) {
    this.products = this.products.map(item => {
      if(item.id === product.id) {
        if(item.cartQuantity === 0) {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            cartQuantity: 1
          }
        }
      }
      return item;
    })
    this.onAddToCart.emit(product)
  }

  substract(product: Product) {
    this.products.map((item) => {
      if(item.id === product.id) {
        var quantity = product.cartQuantity;
        if(item.cartQuantity === 0) {
          quantity = 0;
        }
        else {
          quantity = quantity -1;
        }
        return {
          id: product.id,
          name: product.name,
          cartQuantity: quantity,
          price: product.price,
          image: product.image,
        }
      }
      return item;
    })

    if(product.cartQuantity !== 0) {
      product.cartQuantity = product.cartQuantity -1;
    }
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


