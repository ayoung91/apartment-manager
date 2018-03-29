import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BillingCycleService {
    private Headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:8888/';

    constructor(private http: Http) { }

    public GetBillingCycles() {
        return this.http.get(this.url + 'api/BillingCycle/GetBillingCycles').toPromise()
            .then(response => response.json());
    }
}