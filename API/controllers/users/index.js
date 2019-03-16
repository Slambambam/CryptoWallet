
const uModel = require('../../schemas/users');
const wModel = require('../../schemas/wallet');
const tModel = require('../../schemas/transaction');
const fwModel = require('../../schemas/fiat_wallet');
const wHelper = require('../../helpers/wallet');
const walletService = require('../../lib/wallet');
const { getHash } = require('../../helpers');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON} login detail
 */
exports.login = async (req, res, next) => {
    try {
        let user = await uModel.loginUser(req.body, 'user');
        console.log(user)
        res.sendResponse(user, 200);
        // req.session.user = user;
        // req.session.save(console.log)
        // res.redirect('/users/dashboard');
    }
    catch (ex) {
        next(ex);
    }

};
/**
 * 
 * @param {String} user account name 
 * @param {String} password account password for ether
 * @returns {Object} wallet address
 */
const createMulitSigAddresses = async (user, password) => {
    let btc = await walletService.btc.createMultiSigWallet(user);
    let bch = await walletService.bch.createMultiSigWallet(user);
    let ltc = await walletService.ltc.createMultiSigWallet(user);
    let eth = await walletService.eth.createWallet(password);
    let xrp = await walletService.xrp.createWallet();
    return { btc, bch, ltc, eth, xrp };
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {} empty object with registration status
 */
exports.register = async (req, res, next) => {
    try {
        req.body.roles = 'user';
        // console.log(req.body);
        // return res.json(req.body);
        let user = await new uModel(req.body).save();
        // return res.json(req.body);
        let password = getHash(String(new Date().getTime()) + user._id);//password for ether
        let { btc, bch, ltc, eth, xrp } = await createMulitSigAddresses(user._id, password);
        let wallets = [];
        wallets.push({ type: 'multisig', name: user._id + '_wallet', user: user._id, coin_type: 'btc', redeemScript: btc.redeemScript, main_address: btc.address, addresses: [btc.address] });
        wallets.push({ type: 'multisig', name: user._id + '_wallet', user: user._id, coin_type: 'ltc', main_address: ltc, addresses: [ltc] });
        wallets.push({ type: 'multisig', name: user._id + '_wallet', user: user._id, coin_type: 'bch', main_address: bch, addresses: [bch] });
        wallets.push({ type: 'normal', name: user._id + '_wallet', password, user: user._id, coin_type: 'eth', main_address: eth, addresses: [eth] });
        wallets.push({ type: 'normal', name: user._id + '_wallet', password, user: user._id, coin_type: 'debc', main_address: eth, addresses: [eth] });
        wallets.push({ type: 'normal', name: user._id + '_wallet', password: xrp.secret, user: user._id, coin_type: 'xrp', main_address: xrp.address, addresses: [xrp.address] });
        await wModel.insertMany(wallets);
        res.sendResponse({}, 200, 'User has been registerd successfully.');
    }
    catch (ex) {
        next(ex);
    }
};
exports.dashboard = async (req, res, next) => {
    try {
        let wallets = await wModel.find({ user: req.session.user._id });
        res.render('users/dashboard', { pageTitle: 'Dashboard', layout: 'template', wallets, session: req.session.user });
    }
    catch (ex) {
        return next(ex);
    }
    // res.json(wallets);
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @return {JSON} wallets array
 */
exports.wallets = async (req, res, next) => {
    try {
        let wallets = await wModel.find({ user: req.user._id });
        res.sendResponse({ wallets }, 200, 'Wallets Fetched Successfully');
    }
    catch (ex) {
        return next(ex);
    }
    // res.json(wallets);
};
exports.receive = async (req, res, next) => {
    try {
        let wallets = await wModel.find({ user: req.session.user._id });
        console.log(wallets)
        // return res.json(wallets);
        res.render('users/receive', { pageTitle: 'Receive Crypto', layout: 'template', wallets, session: req.session.user });
    }
    catch (ex) {
        return next(ex);
    }
    // res.json(wallets);
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @return {JSON} transactions array
 */
exports.transaction = async (req, res, next) => {
    try {
        // let wallets = await wModel.find({ user: req.user._id });
        let transactions = await tModel.getMyTransactions(req.user._id);
        // console.log('TX = ', transactions)
        res.sendResponse({ transactions }, 200, 'Transaction fetched successfully')
    }
    catch (ex) {
        return next(ex);
    }
};

exports.send = async (req, res, next) => {
    try {
        let wallets = await wModel.find({ user: req.session.user._id });
        res.render('users/send', { pageTitle: 'Send Crypto', layout: 'template', wallets, session: req.session.user });
    }
    catch (ex) {
        return next(ex);
    }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON} return wallets array
 */
exports.refreshWallet = async (req, res, next) => {
    try {
        await updateWalletsAndGetBalance(req.user._id);
        let wallets = await wModel.find({ user: req.user._id });
        res.sendResponse({ wallets }, 200, 'Wallets refreshed successfully.');
    }
    catch (ex) {
        return next(ex);
    }
};
/**
 * 
 * @param {*} user account name or address
 * @returns {null}
 */
const updateWalletsAndGetBalance = async (user) => {

    let btc_balance = await walletService.btc.getBalance(user);
    let ltc_balance = await walletService.ltc.getBalance(user);
    let bch_balance = await walletService.bch.getBalance(user);
    let eth_wallet = await wModel.findOne({ user: user, coin_type: 'eth' });
    let xrp_wallet = await wModel.findOne({ user: user, coin_type: 'xrp' });
    let eth_balance = await walletService.eth.getBalance(eth_wallet.main_address);
    let debc_balance = await walletService.debc.getBalance(eth_wallet.main_address);
    let xrp_balance;
    try {
        xrp_balance = await walletService.xrp.getBalance(xrp_wallet.main_address);
    } catch (ex) {
        xrp_balance = 0;
    }

    await wModel.update({ user: user, coin_type: 'btc' }, { confirmed_amount: btc_balance });
    await wModel.update({ user: user, coin_type: 'ltc' }, { confirmed_amount: ltc_balance });
    await wModel.update({ user: user, coin_type: 'bch' }, { confirmed_amount: bch_balance });
    await wModel.update({ user: user, coin_type: 'eth' }, { confirmed_amount: eth_balance });
    await wModel.update({ user: user, coin_type: 'debc' }, { confirmed_amount: debc_balance });
    await wModel.update({ user: user, coin_type: 'xrp' }, { confirmed_amount: xrp_balance });

    return;
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON} transaction Object
 */
exports.transact = async (req, res, next) => {
    try {
        if (!req.body.coin_type) throw new Error('Coin Type is required.');
        let from, to = req.body.address, amount = req.body.amount, password;
        let coin_type = req.body.coin_type;
        let tx;
        from = await wModel.getAddresses(req.user._id, coin_type);
        tx = await wHelper.transferAmount(coin_type, from[coin_type].account || from[coin_type].address, to, amount, {
            password: from[coin_type].password
        });
        let transaction = new tModel();
        transaction.tx = tx;
        transaction.to_address = to;
        transaction.user = req.user._id;
        transaction.amount = amount;
        transaction.coin_type = coin_type;
        // await transaction.save();
        res.sendResponse({ transaction }, 200, 'Transaction is successfull.');
    }
    catch (ex) {
        next(ex);
    }
};

exports.notifyTransaction = async (req, res, next) => {
    try {
        let hpnedInOurWallet = await fwModel.find(req.body), fwObj;
        if (hpnedInOurWallet.length) {
            fwObj = await fwModel.update(req.body, { status: 'COMPLETED' });
        }
        else {
            let newTransactions = await wHelper.getTransaction(req.body.coin, req.body.txid);
            fwObj =await fwModel.insertMany(newTransactions);
        }
        res.json(fwObj);
    }
    catch (ex) {

    }
};