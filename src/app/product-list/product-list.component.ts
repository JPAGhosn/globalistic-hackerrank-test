import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, UpdateMode} from "../../types";
import * as events from "events";

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

  constructor() {
  }

  addToCart(product: Product) {
    product.cartQuantity = product.cartQuantity + 1;
    this.onAddToCart.emit(product)
  }

  substract(product: Product) {
    product.cartQuantity = product.cartQuantity - 1;
    this.onQuantityUpdate.emit(product);
  }

  add(product: Product) {
    product.cartQuantity = product.cartQuantity + 1;
    this.onQuantityUpdate.emit(product);
  }
}


