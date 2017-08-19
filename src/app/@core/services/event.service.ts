import { Injectable } from '@angular/core';
import { Event } from '../classes/event';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
    private EventsUrl = '/apis/event';

    constructor (private http: Http) {}

    getEvents(): Promise<Event[] | void> {
      return this.http.get(this.EventsUrl)
                 .toPromise()
                 .then(response => response.json() as Event[])
                 .catch(this.handleError);
    }

    getEventsByType(type: String): Promise<Event[] | void> {
      return this.http.get(this.EventsUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as Event[])
                 .catch(this.handleError);
    }

    getEventsByArtist(artistId: String): Promise<Event[] | void> {
      return this.http.get(this.EventsUrl + '/artist/' + artistId)
                 .toPromise()
                 .then(response => response.json() as Event[])
                 .catch(this.handleError);
    }

    createEvent(newEvent: Event): Promise<Event | void> {
      let data = newEvent;
      return this.http.post(this.EventsUrl, data)
                 .toPromise()
                 .then(response => response.json() as Event)
                 .catch(this.handleError);
    }

    deleteEvent(deleteEventId: String): Promise<String | void> {
      return this.http.delete(this.EventsUrl + '/' + deleteEventId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateEvent(putEvent: Event): Promise<Event | void> {
      let putUrl = this.EventsUrl + '/' + putEvent._id;
      return this.http.put(putUrl, putEvent)
                 .toPromise()
                 .then(response => response.json() as Event)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}