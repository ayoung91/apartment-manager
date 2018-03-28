import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { TenantService } from '../../services/tenant.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface NewTenantModel {
    title: string;
    tenantInfo: any;
    availableRooms: any;
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
    tenantInfoForm: any;
    selectedRoom: any = '';

    constructor(dialogService: DialogService, private tenantService: TenantService) {
        super(dialogService);

    }

    ngOnInit() {
        this.selectedRoom = this.availableRooms[0].id;
        this.tenantInfoForm = new FormGroup({
            'First_Name': new FormControl(this.tenantInfo.person.firstName, [Validators.required]),
            'Last_Name': new FormControl(this.tenantInfo.person.lastName, [Validators.required]),
            'Apartment': new FormControl(this.selectedRoom, [Validators.required]),
            'Phone_Number': new FormControl(this.tenantInfo.person.personContact.phoneNumber, [Validators.required]),
        });
    }

    saveTenant() {
        this.tenantInfo.apartment = this.availableRooms.filter((a: any) => a.id == this.tenantInfoForm.controls['Apartment'].value)[0];
        this.tenantInfo.person.personContact.phoneNumber = this.tenantInfo.person.personContact.phoneNumber.replace(/\D+/g, '');

        if (this.tenantInfo.id == 0)
            this.tenantService.AddNewTenant(this.tenantInfo);
        else {
            this.tenantService.UpdateTenant(this.tenantInfo);
        }

        this.close();
    }
}