import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductType } from 'src/types/product.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  loading: boolean = false;

  constructor(
    private productServise: ProductService,
    private http: HttpClient,
    private router: Router
  ) {}
  private subscriptionOrder: Subscription | null = null;

  ngOnDestroy(): void {
    this.subscriptionOrder?.unsubscribe();
  }


  ngOnInit(): void {
    this.loading = true;
    // this.products = this.productServise.getProducts();
    this.productServise.getProducts()
    .pipe(
      tap(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/']);
      },
    });
  }
}
