import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  getAllArticles() {
    this.articleService.getAllArticles().subscribe((response: any) => {
      let result = response[1];

      if(response[0] == true) {
        this.articles = result;
      }
    });
  }

  edit(id: number) {
    this.router.navigateByUrl('article-detail/' + id);
  }

  ngOnInit(): void {

    this.getAllArticles();
  }

}
