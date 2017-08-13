import { Component } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'app';

  constructor() {
    console.log("wer");
    console.log(mapboxgl);


  }
}
