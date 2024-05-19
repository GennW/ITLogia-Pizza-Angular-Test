import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[isChicken]'
})
export class IsChickenDirective {

  constructor(
    private temlateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    
  ) { }

  @Input()
  set isChicken(description: string) {
    if (description.toLowerCase().includes('')) { // вместо пустой строки пишем фильтр по назанию
      this.viewContainer.createEmbeddedView(this.temlateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
