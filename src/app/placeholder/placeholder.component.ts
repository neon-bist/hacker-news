import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
})
export class PlaceholderComponent {
 @Input() header = true;
 @Input() lines = 3;
}
