let stripe = require('stripe')('sk_test_LCmn1ZyL9gOGyVgKyeXEwg7Y');

const makePayment = async (source, amount) => {
    let customer = await stripe.customers.create({ source });
    let charge = await stripe.charges.create({ amount, currency: "usd", customer: customer.id })
    return charge;
}
module.exports = { makePayment };