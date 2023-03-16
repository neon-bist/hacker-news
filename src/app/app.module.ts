import { PlaceholderComponent } from './placeholder/placeholder.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsTable } from './news-list/news-list.component';
import { Item } from './item/item.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SegmentComponent } from './segment/segment.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsTable,
    Item,
    SearchBarComponent,
    PlaceholderComponent,
    SegmentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
