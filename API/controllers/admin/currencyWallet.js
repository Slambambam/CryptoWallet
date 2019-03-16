
const FWModel = require('../../schemas/fiat_wallet');
const CLModel = require('../../schemas/coin_lookup');
const wModel = require('../../schemas/wallet');
const stripeService = require('../../services/payment/stripe');
const getTransactions = async (req, res, next) => {
    try {
        const transactions = await FWModel.getTransactions();
        res.sendResponse({ transactions }, 200, 'Transactions fetched successfully');
    }
    catch (ex) {
        next(ex);
    }

};
const getCurrencyLookup = async (req, res, next) => {
    try {
        const currencyLookup = await CLModel.getCryptoLookup();
        res.sendResponse({ currencyLookup }, 200, 'currencyLookup fetched successfully');
    }
    catch (ex) {
        next(ex);
    }
};
const updateCurrencyLookup = async (req, res, next) => {
    try {
        let { coin, sell_amount, buy_amount } = req.body;
        const currencyLookup = await CLModel.updateCryptoLookup(coin, sell_amount, buy_amount);
        res.sendResponse({ currencyLookup }, 200, 'currencyLookup fetched successfully');
    }
    catch (ex) {
        next(ex);
    }
};
module.exports = { getTransactions, getCurrencyLookup, updateCurrencyLookup };