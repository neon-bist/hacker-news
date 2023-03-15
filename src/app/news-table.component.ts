import { NewsService, NewsRequestType } from './hacker.service';
import { Component } from '@angular/core';

@Component({
  selector: 'demo',
  templateUrl: './news.component.html',
})
export class NewsTable {
  news = {};
  currentItem = {};

  constructor(private NewsService: NewsService) {
    this.NewsService.content.subscribe((news) => {
      this.news = news;
    });
    this.NewsService.apiRequest(NewsRequestType.TOP_STORIES).subscribe(
      (news) => {
        this.NewsService.updateData(
          news.reduce((acc: any, cv: number) => {
            acc[cv] = null;
            return acc;
          }, {})
        );
      }
    );
  }

  getNewsIds() {
    return Object.keys(this.news).map((x) => Number(x));
  }

  setCurrentNewsId(id: number) {
    this.NewsService.apiRequest(NewsRequestType.ITEM, id).subscribe((news) => {
      this.currentItem = news;
      this.NewsService.updateData({ ...this.news, id: news });
    });
  }

  write() {
    console.log('hei');
  }
}
