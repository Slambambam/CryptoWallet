(<any>window).Stripe.setPublishableKey('pk_test_pi6ro7w2L5nSAOc9IGOwGpg5');
export class StripeFormComponent {
  createPaymentToken(options: any, cb) {
    (<any>window).Stripe.card.createToken({
      number: options.cardNumber,
      exp_month: options.expiryMonth,
      exp_year: options.expiryYear,
      cvc: options.cvc
    }, cb);
  }
}
