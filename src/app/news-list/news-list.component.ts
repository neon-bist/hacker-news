import { NewsService } from '../services/hacker.service';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
})
export class NewsTable implements OnChanges {
  @Input() searchTag = '';
  news: any[] = [];
  filteredNews: any[] = [];
  currentItem: number;
  openedNews: any = {};

  constructor(private NewsService: NewsService) {}

  ngOnInit() {
    this.NewsService.fetchTopStories();
    this.NewsService.content.subscribe(() => {
      this.news = this.NewsService.getTopStories();
      this.getFilteredNews();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTag']) {
      this.searchTag = changes['searchTag'].currentValue;
      this.getFilteredNews();
    }
  }

  getFilteredNews() {
    let matchExp = new RegExp(this.searchTag, 'gi');
    this.filteredNews = this.news.filter((item) => !item || matchExp.test(item.title));
    console.log(this.filteredNews)
  }

  toggleOpened(id: number) {
    this.openedNews[id] = !this.openedNews[id];
  }

  loadMoreNews() {
    this.NewsService.fetchTop10Stories();
  }
}
