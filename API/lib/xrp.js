const config = require('config');
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({
    server: config.get('xrp.uri') // Public rippled server hosted by Ripple, Inc.
});
api.on('error', (errorCode, errorMessage) => {
    console.log(errorCode + ': ' + errorMessage);
});
api.on('connected', () => {
    console.log('connected');
});
api.on('disconnected', (code) => {
    // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
    // will be 1000 if this was normal closure
    console.log('disconnected, code:', code);
});
const connectRipple = (cb) => {
    api.connect().then(cb).catch(cb);
};

/**
 * Create wallet function
 * @returns {String} Return address
 */

const createWallet = async () => {
    return api.generateAddress();
};
/**
 * Create mulit signature wallet function
 * @param coin {String} currnecy name
 * @param account {String} account name
 * @returns {String} Return multisig wallet address
 */
const createMultiSigWallet = async (coin, account) => {
};
/**
 * Create mulit signature wallet function
 * @param {String} address address
 * @returns {Number} Return balance of particular address
 */
const getBalance = async (address) => {
    let result = await api.getBalances(address, { currency: 'XRP' });
    if (result.length) return result[0].value;
};
/**
 * Create mulit signature wallet function
 * @param {String} address from address
 * @param {String} password from address secret
 * @param {Object} option will contain to address and amount
 * @returns {String} Return transaction hex
 */
const transferAmount = async (from, to, amount, options) => {
    amount = String(amount);
    let payment = {
        "source": {
            "address": from,
            "maxAmount": {
                "value": amount,
                "currency": "XRP"
            }
        },
        "destination": {
            "address": to,
            "amount": {
                "value": amount,
                "currency": "XRP"
            }
        }
    };
    let result = await api.preparePayment(from, payment);
    const prepared = result.txJSON;
    const secret = options.password;
    sign = api.sign(prepared, secret);
    let resultS = await api.submit(sign.signedTransaction)
    console.log(resultS)
    return sign.id;
}
/**
 * @param {String} tx transaction id
 * @return transaction object
 */
const getTransaction = async (tx) => {
    return await api.getTransaction(tx, { limit: 1 })
}
module.exports = {
    createWallet
    , connectRipple
    , getBalance
    , transferAmount
    , createMultiSigWallet
    , getTransaction
};