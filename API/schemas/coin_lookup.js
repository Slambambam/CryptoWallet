const mongoose = require('mongoose');
mongoose.Promise = Promise;
const bcrypt = require('bcrypt');
const config = require('config');
const moment = require('moment');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
var tableSchema = new Schema({
    coin: {
        type: String,
        enum: config.get('cryptocoins')
    },
    buy_amount: Number,
    sell_amount: Number,
    status: Boolean,
    created_at: { type: Date, default: Date.now, index: true },
    updated_at: { type: Date, default: Date.now, index: true },
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });
tableSchema.static('convertToCryptoAmount', async function (coin, amount, type) {
    type = type || 'buy';
    let cryptoObj = await this.findOne({ coin });
    if (!cryptoObj) throw new Error('Invalid coin')
    if (type === 'buy')
        return cryptoObj.buy_amount > 0 ? amount / cryptoObj.buy_amount : 0;
    else
        return cryptoObj.sell_amount > 0 ? amount / cryptoObj.sell_amount : 0;
});
tableSchema.static('getCryptoLookup', async function (coin) {
    let where = {};
    where['status'] = true;
    if (coin) where['coin'] = coin;
    let lookup = await this.find(where).select('type buy_amount sell_amount coin');
    return lookup;
});
tableSchema.static('updateCryptoLookup', async function (coin, sell_amount, buy_amount) {
    let where = { coin }
    let lookup = await this.findOneAndUpdate(where, { sell_amount, buy_amount }, { new: true });
    return lookup;
});
module.exports = mongoose.model('Coin_lookup', tableSchema);