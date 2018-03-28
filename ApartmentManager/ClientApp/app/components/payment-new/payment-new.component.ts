import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { TenantService } from '../../services/tenant.service';

export interface NewPaymentModel {
    title: string;
    paymentInfo: any;
}
@Component({
    selector: 'payment-new',
    templateUrl: 'payment-new.component.html',
    providers: [TenantService, PaymentService]
})
export class PaymentNewComponent extends DialogComponent<NewPaymentModel, boolean> implements NewPaymentModel {
    title: any;
    paymentInfo: any;
    tenants: any;
    paymentMethods: any;
    paymentInfoForm: any;
    todaysDate = new Date();
    tenantList: any;

    constructor(dialogService: DialogService,private tenantService: TenantService, private paymentService: PaymentService) {
        super(dialogService);

    }

    ngOnInit() {
        this.tenantService.GetTenants()
            .then(response => {
                this.tenants = response;
            });
        this.paymentService.GetPaymentMethods()
            .then(response => {
                this.paymentMethods = response;
            });

        this.paymentInfoForm = new FormGroup({
            'Tenant': new FormControl('', [Validators.required]),
            'Payment_Method': new FormControl(this.paymentInfo.payment.paymentMethod.id, [Validators.required]),
            'Amount': new FormControl(this.paymentInfo.payment.amount, [Validators.required]),
            'Payment_Date': new FormControl(this.formatDate(this.paymentInfo.payment.date), [Validators.required])
        });
    }

    savePayment() {
        this.paymentInfo.tenant = this.tenants.filter((a: any) => a.id == this.paymentInfoForm.controls['Tenant'].value)[0];
        this.paymentInfo.payment.paymentMethod = this.paymentMethods.filter((a: any) => a.id == this.paymentInfoForm.controls['Payment_Method'].value)[0];

        if (this.paymentInfo.payment.id == 0) {
            this.paymentService.AddNewPayment(this.paymentInfo);
        }

        this.close();
    }

    formatDate(date:any) {
        date = new Date(date);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return [month, day, date.getFullYear()].join("/");
    }
}