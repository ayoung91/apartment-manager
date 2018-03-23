import { Component, Input, OnInit, Output } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { BuildingService } from '../../services/building.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModal {
    title: string;
    info: any;
    type: any;
}

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    providers: [TenantService, BuildingService]
})

export class ConfirmDialogComponent extends DialogComponent<ConfirmModal, boolean> implements ConfirmModal {
    title: any;
    info: any;
    type: any;
    content: any;

    constructor(dialogService: DialogService, private tenantService: TenantService, private buildingService: BuildingService) {
        super(dialogService);
    }

    getContent() {
        if (this.type == "Tenant") return this.info.person.firstName + ' ' + this.info.person.lastName;
        else if (this.type == "Building") return this.info.address.streetAddress + ' ' + this.info.roomNumber;
    }

    delete() {
        if (this.type == "Tenant") this.deleteTenant();
        else if (this.type == "Building") this.deleteApartment();
    }

    deleteTenant() {
        this.tenantService.DeleteTenant(this.info);
        this.close();
    }

    deleteApartment() {
        this.buildingService.DeleteApartment(this.info);
        this.close();
    }
}