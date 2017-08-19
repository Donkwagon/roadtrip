import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Artist } from '../../@core/classes/artist';
import { ArtistService } from '../../@core/services/artist.service';
import { Event } from '../../@core/classes/event';
import { EventService } from '../../@core/services/event.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  providers: [ ArtistService, EventService ]
})
export class ArtistComponent implements OnInit {

  sub: any;
  artistName: string;
  artist: any;
  events: Event[];

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private eventService: EventService) { }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.artistName = params['artistName'];
      this.getArtistInfo();
      console.log(this.artistName);
    });
  }

  getArtistInfo() {
    this.artistService.getArtistByName(this.artistName).then(res => {
      console.log(res);
      this.artist = res;
      this.getEventsByArtist();
    });
  }
  
  getEventsByArtist() {
    this.eventService.getEventsByArtist(this.artist.id).then(res => {
      console.log(res);
      res ? this.events = res : 0;
    });
  }

}
