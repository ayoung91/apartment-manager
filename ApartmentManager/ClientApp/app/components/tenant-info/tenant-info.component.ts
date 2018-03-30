import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { TenantService } from '../../services/tenant.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface NewTenantModel {
    title: string;
    tenantInfo: any;
    availableRooms: any;
    billingCycles: any;
}
@Component({
    selector: 'tenant-info',
    templateUrl: 'tenant-info.component.html',
    providers: [TenantService]
})
export class TenantInfoComponent extends DialogComponent<NewTenantModel, boolean> implements NewTenantModel {
    title: any;
    tenantInfo: any;
    availableRooms: any;
    billingCycles: any;
    tenantInfoForm: any;
    selectedRoom: any = '';
    selectedBillingCycle: any = '';
    leaseLength: any = '';

    constructor(dialogService: DialogService, private tenantService: TenantService) {
        super(dialogService);

    }

    ngOnInit() {
        this.selectedRoom = this.availableRooms[0].id;
        this.selectedBillingCycle = this.tenantInfo.startBillingCycleId == 0 ? this.billingCycles[1].id : this.tenantInfo.startBillingCycleId;
        this.leaseLength = this.tenantInfo.endBillingCycleId == 0 ? '' : Number(this.tenantInfo.endBillingCycleId) - Number(this.tenantInfo.startBillingCycleId)
        this.tenantInfoForm = new FormGroup({
            'First_Name': new FormControl(this.tenantInfo.person.firstName, [Validators.required]),
            'Last_Name': new FormControl(this.tenantInfo.person.lastName, [Validators.required]),
            'Apartment': new FormControl(this.selectedRoom),
            'Phone_Number': new FormControl(this.tenantInfo.person.personContact.phoneNumber, [Validators.required]),
            'Billing_Cycle_Start': new FormControl(this.selectedBillingCycle),
            'Lease_Length': new FormControl(this.leaseLength, [Validators.required])
        });
    }

    saveTenant() {
        this.tenantInfo.apartment = this.availableRooms.filter((a: any) => a.id == this.tenantInfoForm.controls['Apartment'].value)[0];
        this.tenantInfo.person.personContact.phoneNumber = this.tenantInfo.person.personContact.phoneNumber.replace(/\D+/g, '');
        this.tenantInfo.startBillingCycleId = this.billingCycles.filter((bs: any) => bs.id == this.tenantInfoForm.controls['Billing_Cycle_Start'].value)[0].id;
        this.tenantInfo.endBillingCycleId = this.tenantInfo.startBillingCycleId + Number(this.leaseLength);

        if (this.tenantInfo.id == 0)
            this.tenantService.AddNewTenant(this.tenantInfo);
        else {
            this.tenantService.UpdateTenant(this.tenantInfo);
        }

        this.close();
    }
}