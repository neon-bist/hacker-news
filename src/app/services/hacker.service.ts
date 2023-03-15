import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { shareReplay, mergeMap, switchMap } from 'rxjs/operators';

export enum NewsRequestType {
  TOP_STORIES = 'TOP_STORIES',
  ITEM = 'ITEM',
  STORY = 'STORY',
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  newsData = new BehaviorSubject<any>({});
  content = this.newsData.asObservable();
  api = 'https://hacker-news.firebaseio.com/v0';
  newsIds = [];
  lastNewsLoadedIndex = -1;

  constructor(private http: HttpClient) {}

  getTargetUrl(type: NewsRequestType, id?: number) {
    return (
      this.api +
      (type === NewsRequestType.ITEM ? `/item/${id}.json` : '/topstories.json')
    );
  }

  fetch(type: NewsRequestType, id?: number) {
    return this.http.get<any>(this.getTargetUrl(type, id), {
      params: {
        print: 'pretty',
      },
    });
  }

  fetchItem(id: number, type: string = 'item') {
    this.fetch(NewsRequestType.ITEM, id).subscribe((data) => {
      if (type === NewsRequestType.STORY) this.lastNewsLoadedIndex++;
      this.updateData(data);
    });
  }

  fetchTopStories() {
    this.fetch(NewsRequestType.TOP_STORIES)
      .pipe(
        tap((data) => {
          this.newsIds = data;
          return data;
        }),
        map((newsIds: any) =>
          newsIds.reduce((newsAcc: any, newsId: number) => {
            newsAcc[newsId] = null;
            return newsAcc;
          }, {})
        )
      )
      .subscribe((data) => {
        this.newsData.next(data);
        this.fetchTop10Stories();
      });
  }

  fetchTop10Stories() {
    let lastIndex = this.lastNewsLoadedIndex;
    if (lastIndex + 10 >= this.newsIds.length) return;
    for (let i = lastIndex + 1; i <= lastIndex + 10; i++) {
      this.fetchItem(this.newsIds[i], NewsRequestType.STORY);
    }
  }

  getTopStories() {
    let stories: any = [];
    let data = this.newsData.getValue();
    for (let i = 0; i <= this.lastNewsLoadedIndex; i++)
      if (data[this.newsIds[i]]) stories.push(data[this.newsIds[i]]);
    return stories;
  }

  getItem(id: number) {
    let item = this.newsData.getValue()[id];
    if (!item) this.fetchItem(id);
    return item;
  }

  updateData(data: any) {
    let previousNews = this.newsData.getValue();
    previousNews[data.id] = data;
    this.newsData.next(previousNews);
  }
}
