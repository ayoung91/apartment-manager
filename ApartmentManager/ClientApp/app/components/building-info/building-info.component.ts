import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { BuildingService } from '../../services/building.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface NewBuildingModel {
    title: string;
    buildingInfo: any;
}
@Component({
    selector: 'building-info',
    templateUrl: 'building-info.component.html',
    providers: [BuildingService]
})
export class BuildingInfoComponent extends DialogComponent<NewBuildingModel, boolean> implements NewBuildingModel {
    title: any;
    buildingInfo: any;
    buildingInfoForm: any;

    constructor(dialogService: DialogService, private buildingService: BuildingService) {
        super(dialogService);

    }

    ngOnInit() {
        this.buildingInfoForm = new FormGroup({
            'Street_Address': new FormControl(this.buildingInfo.address.streetAddress, [Validators.required]),
            'City': new FormControl(this.buildingInfo.address.city, [Validators.required]),
            'State': new FormControl(this.buildingInfo.address.state, [Validators.required]),
            'Zip_Code': new FormControl(this.buildingInfo.address.zipCode, [Validators.required]),
            'Room_Number': new FormControl(this.buildingInfo.roomNumber, [Validators.required]),
            'Security_Deposit': new FormControl(this.buildingInfo.securityDeposit, [Validators.required]),
            'Rent_Cost': new FormControl(this.buildingInfo.rentCost, [Validators.required])
        });
    }

    saveBuilding() {
        if (this.buildingInfo.id == 0)
            this.buildingService.AddNewApartment(this.buildingInfo);
        else {
            this.buildingService.UpdateApartment(this.buildingInfo);
        }

        this.close();
    }
}