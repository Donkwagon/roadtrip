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

    map.on('load', function () {
    
        map.addLayer({
            "id": "route",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [-122.48369693756104, 37.83381888486939],
                            [-122.48348236083984, 37.83317489144141],
                            [-122.48339653015138, 37.83270036637107],
                            [-122.48356819152832, 37.832056363179625],
                            [-122.48404026031496, 37.83114119107971],
                            [-122.48404026031496, 37.83049717427869],
                            [-122.48348236083984, 37.829920943955045],
                            [-122.48356819152832, 37.82954808664175],
                            [-122.48507022857666, 37.82944639795659],
                            [-122.48610019683838, 37.82880236636284],
                            [-122.48695850372314, 37.82931081282506],
                            [-122.48700141906738, 37.83080223556934],
                            [-122.48751640319824, 37.83168351665737],
                            [-122.48803138732912, 37.832158048267786],
                            [-122.48888969421387, 37.83297152392784],
                            [-122.48987674713133, 37.83263257682617],
                            [-122.49043464660643, 37.832937629287755],
                            [-122.49125003814696, 37.832429207817725],
                            [-122.49163627624512, 37.832564787218985],
                            [-122.49223709106445, 37.83337825839438],
                            [-122.49378204345702, 37.83368330777276]
                        ]
                    }
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#888",
                "line-width": 8
            }
        });
    });
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
