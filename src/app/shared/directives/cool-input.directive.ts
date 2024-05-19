import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[CoolInput]' // Директива будет применяться к элементам с атрибутом CoolInput
})


export class CoolInputDirective implements OnInit {
  @Input() coolInputDefaultBgColor: string = 'white'; // передача значений в директиву
  @Input() coolInputFocusBgColor: string = 'orange';

  constructor(private el: ElementRef, private rend: Renderer2) {
    // В конструкторе указываем необходимые зависимости: ElementRef для доступа к DOM-элементу и Renderer2 для взаимодействия с элементом

  }
  private _backgroundColor: string = '';
  @HostBinding('style.backgroundColor')
  get getBgColor() {
    return this._backgroundColor;
  }

  private _isOnFocus: boolean = false; // Приватное свойство _isOnFocus, инициализированное значением false

  @HostBinding('class.isOnFocus') // Декоратор @HostBinding привязывает свойство к хост-элементу директивы
  get getIsOnFocus() { // Геттер для получения значения _isOnFocus
    return this._isOnFocus; // Возвращает значение _isOnFocus
  }



  @HostListener('focus')
  onFocus() {
    this.changeElementBgColor(this.coolInputFocusBgColor) // передача значений в директиву
    this._isOnFocus = true; // переключение классов
  }
  @HostListener('blur')
  onBlur() {
    this.changeElementBgColor(this.coolInputDefaultBgColor)
    // this.changeElementBgColor('white');
    this._isOnFocus = false;

  }
  @HostListener('click', ['$event', '$event.target'])
  onClick(event: Event, target: HTMLElement) {
    console.log('event===', event)
    console.log(target)
  }


  changeElementBgColor(color: string) {
    this._backgroundColor = color;
    // this.rend.setStyle(this.el.nativeElement, 'background-color', color)
  }
  ngOnInit() {
    // В методе ngOnInit выполняются операции при инициализации директивы

    // Устанавливаем желтый цвет фона для элемента
    this.rend.setStyle(this.el.nativeElement, 'background-color', 'white')

    // Добавляем к текущему значению атрибута placeholder символ "*"
    this.rend.setAttribute(this.el.nativeElement, 'placeholder',
      this.el.nativeElement.getAttribute('placeholder') + '*')
    // this.el.nativeElement.style.background = 'yellow'

    // Создаем новый элемент <span> с текстом "*Заполните поле" и красным цветом
    const text = this.rend.createElement('span');
    this.rend.setProperty(text, 'innerText', '*Заполните поле');
    this.rend.setStyle(text, 'color', 'red');

    // Вставляем созданный элемент перед текущим элементом
    this.rend.insertBefore(
      this.el.nativeElement.parentElement, // Родительский элемент, перед которым будет вставлен новый элемент
      text, // Элемент, который будет вставлен (созданный ранее <span> с текстом)
      this.rend.nextSibling(this.el.nativeElement) // Элемент, перед которым будет вставленый элемент
    );
  }
}
