import { Component, Inject, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { DialogService } from 'ng2-bootstrap-modal';
import { PaymentService } from '../../services/payment.service';
import { PaymentInfoComponent } from '../payment-info/payment-info.component';
import { TenantService } from '../../services/tenant.service';

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
        balance: ''
    }
     
}

@Component({
    selector: 'payment',
    templateUrl: './payment.component.html',
    providers: [PaymentService, TenantService],
    styleUrls: ['../app/app.component.css']
})

export class PaymentComponent {
    payments = new Array<PaymentModel>();
    payment: any = new PaymentModel();
    paymentInfo: any;

    constructor(private paymentService: PaymentService, private tenantService: TenantService, private dialogService: DialogService) { }

    public ngOnInit(): void {
        this.getPayments();
    }

    getPayments() {
        this.paymentService.GetAllPayments()
            .then(response => {
                this.payments = response;
                console.log(this.payments);
            })
    }

    addPayment() {
        this.tenantService.GetTenants()
            .then(response => {
                let disposable = this.dialogService.addDialog(PaymentInfoComponent, {
                    title: 'Add New Payment',
                    paymentInfo: this.payment,
                    tenants: response
                })
                    .subscribe((isConfirmed) => {
                        location.reload();
                    });
            })
    }

    //updatePayment(id: any) {
    //    this.payment = this.payments.filter((p: any) => p.id == id)[0];
    //    let disposable = this.dialogService.addDialog(PaymentInfoComponent, {
    //        title: 'Add New Payment',
    //        paymentInfo: this.payment
    //    })
    //        .subscribe((isConfirmed) => {
    //            location.reload();
    //        });
    //}
}

