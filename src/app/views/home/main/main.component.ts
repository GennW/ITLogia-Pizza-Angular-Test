
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription, map } from 'rxjs';
import { PopupComponent } from 'src/app/components/share/popup/popup.component';
import { CartService } from 'src/app/shared/services/cart.service';

// declare var bootstrap: any;
// import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  private observable: Observable<number>;
  private subscription: Subscription | null = null;
  private subject: Subject<number>;



  constructor(public cartService: CartService, private modalService: NgbModal) {
    this.subject = new Subject<number>();
    
    // this.observable = from([1,2,3,4,5])
    this.observable = new Observable((observer) => {
      let count = 0;
      const interval = setInterval(() => {
        observer.next(++count)
      }, 1000);
      const timeout1 = setTimeout(() => {
        observer.complete()
      }, 3000);
      const timeout2 = setTimeout(() => {
        observer.error('observer.error')
      }, 4000);

      return {
        unsubscribe() {
          clearInterval(interval);
          clearTimeout(timeout1);
          clearTimeout(timeout2);
        },
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }  
  
  // @ViewChild('popup')
  // popup!: TemplateRef<ElementRef>;

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit(): void {
        // с помощью ngModal
        // this.modalService.open(this.popup, {})

        // components
        // const modalRef = this.modalService.open(PopupComponent);
        // modalRef.componentInstance.data = 'Main Component';
        this.popupComponent.openPopup();
  }

  ngOnInit(): void {
//  подключаем bootsrap
    // const myModalAlternative = new bootstrap.Modal('#myModal', {});
    // myModalAlternative.show();


    this.subscription = this.observable
    .pipe(
      map((number) => {
        return 'Число: ' + number;
      })
    )
    .subscribe({
      next: (param: string) => {
        console.log('subscriber 1==', param)
      },
      error: (error) => {
        console.log('ERROR!!!' + error)
      }
    });
  }

  test(): void {
    this.subscription = this.observable.subscribe((param: number) => {
      console.log('subscriber 2==', param)
    });
  }
  testPopup(popup: TemplateRef<ElementRef>): void {
    // с помощью ngModal
    this.modalService.open(popup, {})
  }
}


