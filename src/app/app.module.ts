import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }                        from '@angular/http';
import { FormsModule } from '@angular/forms';


import { LocationStrategy }                  from '@angular/common';
import { HashLocationStrategy }              from '@angular/common';

import { AppRoutingModule }                  from './app-routing.module';

import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { DataComponent } from './data/data.component';
import { ArtistsComponent } from './artists/artists.component';
import { VenuesComponent } from './venues/venues.component';
import { EventsComponent } from './events/events.component';
import { ArtistComponent } from './artists/artist/artist.component';
import { ArtistsOverallComponent } from './artists/artists-overall/artists-overall.component';

@NgModule({
  declarations: [
    AppComponent,
    SandboxComponent,
    DataComponent,
    ArtistsComponent,
    VenuesComponent,
    EventsComponent,
    ArtistComponent,
    ArtistsOverallComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
