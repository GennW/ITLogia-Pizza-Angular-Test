import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  public formValues = {
    productTitle: '',
    address: '',
    phone: '',
  };

  constructor(
    private activatedRout: ActivatedRoute,
    private productService: ProductService
  ) {}

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }
  ngOnInit(): void {
    // передача параметров через url abservable
    this.subscription = this.activatedRout.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.productTitle = params['product'];
      }
    });
  }

  createOrder(): void {
    if (!this.formValues.productTitle) {
      //проверяет елси есть пустые строки даже пробелы
      alert('Выберите Пиццу');
      return;
    }
    if (!this.formValues.address) {
      //проверят только на наличие любых символов даже если пробел
      alert('Заполните поле с адресом');
      return;
    }
    if (!this.formValues.phone) {
      alert('Заполните поле с телефоном');
      return;
    }

    this.subscriptionOrder = this.productService
      .createOrder({
        product: this.formValues.productTitle,
        address: this.formValues.address,
        phone: this.formValues.phone,
      })
      .subscribe((response) => {
        if (response.success && !response.message) {
          alert('Спасибо за заказ!');
          this.formValues.productTitle = '';
          this.formValues.address = '';
          this.formValues.phone = '';
        } else {
          alert('Ошибка при оформлении заказа')
        }
      });
  }
}
