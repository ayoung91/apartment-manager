import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { TenantComponent } from './components/tenant/tenant.component';
import { TenantInfoComponent } from './components/tenant-info/tenant-info.component';
import { BuildingComponent } from './components/building/building.component';
import { BuildingInfoComponent } from './components/building-info/building-info.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ShowErrorsComponent } from './components/show-errors/show-errors.component';

import { PhonePipe } from './filters/phone.filter';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        TenantComponent,
        TenantInfoComponent,
        BuildingComponent,
        BuildingInfoComponent,
        ConfirmDialogComponent,
        ShowErrorsComponent,
        PhonePipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BootstrapModalModule,
        TooltipModule.forRoot(),
        NgxPhoneMaskModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'tenant', component: TenantComponent },
            { path: 'building', component: BuildingComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    entryComponents: [
        TenantInfoComponent,
        BuildingInfoComponent,
        ConfirmDialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModuleShared {

}
