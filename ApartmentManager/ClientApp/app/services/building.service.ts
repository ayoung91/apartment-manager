import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BuildingService {
    private Headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:8888/';

    constructor(private http: Http) { }

    public GetApartments() {
        return this.http.get(this.url + 'api/Apartment/GetApartments').toPromise()
            .then(response => response.json());
    }

    public AddNewApartment(building: any) {
        return this.http.post(this.url + 'api/Apartment/AddApartment', JSON.stringify(building), { headers: this.Headers }).toPromise()
            .then(response => response.json());
    }

    public UpdateApartment(building: any) {
        return this.http.post(this.url + 'api/Apartment/UpdateApartment', JSON.stringify(building), { headers: this.Headers }).toPromise()
            .then(response => response.json());
    }

    public DeleteApartment(building: any) {
        return this.http.post(this.url + 'api/Apartment/DeleteApartment', JSON.stringify(building), { headers: this.Headers }).toPromise()
            .then(response => response.json());
    }
}