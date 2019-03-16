let wLib = require("../lib/wallet");
const transferAmount = async (coin_type, from, to, amount, options) => {
    console.log('TRANSFER AMOUNT OBJ = ', { coin_type, from, to, amount, options })
    switch (coin_type) {
        case 'btc':
            tx = await wLib.btc.transferAmount(from, to, amount);
            break;
        case 'ltc':
            amount = String(amount);
            tx = await wLib.ltc.transferAmount(from, to, amount);
            break;
        case 'bch':
            tx = await wLib.bch.transferAmount(from, to, amount);
            break;
        case 'eth':
            console.log('ETH OBJ = ', wLib.eth)
            tx = await wLib.eth.transferAmount(from, to, amount, { password: options.password });
            break;
        case 'debc':
            tx = await wLib.debc.transferAmount(from, to, amount, { password: options.password });
            break;
        case 'xrp':
            tx = await wLib.xrp.transferAmount(from, to, amount, { password: options.password });
            break;
        default:
            if (!coin_type) throw new Error('Invalid coin type.');
            break;
    }
    console.log('TX = ', tx);
    return tx;
};
const getTransaction = async (coin, txid) => {
    try {
        let fwArray = [];
        if (['btc', 'bch', 'ltc'].indexOf(coin) !== -1) {
            let tData = await wLib[coin].getTransaction(txid);
            console.log('tData = ', tData)
            tData.coin = coin;
            if (tData.details && tData.details.length) {
                tData.details.forEach(async (item) => {
                    let fw = {};
                    fw.type = item.category.toUpperCase();
                    fw.amount = 0;
                    fw.gateway = 'CRYPTO';
                    fw.coin = coin;
                    fw.crypto_amount = parseFloat(item.amount);
                    fw.user = item.account;
                    fw.txid = txid;
                    fw.confirmations = tData.confirmations;
                    fw.status = 'COMPLETED';
                    fwArray.push(fw);
                });
            }
            return fwArray;
        }
    }
    catch (ex) {
        console.log('TX WEB HOOKS ERROR = ', ex);
        return [];
    }
}
ETHSubscribe = () => {
    wLib.eth.subscribe(async (data) => {
        try {
            let item = data.transaction;
            let tx = data.tx;
            if (!item || !item.from || !item.to) return;
            let wallets = await wModel.find({ '$or': [{ main_address: item.from.toLowerCase() }, { main_address: item.to.toLowerCase() }], coin_type: 'eth' });
            wallets.forEach(async (wallet) => {
                let transaction = {};
                transaction.amount = item.value / 1000000000000000000;
                transaction.user = wallet.user;
                transaction.coin = 'eth';
                transaction.confirmations = item.confirmations;
                transaction.blockhash = item.blockHash;
                transaction.blockindex = item.blockNumber;
                transaction.txid = tx;
                transaction.hex = item.hash;
                await new tModel(transaction).save();
                let wallet_notify = await fwWallet.update({ txid: tx }, { status: 'COMPLETED' });
                console.log('\nNOTIFY ETHER TX ID = ', tx);
                console.log('\nNOTIFY ETHER TX = ', transaction);
                console.log('\nNOTIFY ETHER UPDATE TX = ', wallet_notify);
            });
        }
        catch (ex) {
            console.log('ETH ERROR = ', ex);
        }
    })
}
module.exports = { transferAmount, ETHSubscribe, getTransaction };