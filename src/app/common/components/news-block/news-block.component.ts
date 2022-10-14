import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { IMedia } from '../../../models/iMedia';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const NEWS_FROM_TRANSFER_STATE = makeStateKey('NEWS_FROM_TRANSFER_STATE');

@Component({
  selector: 'app-news-block',
  templateUrl: './news-block.component.html'
})
export class NewsBlockComponent implements OnInit {

  news: IMedia[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private newsService: NewsService,
    private transferState: TransferState
  ) { }

  ngOnInit() {

    const transferedNews = this.transferState.get(NEWS_FROM_TRANSFER_STATE, null as IMedia[]);

    if (isPlatformBrowser(this.platformId)) {
      this.transferState.remove(NEWS_FROM_TRANSFER_STATE);
    }

    if (transferedNews) {
      this.news = transferedNews;
    } else {
      this.newsService.GetPosts().subscribe(news => {
        this.news = news;
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(NEWS_FROM_TRANSFER_STATE, news);
        }
      });
    }
  }
}
