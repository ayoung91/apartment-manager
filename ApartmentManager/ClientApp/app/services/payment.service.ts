import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PaymentService {
    private Headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:8888/';

    constructor(private http: Http) { }

    public GetAllPayments() {
        return this.http.get(this.url + 'api/Payment/GetPayments').toPromise()
            .then(response => response.json());
    }
}