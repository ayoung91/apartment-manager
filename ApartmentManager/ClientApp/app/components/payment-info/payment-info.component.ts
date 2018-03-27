import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface NewPaymentModel {
    title: string;
    paymentInfo: any;
}
@Component({
    selector: 'payment-info',
    templateUrl: 'payment-info.component.html',
    providers: [PaymentService]
})
export class PaymentInfoComponent extends DialogComponent<NewPaymentModel, boolean> implements NewPaymentModel {
    title: any;
    paymentInfo: any;
    paymentInfoForm: any;
    todaysDate = new Date();

    constructor(dialogService: DialogService, private paymentService: PaymentService) {
        super(dialogService);

    }

    ngOnInit() {
        this.paymentInfoForm = new FormGroup({
            'Amount': new FormControl(this.paymentInfo.payment.amount, [Validators.required]),
            'Payment_Date': new FormControl(this.formatDate(this.paymentInfo.payment.date), [Validators.required])
        });
    }

    savePayment() {
        if (this.paymentInfo.payment.id == 0)
            this.paymentService.AddNewPayment(this.paymentInfo);
        else {
            this.paymentService.UpdatePayment(this.paymentInfo);
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