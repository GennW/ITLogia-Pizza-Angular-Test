import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: [],
})
export class PopupComponent {
  @Input() data: string = "";

}
