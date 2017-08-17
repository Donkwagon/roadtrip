import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { SearchService } from '../@core/services/search.service';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
  providers: [SearchService ]
})

export class SandboxComponent implements OnInit {
  resultList: Observable<any[]>;
  searchQuery: string;
  private searchInput = new Subject<string>();

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ua3doYW4iLCJhIjoiY2l6OHA1MDZtMDA0cDJxcW9vdXM5OHFpaCJ9.i9qniS0Lz-hc17UGUmFfYw';
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-79.3832, 43.6532], // starting position
      zoom: 15 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    this.resultList = this.searchInput
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(query => query ? this.searchService.search(query)  : Observable.of<any[]>([]))
    .catch(error => {
      return Observable.of<any[]>([]);
    });
  }

  // Push a search term into the observable stream.
  search(): void {
    this.searchInput.next(this.searchQuery);
    console.log(this.searchQuery);
  }

}
