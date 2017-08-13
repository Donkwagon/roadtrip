import { NgModule }                          from '@angular/core';
import { Routes, RouterModule }              from '@angular/router';

import { SandboxComponent }                  from './sandbox/sandbox.component';


const routes: Routes = [
  { path: '', redirectTo: '/sandbox', pathMatch: 'full'},
  { path: 'sandbox', component: SandboxComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }