const mongoose = require('mongoose');
mongoose.Promise = Promise;
const config = require('config');
const moment = require('moment');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
var tableSchema = new Schema({
    key: String,
    value: Schema.Types.Mixed,
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
tableSchema.static('getSettings', async function getSettings(keys) {
    let settings, settingsObj = {};
    if (keys) {
        keys = Array.isArray(keys) ? keys : [keys];
        settings = await this.find({ key: { '$in': keys } });
    }
    else {
        settings = await this.find();
    }
    if (settings.length === 0) throw new Error('Key not found');
    settings.forEach(item => {
        settingsObj[item.key] = item.value;
    });
    return settingsObj;
});
tableSchema.static('updateSettings', async function updateSettings(settingsObj) {
    if (!settingsObj || typeof settingsObj !== 'object' || Array.isArray(settingsObj))
        throw new Error('Key not found.');
    let keys;
    keys = Object.keys(settingsObj);
    for (key in keys) {
        await this.update({ key }, { $set: { value: settingsObj[key] } });
    };
    return await this.getSettings(keys);
});
tableSchema.static('getCryptoSettings', async function updateSettings() {
    return await this.getSettings([
        'eth_configuration'
        , 'xrp_configuration'
        , 'btc_configuration'
        , 'bch_configuration'
        , 'ltc_configuration'
    ]);
});
module.exports = mongoose.model('Setting', tableSchema);