import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  @Output() submitted = new EventEmitter<string>();
  term = '';

  onTermChange(event: any) {
    event.preventDefault();
    this.submitted.emit(this.term);
  }
}
