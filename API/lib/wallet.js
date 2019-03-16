const btc = require('./btc');
const ltc = require('./ltc');
const bch = require('./bch');
const eth = require('./eth');
const debc = require('./debc');
const xrp = require('./xrp');
let tModel = require('../schemas/transaction');
let wModel = require('../schemas/wallet');
// let fwWallet = require('../schemas/fiat_wallet');

xrp.connectRipple(console.log);
module.exports = { ltc, btc, bch, debc, eth, xrp };
