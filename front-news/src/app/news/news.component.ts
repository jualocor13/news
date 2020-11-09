import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { News } from '../models/news/news';
import { NewsServiceService } from '../services/news-service.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  /**
 * Submitted
 */
  news: Array<News> = new Array<News>();

  /**
   * Total number of devices
   */
  total: number;

  /**
   * Limit page of devices
   */
  limit: number;

  /**
   * First firmware of array in one search
   */
  offset: number;

  /**
   * Number of page selected
   */
  page: number;

  /**
   * Total number of pages
   */
  pages: number;

  /**
   * Header key to sort
   */
  key: string;

  /**
   * Order of sort
   */
  order: string;

  /**
   * Filter query
   */
  filter: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsServiceService
  ) { }

  ngOnInit() {
    this.getNewsList();
  }
  private getNewsList(limit: number = 20,
    page: number = 1,
    field: string = 'createdAt',
    order: string = 'desc',
    filter: string = '') {
    this.newsService.getNewsList(limit, page, field, order, filter)
      .pipe().subscribe(
        (data) => {
          this.news = data.docs;
          this.total = data.total;
          this.limit = data.limit;
          this.offset = data.offset;
          this.page = data.page;
          this.pages = data.pages;
          this.key = field;
          this.order = order;
          this.filter = filter;
        },
        error => {
          alert(error);
        });
  }

  private archived(news: News) {
    news.archived = true;
    this.newsService.patchNews(news)
      .pipe().subscribe(
        (data) => {
          console.log(data)
        }, error => {
          if (error) {
            alert(error);
          }
        }
      )

  }

}
