import { Component, Input, SimpleChanges } from '@angular/core';
import { NewsRequestType, NewsService } from '../services/hacker.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
})
export class Item {
  @Input() item_id: number;
  @Input() level: number=0;
  news = {};
  item:any = {}
  opened: boolean = false;

  constructor(private NewsService: NewsService) {}

  ngOnInit() {
    this.NewsService.getItem(this.item_id);
    this.NewsService.content.subscribe((news) => {
      this.news = news;
      this.item = news[this.item_id]
    });
  }

  toggledOpened() {
    this.opened = !this.opened;
  }
}
