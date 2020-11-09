import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WINDOW } from '../providers/window.provider';
import { Observable } from 'rxjs';
import { News } from '../models/news/news';
import { ApiResponse } from "../models/api-response";

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {

  /**
   * URL to access API
   */
  private url: string = 'http://' + this.window.location.hostname + ':4001/api/news';

  /**
   * Header HTTP to access API
   */
  private header: HttpHeaders;

  /**
   * Constructor
   * @param http HTTP client
   * @param window Can allows to obtain base url
   */
  constructor(private http: HttpClient, @Inject(WINDOW) private window: Window) { }

  getNewsList(limit: number = 20,
    page: number = 1,
    field: string = 'createdAt',
    order: string = 'desc',
    filter: string = ''): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.url, {
      headers: this.header,
      params: {
        status: 'all',
        limit: limit.toString(),
        page: page.toString(),
        'sort[field]': field,
        'sort[order]': order
      }
    }).pipe(
      map(response => {
        return response;
      })
    );
  }

  patchNews(news: News) {
    return this.http.patch(this.url + '/' + news._id, news, { headers: this.header})
      .pipe(
        map(response => {
          return response;
        })
      )
  };

  deleteNews(news: News) {
    return this.http.delete(this.url + '/' + news._id)
      .pipe(
        map(response => {
          return response;
        })
      )
  };
}
