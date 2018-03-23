import { Component, Inject, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { DialogService } from 'ng2-bootstrap-modal';
import { BuildingService } from '../../services/building.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BuildingInfoComponent } from '../building-info/building-info.component';

export class BuildingModel {
    id: any = 0;
    address: any = {
        streetAddress: '',
        city: '',
        state: '',
        zipCode: ''
    }
    rentCost: any;
    securityDeposit: any;
    roomNumber: any;
    available: any;
}

@Component({
    selector: 'building',
    templateUrl: './building.component.html',
    providers: [BuildingService],
    styleUrls: ['../app/app.component.css']
})

export class BuildingComponent {
    buildings: any;
    building: any = new BuildingModel();
    buildingInfo: any;

    constructor(private buildingService: BuildingService, private dialogService: DialogService) { }

    public ngOnInit(): void {
        this.getBuildings();
    }

    addBuilding() {
        let disposable = this.dialogService.addDialog(BuildingInfoComponent, {
            title: 'Add New Apartment Building',
            buildingInfo: this.building
        })
            .subscribe((isConfirmed) => {
                location.reload();
            });
    }

    updateBuilding(id: number) {
        this.buildingInfo = this.buildings.filter((t: any) => t.id == id)[0];
        let disposable = this.dialogService.addDialog(BuildingInfoComponent, {
            title: 'Update Apartment Building',
            buildingInfo: this.buildingInfo
        })
            .subscribe((isConfirmed) => {
                location.reload();
            });
    }

    deleteBuilding(id: number) {
        this.buildingInfo = this.buildings.filter((t: any) => t.id == id)[0];
        let disposable = this.dialogService.addDialog(ConfirmDialogComponent, {
            title: 'Delete Apartment Building',
            info: this.buildingInfo,
            type: "Building"
        })
            .subscribe((isConfirmed) => {
                location.reload();
            });
    }

    getBuildings() {
        this.buildingService.GetApartments()
            .then(response => {
                this.buildings = response;
                console.log(this.buildings);
            })
    }
}

