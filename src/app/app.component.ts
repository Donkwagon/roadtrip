import { Component } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

import { SearchService } from './@core/services/search.service';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ SearchService ]
})

export class AppComponent {
  resultList: Observable<any[]>;
  searchQuery: string;
  location: any;
  private searchInput = new Subject<string>();

  title = 'app';

  user: Observable<firebase.User>;
  

  constructor(public afAuth: AngularFireAuth, private searchService: SearchService) { 
    this.getLocation();

    this.user = afAuth.authState;
    
    this.resultList = this.searchInput
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(query => query ? this.searchService.search(query)  : Observable.of<any[]>([]))
    .catch(error => {
      return Observable.of<any[]>([]);
    });

  }

  ngOnInit(): void {
    console.log("wer");
    console.log(mapboxgl);
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ua3doYW4iLCJhIjoiY2l6OHA1MDZtMDA0cDJxcW9vdXM5OHFpaCJ9.i9qniS0Lz-hc17UGUmFfYw';
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/traffic-night-v2',
      center: [-79.3832, 43.6532], // starting position
      zoom: 15 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

  }
  // Push a search term into the observable stream.
  search(): void {
    this.searchInput.next(this.searchQuery);
    console.log(this.searchQuery);
  }

  getLocation() {
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position => {
         this.location = position.coords;
         console.log(position.coords); 
       });
    }
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
