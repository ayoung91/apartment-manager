import { Component, Inject, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { DialogService } from 'ng2-bootstrap-modal';
import { PaymentService } from '../../services/payment.service';
import { PaymentNewComponent } from '../payment-new/payment-new.component';
import { TenantService } from '../../services/tenant.service';
import { PaymentHistoryComponent } from '../payment-history/payment-history.component';
import { BillingCycleService } from '../../services/billingCycle.service';

export class PaymentModel {
    id: any = 0;
    tenant: any = {
        id: '',
        person: {
            firstName: '',
            lastName: ''
        },
        apartment: {
            address: {
                streetAddress: '',
                city: '',
                state: '',
                zipCode: ''
            },
            rentCost: 0,
            securityDeposit: 0,
            roomNumber: '',
            available: 0
        }
    };
    payment: any = {
        id: 0,
        date: new Date(),
        amount: '',
        balance: '',
        paymentMethod: {
            id: '',
            method: ''
        },
        billingCycle: {
            id: '',
            billingMonth: '',
            billingYear: ''
        }
    };
}

@Component({
    selector: 'payment',
    templateUrl: './payment.component.html',
    providers: [PaymentService, TenantService, BillingCycleService],
    styleUrls: ['../app/app.component.css']
})

export class PaymentComponent {
    payments = new Array<PaymentModel>();
    payment: any = new PaymentModel();
    paymentInfo: any;
    tenant: any;
    billingCycles: any;
    currentBillingCycle: any;
    selectedBillingCycle: any;

    constructor(private paymentService: PaymentService, private billingCycleService: BillingCycleService, private tenantService: TenantService, private dialogService: DialogService) { }

    public ngOnInit(): void {
        this.getBillingCycles();
    }


    getBillingCycles() {
        this.billingCycleService.GetBillingCycles()
            .then(response => {
                this.billingCycles = response;
                this.currentBillingCycle = response[1];
                this.getPayments(this.currentBillingCycle);
            });
    }

    getPayments(billingCycle: any) {
        this.paymentService.GetAllPayments(billingCycle.id)
            .then(response => {
                this.payments = response;
                this.selectedBillingCycle = billingCycle;
                console.log(this.payments);
            })
    }

    addPayment() {
        this.payment.billingCycle.id = this.selectedBillingCycle;
        let disposable = this.dialogService.addDialog(PaymentNewComponent, {
            title: 'Add New Payment',
            paymentInfo: this.payment
        })
            .subscribe((isConfirmed) => {
                location.reload();
            });
    }

    getPaymentHistory(id: any) {
        let disposable = this.dialogService.addDialog(PaymentHistoryComponent, {
            title: 'Payment History',
            tenantId: id
        })
    }

    isPastDue(tenant: any) {
        if (tenant.payment.balance > 0 && this.selectedBillingCycle.id < this.currentBillingCycle.id) {
            return true;
        }
        else {
            return false;
        }
    }
}