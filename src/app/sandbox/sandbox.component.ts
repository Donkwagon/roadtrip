import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { CrawlerService } from '../@core/services/crawler.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
  providers: [ CrawlerService ]
})

export class SandboxComponent implements OnInit {

  constructor(private crawlerService: CrawlerService) { }

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ua3doYW4iLCJhIjoiY2l6OHA1MDZtMDA0cDJxcW9vdXM5OHFpaCJ9.i9qniS0Lz-hc17UGUmFfYw';
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-79.3832, 43.6532], // starting position
      zoom: 15 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    this.commenceProbing();
  }

  commenceProbing() {
    this.crawlerService.commenceProbing().then(res => {
      console.log(res);
    });
  }

}
