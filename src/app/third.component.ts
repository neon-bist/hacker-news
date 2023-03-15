import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'third',
  template: `<button (click)="onClick()">Hello</button>`
})
export class Third{

  @Output() update = new EventEmitter<string>();

  onClick(){
    this.update.emit('aayo')
  }

}