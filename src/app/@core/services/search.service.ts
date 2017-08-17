import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: Http) {}

  search(query: string): Observable<any[]> {
    
    return this.http
               .get(`apis/search/${query}`)
               .map(response => response.json() as any[]);
  }
}