import { Component, OnInit } from '@angular/core';
import { CrawlerService } from '../@core/services/crawler.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  providers: [ CrawlerService ]
})
export class DataComponent implements OnInit {

  constructor(private crawlerService: CrawlerService) { }

  ngOnInit() {
  }
  
  commenceProbing() {
    this.crawlerService.commenceProbing().then(res => {
      console.log(res);
    });
  }
  
  rakeArtistList() {
    this.crawlerService.rakeArtistList().then(res => {
      console.log(res);
    });
  }
  
  getArtistInfo() {
    this.crawlerService.getArtistInfo().then(res => {
      console.log(res);
    });
  }

  
  getUpcomingEvents() {
    this.crawlerService.getUpcomingEvents().then(res => {
      console.log(res);
    });
  }

}
