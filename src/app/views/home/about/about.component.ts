import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/components/share/popup/popup.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // с помощью ngModal
    // this.modalService.open(this.popup, {})

    // components
    // const modalRef = this.modalService.open(PopupComponent);
    // modalRef.componentInstance.data = 'About Component';
}
}
