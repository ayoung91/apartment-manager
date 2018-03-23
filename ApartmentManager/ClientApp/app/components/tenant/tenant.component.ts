import { Component, Inject, OnInit, Input } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { TenantInfoComponent } from '../tenant-info/tenant-info.component';
import { Http } from '@angular/http';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BuildingService } from '../../services/building.service';
import { OrderPipe } from 'ngx-order-pipe';

export class TenantModel {
    id: any = 0;
    person: any = {
        firstName: '',
        lastName: '',
        personContact: { phoneNumber: '' }
    };
    apartment: any = {
        address: {
            streetAddress: '',
            city: '',
            state: '',
            zipCode: ''
        }
    }
}
@Component({
    selector: 'tenant',
    templateUrl: './tenant.component.html',
    providers: [TenantService, BuildingService],
    styleUrls: ['../app/app.component.css']
})
export class TenantComponent {
    tenant: any = new TenantModel();
    tenants: any;
    tenantInfo: any;
    allApartments: any;
    availableRooms: any;
    order: string = 'tenant.person.firstName';
    reverse: boolean = false;
    sortedCollection: any[];

    constructor(private tenantService: TenantService, private buildingService: BuildingService, private dialogService: DialogService, private orderPipe: OrderPipe) {
        this.sortedCollection = orderPipe.transform(this.tenants, 'tenant.person.firstName');
    }

    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    }

    public ngOnInit(): void {
        this.getTenants();
        this.availableRooms = this.getAvailableRooms();
    }

    addTenant() {
        let disposable = this.dialogService.addDialog(TenantInfoComponent, {
            title: 'Add New Tenant',
            tenantInfo: this.tenant,
            availableRooms: this.availableRooms
        })
            .subscribe((isConfirmed) => {
                location.reload();
            });
    }

    updateTenant(id: number) {
        this.tenantInfo = this.tenants.filter((t: any) => t.id == id)[0];
        let disposable = this.dialogService.addDialog(TenantInfoComponent, {
            title: 'Update Tenant',
            tenantInfo: this.tenantInfo,
            availableRooms: this.availableRooms
        })
            .subscribe((isConfirmed) => {
                location.reload();
            });
    }

    deleteTenant(id: number) {
        this.tenantInfo = this.tenants.filter((t: any) => t.id == id)[0];
        let disposable = this.dialogService.addDialog(ConfirmDialogComponent, {
            title: 'Delete Tenant',
            info: this.tenantInfo,
            type: "Tenant"
        })
            .subscribe((isConfirmed) => {
                location.reload();
            });
    }

    getTenants() {
        this.tenantService.GetTenants()
            .then(response => {
                this.tenants = response;
            })
    }

    getAvailableRooms() {
        this.buildingService.GetApartments()
            .then(response => {
                this.allApartments = response;
                this.availableRooms = this.allApartments.filter((a: any) => a.available == true);
            })
    }
}