import { NewsService } from '../services/hacker.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
})
export class NewsTable {
  news: any[] =[];
  currentItem: number;
  openedNews:any = {};

  constructor(private NewsService: NewsService) {}

  ngOnInit() {
    this.NewsService.fetchTopStories();
    this.NewsService.content.subscribe(() => {
      this.news = this.NewsService.getTopStories();
    });
  }

  toggleOpened(id: number) {
    this.openedNews[id]= !this.openedNews[id]
  }

  loadMoreNews(){
    this.NewsService.fetchTop10Stories();
  }
}
