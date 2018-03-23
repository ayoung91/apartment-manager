import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TenantService {
    private Headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:8888/';

    constructor(private http: Http) { }

    public GetTenants() {
        return this.http.get(this.url + 'api/Tenant/GetTenants').toPromise()
            .then(response => response.json());

    }

    public AddNewTenant(tenant: any) {
        return this.http.post(this.url + 'api/Tenant/AddTenant', JSON.stringify(tenant), { headers: this.Headers }).toPromise()
            .then(response => response.json());
    }

    public UpdateTenant(tenant: any) {
        return this.http.post(this.url + 'api/Tenant/UpdateTenant', JSON.stringify(tenant), { headers: this.Headers }).toPromise()
            .then(response => response.json());
    }

    public DeleteTenant(tenant: any) {
        return this.http.post(this.url + 'api/Tenant/DeleteTenant', JSON.stringify(tenant), { headers: this.Headers }).toPromise()
            .then(response => response.json());
    }
}