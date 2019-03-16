import { StripeFormComponent } from './stripe';
import { Injectable } from '@angular/core';
@Injectable()
export class Payment {
    constructor(private stripe: StripeFormComponent) { }
    makePayment(gateway, options, cb) {
        switch (gateway) {
            case 'stripe':
                this.stripe.createPaymentToken(options, cb);
                break;
            default:
                break;
        }

    }
}
