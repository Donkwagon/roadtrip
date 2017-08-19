import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})

export class SandboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ua3doYW4iLCJhIjoiY2l6OHA1MDZtMDA0cDJxcW9vdXM5OHFpaCJ9.i9qniS0Lz-hc17UGUmFfYw';
    
    // var map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/traffic-night-v2',
    //   center: [-79.3832, 43.6532], // starting position
    //   zoom: 15 // starting zoom
    // });

    // // Add zoom and rotation controls to the map.
    // map.addControl(new mapboxgl.NavigationControl());

  }


}
