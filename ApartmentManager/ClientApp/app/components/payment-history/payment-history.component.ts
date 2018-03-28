import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface PaymentHistoryModel {
    title: string;
    tenantId: any;
}
@Component({
    selector: 'payment-history',
    templateUrl: 'payment-history.component.html',
    providers: [PaymentService]
})
export class PaymentHistoryComponent extends DialogComponent<PaymentHistoryModel, boolean> implements PaymentHistoryModel {
    title: any;
    tenantId: any;
    payments: any;

    constructor(dialogService: DialogService, private paymentService: PaymentService) {
        super(dialogService);

    }

    ngOnInit() {
        this.getPaymentHistory();
    }

    getPaymentHistory() {
        this.paymentService.GetPaymentHistory(this.tenantId)
            .then(response => {
                this.payments = response;
                console.log(this.payments);
            })
    }
}