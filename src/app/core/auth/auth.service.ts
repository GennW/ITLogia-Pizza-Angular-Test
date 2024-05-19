import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
public isLoggedSubject: Subject<boolean> = new Subject<boolean>();
private isLogged = false;


  constructor() { }

  logIn() {
    this.isLogged = true;
    this.isLoggedSubject.next(this.isLogged);
  }

  logOut() {
    this.isLogged = false;
  this.isLoggedSubject.next(this.isLogged);    
  }

  getToken() {
    return 'data from localStorage';
  }


  isLoggedIn(): boolean {
    if (!this.isLogged) {
    console.log('Пользователь не зарегистрирован')
    }
    return this.isLogged;
  }
}
