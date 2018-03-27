import { Component, Inject, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { DialogService } from 'ng2-bootstrap-modal';
import { PaymentService } from '../../services/payment.service';

export class PaymentModel {
    id: any = 0;
    person: any = {
        firstName: '',
        lastName: ''
    };
    apartment: any = {
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
    };
    date: any;
    amount: any;    
}

@Component({
    selector: 'payment',
    templateUrl: './payment.component.html',
    providers: [PaymentService],
    styleUrls: ['../app/app.component.css']
})

export class PaymentComponent {
    payments: any;
    payment: any = new PaymentModel();
    paymentInfo: any;

    constructor(private paymentService: PaymentService, private dialogService: DialogService) { }

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
}

