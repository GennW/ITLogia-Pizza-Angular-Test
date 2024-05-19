import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ProductType } from 'src/types/product.type';
import { CartProductService } from '../../services/cart-product.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  encapsulation: ViewEncapsulation.None, // применяется для стилей .product-title если не выносить отдельно в title.component.scss
  providers: [CartProductService]
})
export class ProductCardComponent {
  
  @Input() product: ProductType;
  
  @Output() addToCartEvent: EventEmitter<string> = new EventEmitter<string>();


  isAddedToCart: boolean = false; // Добавляем переменную для отслеживания статуса добавления в корзину

  constructor(public cartProductService: CartProductService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      datetime: ''
    }
  }
}
