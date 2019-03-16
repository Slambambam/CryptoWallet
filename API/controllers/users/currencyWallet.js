
const FWModel = require('../../schemas/fiat_wallet');
const CLModel = require('../../schemas/coin_lookup');
const wModel = require('../../schemas/wallet');
const stripeService = require('../../services/payment/stripe');
const withdrawAmount = async (req, res, next) => {
    try {
        const details = await FWModel.withdrawAmount(req.user._id, req.body.amount);
        res.sendResponse({ details }, 200, 'Your request has been submitted successfully');
    }
    catch (ex) {
        next(ex);
    }
};
const depositAmount = async (req, res, next) => {
    try {
        const payment = await stripeService.makePayment(req.body.token, req.body.amount);
        const details = await FWModel.depositAmount(req.user._id, payment.amount, 'STRIPE', payment.id, 'COMPLETED');
        res.sendResponse({ details }, 200, 'Your request has been submitted successfully');
    }
    catch (ex) {
        next(ex);
    }
};
const buyCrypto = async (req, res, next) => {
    try {
        const cnvertdAmount = await CLModel.convertToCryptoAmount(req.body.coin, req.body.amount);
        if (cnvertdAmount === 0) throw new Error('Amount should be high');
        const details = await FWModel.buyCrypto(req.user._id, req.body.amount, req.body.coin, cnvertdAmount);
        res.sendResponse({ details }, 200, 'Your request has been submitted successfully');
    }
    catch (ex) {
        next(ex);
    }
};
const sellCrypto = async (req, res, next) => {
    try {
        const cnvertdAmount = await CLModel.convertToCryptoAmount(req.body.coin, req.body.amount, 'sell');
        if (cnvertdAmount === 0) throw new Error('Amount should be high');
        const details = await FWModel.sellCrypto(req.user._id, req.body.amount, req.body.coin, cnvertdAmount);
        res.sendResponse({ details }, 200, 'Your request has been submitted successfully');
    }
    catch (ex) {
        next(ex);
    }
};
const getTransactions = async (req, res, next) => {
    try {
        const transactions = await FWModel.getTransactions(req.user._id);
        const amountInWallet = await FWModel.amountInWallet(req.user._id);
        const currencyLookup = await CLModel.getCryptoLookup();
        res.sendResponse({ transactions, amountInWallet, currencyLookup }, 200, 'Transactions fetched successfully');
    }
    catch (ex) {
        next(ex);
    }

};
const getCurrencyLookup = async (req, res, next) => {
    try {
        const currencyLookup = await CLModel.getCryptoLookup();
        const amountInWallet = await FWModel.amountInWallet(req.user._id);
        const wallets = await wModel.find({ user: req.user._id });
        res.sendResponse({ currencyLookup, amountInWallet, wallets }, 200, 'currencyLookup fetched successfully');
    }
    catch (ex) {
        next(ex);
    }

};
module.exports = { withdrawAmount, depositAmount, buyCrypto, getTransactions, sellCrypto, getCurrencyLookup };