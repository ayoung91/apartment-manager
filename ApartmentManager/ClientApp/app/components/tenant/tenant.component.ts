import { Component, Inject, OnInit, Input } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { TenantInfoComponent } from '../tenant-info/tenant-info.component';
import { Http } from '@angular/http';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BuildingService } from '../../services/building.service';

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

    constructor(private tenantService: TenantService, private buildingService: BuildingService, private dialogService: DialogService) {
        
    }

    public ngOnInit(): void {
        this.getTenants();
    }

    addTenant() {
        this.buildingService.GetAvailableApartments(0)
            .then(response => {
                let disposable = this.dialogService.addDialog(TenantInfoComponent, {
                    title: 'Add New Tenant',
                    tenantInfo: this.tenant,
                    availableRooms: response
                })
                    .subscribe((isConfirmed) => {
                        location.reload();
                    });
            })       
    }

    updateTenant(tenantId: number, apartmentId: number) {
        this.buildingService.GetAvailableApartments(apartmentId)
            .then(response => {
                this.tenantInfo = this.tenants.filter((t: any) => t.id == tenantId)[0];
                let disposable = this.dialogService.addDialog(TenantInfoComponent, {
                    title: 'Update Tenant',
                    tenantInfo: this.tenantInfo,
                    availableRooms: response
                })
                    .subscribe((isConfirmed) => {
                        location.reload();
                    });
            })
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
}