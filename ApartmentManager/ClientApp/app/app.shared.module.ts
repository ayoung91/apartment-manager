import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { TenantComponent } from './components/tenant/tenant.component';
import { TenantInfoComponent } from './components/tenant-info/tenant-info.component';
import { BuildingComponent } from './components/building/building.component';
import { BuildingInfoComponent } from './components/building-info/building-info.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ShowErrorsComponent } from './components/show-errors/show-errors.component';

import { PhonePipe } from './filters/phone.filter';

import { PhoneMask } from './masks/phone.mask';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        TenantComponent,
        TenantInfoComponent,
        BuildingComponent,
        BuildingInfoComponent,
        PaymentComponent,
        PaymentInfoComponent,
        ConfirmDialogComponent,
        ShowErrorsComponent,
        PhonePipe,
        PhoneMask
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BootstrapModalModule,
        TooltipModule.forRoot(),
        BsDatepickerModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'tenant', component: TenantComponent },
            { path: 'building', component: BuildingComponent },
            { path: 'payment', component: PaymentComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    entryComponents: [
        TenantInfoComponent,
        BuildingInfoComponent,
        PaymentInfoComponent,
        ConfirmDialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModuleShared {

}
