import { Component, OnInit } from '@angular/core';

import { Artist } from '../../@core/classes/artist';
import { ArtistService } from '../../@core/services/artist.service';

@Component({
  selector: 'app-artists-overall',
  templateUrl: './artists-overall.component.html',
  styleUrls: ['./artists-overall.component.scss'],
  providers: [ ArtistService ]
})

export class ArtistsOverallComponent implements OnInit {

  artists: Artist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.getArtists();
  }

  getArtists() {
    this.artistService.getArtists().then(res => {
      console.log(res);
      if(res){
        this.artists = res;
      }
    });
  }

}
