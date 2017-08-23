import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CrawlerService {

    private CrawlersUrl = '/apis/crawlers';

    constructor (private http: Http) {}

    commenceProbing(): Promise<String[] | void> {
      return this.http.get(this.CrawlersUrl)
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }

    rakeArtistList(): Promise<String[] | void> {
      return this.http.get(this.CrawlersUrl + "/bandsintown/rake")
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }

    getArtistInfo(): Promise<String[] | void> {
      return this.http.get(this.CrawlersUrl + "/bandsintown/artistinfo")
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }


    getVenuesFromLivenation(): Promise<String[] | void> {
      return this.http.get(this.CrawlersUrl + "/livenation/")
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }

    getUpcomingEvents(): Promise<String[] | void> {
      return this.http.get(this.CrawlersUrl + "/bandsintown/upcomingevents")
                 .toPromise()
                 .then(response => response.json() as String[])
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}