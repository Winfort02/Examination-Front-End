import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  article_detail: Article = new Article();

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }
  

  loadComponent() {
    let article_id = this.activeRoute.snapshot.params.article_id;

    if(article_id != 0) {
        this.articleService.getArticleById(article_id).subscribe((response: any) => {
          let result = response[1];
    
          if(response[0] == true) {
            this.article_detail = result;
            this.article_detail.publish_date = this.datePipe.transform(this.article_detail.publish_date, 'Y-MM-dd');
          }
        });
    }
  }

  save() {
    
  }

  back() {
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.loadComponent();
    
  }

}
