const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');
const moment = require('moment');
const Schema = mongoose.Schema;
var tableSchema = new Schema({
    amount: Number,
    coin: String,
    user: {
        type: Schema.Types.ObjectId,
        Ref: 'User'
    },
    confirmations: {
        type: Number,
        default: 0
    },
    type: String,
    blockhash: String,
    blockindex: Number,
    txid: String,
    hex: String,
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

tableSchema.static('getMyTransactions', async function (user) {
    let result = await this.find({ user }).sort({ created_at: -1 });
    return result;
});
module.exports = mongoose.model('Transaction', tableSchema);

