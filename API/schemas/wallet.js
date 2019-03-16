const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');
const moment = require('moment');
const Schema = mongoose.Schema;
var tableSchema = new Schema({
    type: {
        type: String,
        default: 'normal',
        enum: config.get('wallettypes')
    },
    redeemScript: String,
    password: String,
    user: {
        Ref: 'User',
        type: Schema.Types.ObjectId
    },
    name: String,
    main_address: String,
    addresses: [String],
    coin_type: {
        type: String,
        default: 'btc',
        enum: config.get('cryptocoins')
    },
    confirmed_amount: {
        default: 0,
        type: Number
    },
    unconfirmed_amount: {
        default: 0,
        type: Number
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
tableSchema.static('getAddresses', async function getAddresses(user, coin_type) {
    let where = {};
    where['user'] = user;
    if (coin_type) where['coin_type'] = coin_type;
    let wallets = await this.find(where), addresses = {};
    wallets.forEach(item => {
        addresses[item.coin_type] = {
            address: item.main_address,
            account: ['btc', 'bch', 'ltc'].indexOf(item.coin_type) !== -1 ? item.user : undefined,
            password: item.password
        }
    });
    return addresses;
});
module.exports = mongoose.model('Wallet', tableSchema);

