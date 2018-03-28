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

    public GetPaymentMethods() {
        return this.http.get(this.url + 'api/Payment/GetPaymentMethods').toPromise()
            .then(response => response.json());
    }
    
    public GetPaymentHistory(id: any) {
        let params = new URLSearchParams();
        params.set('id', id);

        return this.http.get(this.url + 'api/Payment/GetPaymentHistory', { params: params }).toPromise()
            .then(response => response.json());
    }

    public AddNewPayment(payment: any) {
        return this.http.post(this.url + 'api/Payment/AddPayment', JSON.stringify(payment), { headers: this.Headers }).toPromise()
            .then(response => response.json());
    }

    public UpdatePayment(payment: any) {
        return this.http.post(this.url + 'api/Payment/UpdatePayment', JSON.stringify(payment), { headers: this.Headers }).toPromise()
            .then(response => response.json());
    }
}