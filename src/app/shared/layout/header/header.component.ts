import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  loggedState: boolean = false;

  constructor(private authService: AuthService) {}


  ngOnInit(): void {
    this.authService.isLoggedSubject.subscribe((isLoggedIn: boolean) => {
      this.loggedState = isLoggedIn;
      console.log('Статус изменен:' + isLoggedIn)
    });
  }

  login() {
    this.authService.logIn();
    console.log('Пользователь зарегистрирован');
  }
  logout() {
    // this.loggedState = false; 
    this.authService.logOut();
  }
}
