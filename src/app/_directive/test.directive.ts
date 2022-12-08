import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective {

  constructor(private _el:ElementRef, private _renderer: Renderer2) {
    console.log(this._el.nativeElement);
  }

  @Input() data:any[]=[];

  @HostListener('mouseenter') onClick(){
    console.log(this.data);
    this._renderer.setStyle(this._el.nativeElement, 'color', 'red');
    let newVar = this._renderer.createElement('div');
    let newText  = this._renderer.createText(this.data[0]);
    this._renderer.appendChild(newVar,newText);
    let newVar2 = this._renderer.createElement('div');
    let newText2  = this._renderer.createText(this.data[1]);
    this._renderer.appendChild(newVar2,newText2);
    this._renderer.appendChild(this._el.nativeElement,newVar);
    this._renderer.appendChild(this._el.nativeElement,newVar2);
  }
}
