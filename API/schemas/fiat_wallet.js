const mongoose = require('mongoose');
mongoose.Promise = Promise;
const bcrypt = require('bcrypt');
const config = require('config');
const moment = require('moment');
const wHelper = require('../helpers/wallet');
const sModel = require('../schemas/settings');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
var tableSchema = new Schema({
    type: {
        type: String,
        enum: ['DEPOSIT', 'WITHDRAWAL', 'SELL', 'BUY', 'RECEIVE', 'SEND']
    },
    amount: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        enum: ['USD', 'RS'],
        default: 'USD'
    },
    gateway: {
        type: String,
        enum: ['STRIPE', 'PAYPAL', 'CRYPTO', 'MANUAL'],
        default: 'STRIPE'
    },
    coin: {
        type: String,
        default: null,
        enum: [null].concat(Object.values(config.get('cryptocoins')))
    },
    crypto_amount: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        Ref: 'User'
    },
    txid: String,
    confirmations: Number,
    status: {
        type: String,
        enum: ['COMPLETED', 'PENDING', 'FAILED']
    },
    created_at: { type: Date, default: Date.now, index: true },
    updated_at: { type: Date, default: Date.now, index: true },
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        toObject: {
            virtuals: true
        }
        , toJSON: {
            virtuals: true
        }
    });
tableSchema.static('depositAmount', async function (user, amount, gateway, txid, status) {
    gateway = gateway || 'STRIPE';
    status = status || 'COMPLETED'
    return await this.storeTransaction(user, 'DEPOSIT', amount, gateway, undefined, undefined, txid, status);
});
tableSchema.static('buyCrypto', async function (user, amount, coin_type, crypto_amount) {
    try {
        console.log(user)
        let amountInWallet = await this.amountInWallet(user);
        if (amount > amountInWallet) throw new Error('Insufficent balance in Fiat Wallet.');
        let gateway = 'MANUAL';
        let status = 'PENDING';
        let spend_on = coin_type;
        let admin_address = await this.model('Setting').getSettings('admin_' + coin_type);
        let user_address = await this.model('Wallet').getAddresses(user, coin_type);
        let adminCoinObj = admin_address['admin_' + coin_type];
        let buyCryptoObj = await wHelper.transferAmount(coin_type
            , adminCoinObj.account || adminCoinObj.address
            , user_address[coin_type].address, crypto_amount,
            {
                password: admin_address['admin_' + coin_type].password
            });
        return await this.storeTransaction(user, 'BUY', amount, gateway, coin_type, crypto_amount, buyCryptoObj, status, spend_on);
    }
    catch (ex) {
        throw new Error(ex);
    }
});
tableSchema.static('sellCrypto', async function (user, amount, coin_type, crypto_amount) {
    let amountInWallet = await this.amountInWallet(user);
    if (amount > amountInWallet) throw new Error('Insufficent balance in Fiat Wallet.');
    gateway = 'CRYPTO';
    status = 'PENDING';
    spend_on = coin_type;
    let admin_address = await this.model('Setting').getSettings('admin_' + coin_type);
    let user_address = await this.model('Wallet').getAddresses(user, coin_type);
    let sendCryptoObj = await wHelper.transferAmount(coin_type
        , user_address[coin_type].account || user_address[coin_type].address
        , admin_address['admin_' + coin_type].address
        , crypto_amount
        , { password: user_address[coin_type].password }
    );
    return await this.storeTransaction(user, 'SELL', amount, gateway, coin_type, crypto_amount, sendCryptoObj, status, spend_on);
});
tableSchema.static('withdrawAmount', async function (user, amount, status) {
    gateway = 'MANUAL';
    status = status || 'PENDING';
    let amountInWallet = await this.amountInWallet(user);
    if (amount > amountInWallet) throw new Error('Insufficent balance in Fiat Wallet.');
    return await this.storeTransaction(user, 'WITHDRAWAL', amount, gateway, undefined, undefined, undefined, status);
});
tableSchema.static('storeTransaction', async function (user, type, amount, gateway, coin, crypto_amount, txid, status, spend_on) {
    if (!user) throw new Error('User id is required.');
    if (!type) throw new Error('Transaction type is required.');
    if (!amount) throw new Error('Amount is required.');
    const ctx = this;
    return await new ctx({ user, type, amount, gateway, coin, crypto_amount, txid, status, spend_on }).save();
});
tableSchema.static('getTransactions', async function (user) {
    let where = {};
    if (user) where['user'] = user;
    return await this.find(where).populate({ path: 'user', select: 'name first_name last_name email _id' }).sort({ created_at: -1 });
});
tableSchema.static('amountInWallet', async function (user) {
    let depositedAmountCond = [{
        '$and': [
            { '$or': [{ '$eq': ['$type', 'DEPOSIT'] }, { '$eq': ['$type', 'SELL'] }] }, { '$eq': ['$status', 'COMPLETED'] }
        ]
    }, '$amount', 0];
    let withdrawedAmountCond = [{
        '$and': [
            { '$or': [{ '$eq': ['$type', 'WITHDRAWAL'] }, { '$eq': ['$type', 'BUY'] }] },
            { '$or': [{ '$eq': ['$status', 'COMPLETED'] }, { '$eq': ['$status', 'PENDING'] }] }
        ]
    }, '$amount', 0];
    let query = this
        .aggregate()
        .match({ 'user': ObjectId(user) })
        .group({
            '_id': '$user',
            'depositedAmount': { '$push': { '$cond': depositedAmountCond } },
            'withdrawedAmount': { '$push': { '$cond': withdrawedAmountCond } }
        })
        .project({
            'user': '$_id',
            'amountInWallet': { '$subtract': [{ '$sum': '$depositedAmount' }, { '$sum': '$withdrawedAmount' }] }
        });
    let result = await query.exec();
    return (!result || result.length === 0) ? 0 : result[0].amountInWallet;
});
module.exports = mongoose.model('Fiat_wallet', tableSchema);

