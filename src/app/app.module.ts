import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LocationStrategy }                  from '@angular/common';
import { HashLocationStrategy }              from '@angular/common';

import { AppRoutingModule }                  from './app-routing.module';

import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';

@NgModule({
  declarations: [
    AppComponent,
    SandboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
