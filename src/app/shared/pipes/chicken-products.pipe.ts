import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from 'src/types/product.type';

@Pipe({
  name: 'chickenProducts'
})
export class ChickenProductsPipe implements PipeTransform {
// выводим только те продукты которые содержат определенные буквы
transform(products: ProductType[]): ProductType[] {
  return products.filter(item => item.title.toLowerCase().includes('кур'));
}

}
