import { Injectable } from '@angular/core';
import { Artist } from '../classes/artist';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArtistService {
    private ArtistsUrl = '/apis/artist';

    constructor (private http: Http) {}

    getArtists(): Promise<Artist[] | void> {
      return this.http.get(this.ArtistsUrl)
                 .toPromise()
                 .then(response => response.json() as Artist[])
                 .catch(this.handleError);
    }

    getArtistsByType(type: String): Promise<Artist[] | void> {
      return this.http.get(this.ArtistsUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as Artist[])
                 .catch(this.handleError);
    }

    getArtistByName(artistName: String): Promise<Artist | void> {
      return this.http.get(this.ArtistsUrl + '/' + artistName)
                 .toPromise()
                 .then(response => response.json() as Artist)
                 .catch(this.handleError);
    }

    createArtist(newArtist: Artist): Promise<Artist | void> {
      let data = newArtist;
      return this.http.post(this.ArtistsUrl, data)
                 .toPromise()
                 .then(response => response.json() as Artist)
                 .catch(this.handleError);
    }

    deleteArtist(deleteArtistId: String): Promise<String | void> {
      return this.http.delete(this.ArtistsUrl + '/' + deleteArtistId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateArtist(putArtist: Artist): Promise<Artist | void> {
      let putUrl = this.ArtistsUrl + '/' + putArtist._id;
      return this.http.put(putUrl, putArtist)
                 .toPromise()
                 .then(response => response.json() as Artist)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}