import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article.model';
import { Observable } from 'rxjs';

const APIurl: string = 'http://127.0.0.1:8000';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': ['application/json', '*']
  })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllArticles(): Observable<[boolean, Article[]]> {

    return new Observable<[boolean, Article[]]>((observer) => {
      
      this.http.get<Article[]>(APIurl + '/api/articles', httpOptions).subscribe((response: any) => {
        let articles: Article[] = []
        let result = response.data;

        if(result != null) {
          for(let i = 0; i < result.length; i++) {
            articles.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].discription,
              publish_date: result[i].publish_date
            })
          }
        }

        observer.next([true, articles]);
        observer.complete();
      },
      (error) => {
        observer.next([false, error]);
        observer.complete();
      });
    })
  }

  getArticleById(id: number) : Observable<[boolean, Article]> {

    return new Observable<[boolean, Article]>((observer) => {
      
      let article: Article;
      
      this.http.get<Article>(APIurl + '/api/articles/' + id, httpOptions).subscribe((response: any) => {
        let result = response.data;

        if(result != null) {
          article = {
              id: result.id,
              title: result.title,
              description: result.discription,
              publish_date: result.publish_date
            }
        }

        observer.next([true, article]);
        observer.complete();
      },
      (error) => {
        observer.next([false, error]);
        observer.complete();
      });
    })
  }

  
}
