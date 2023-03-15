import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { shareReplay, mergeMap, switchMap } from 'rxjs/operators';

export enum NewsRequestType {
  TOP_STORIES = 'TOP_STORIES',
  ITEM = 'ITEM',
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  newsData = new BehaviorSubject<any>([]);
  content = this.newsData.asObservable();
  api = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {}

  apiRequest(type: NewsRequestType, id?: number) {
    let targetUrl =
      type === NewsRequestType.ITEM ? `/item/${id}.json` : '/topstories.json';
    return this.http.get<any[]>(this.api + targetUrl, {
      headers:new HttpHeaders().append('Content-Type', 'application/json'),
      params: {
        print: 'pretty',
      },
    });
    // .pipe(
    //   map((value: any) => {
    //     return value;
    //   })
    // );
  }


  // getItem(id: number){
  //  this.apiRequest(NewsRequestType.ITEM, id).subscribe(item=>)
  // }

  updateData(data: any) {
    this.newsData.next(data);
  }
}
