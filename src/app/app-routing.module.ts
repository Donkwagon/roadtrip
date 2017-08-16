import { NgModule }                          from '@angular/core';
import { Routes, RouterModule }              from '@angular/router';

import { SandboxComponent }                  from './sandbox/sandbox.component';
import { DataComponent }                  from './data/data.component';

import { ArtistsComponent } from './artists/artists.component';
import { VenuesComponent } from './venues/venues.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: '', redirectTo: '/sandbox', pathMatch: 'full'},
  { path: 'sandbox', component: SandboxComponent},
  { path: 'data', component: DataComponent},
  { path: 'artists', component: ArtistsComponent},
  { path: 'venues', component: VenuesComponent},
  { path: 'events', component: EventsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }