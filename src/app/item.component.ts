import { Component, Input, SimpleChanges } from '@angular/core';
import { NewsRequestType, NewsService } from './hacker.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
})
export class Item {
  @Input() item: any={};
  kids = [];
  news= [];
  subNews = {}

  constructor(private NewsService: NewsService){
    this.NewsService.content.subscribe(news=>{this.news=news})
  }

  onClick(id:number){
    this.NewsService.apiRequest(NewsRequestType.ITEM, id).subscribe(itemData=>{
      // this.kids = itemData.kids;
      this.subNews = itemData;
      console.log('itemdata',itemData)
    // this.NewsService.updateData({...this.news, id: itemData});
    });
  }

}
