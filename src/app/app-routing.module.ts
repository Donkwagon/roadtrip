import { NgModule }                          from '@angular/core';
import { Routes, RouterModule }              from '@angular/router';

import { DataComponent }                  from './data/data.component';

import { ArtistsComponent } from './artists/artists.component';
import { ArtistsOverallComponent } from './artists/artists-overall/artists-overall.component';
import { VenuesComponent } from './venues/venues.component';
import { EventsComponent } from './events/events.component';
import { ArtistComponent } from './artists/artist/artist.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'data', component: DataComponent},
  { path: 'artists', component: ArtistsComponent, children: [
    { path: '', redirectTo: 'overall', pathMatch: 'full' },
    { path: 'overall', component: ArtistsOverallComponent},
    { path: ':artistName', component: ArtistComponent},
  ]},
  { path: 'venues', component: VenuesComponent},
  { path: 'events', component: EventsComponent},
  { path: 'callback', component: CallbackComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }