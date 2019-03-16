/**
 * It is library that helps creating addres, transfer amount
 * it supports btc, ltc and bch
 */
const RpcClient = require('./rpcclient');
const config = require('config');
const client = new RpcClient(config.get('ltc'));
/**
 * Create wallet function
 * @returns {String} Return address
 */

const createWallet = async () => {
    return await client.execute('getnewaddress');
};
/**
 * Create mulit signature wallet function
 * @param account {String} account name
 * @returns {String} Return multisig wallet address
 */
const createMultiSigWallet = async (account) => {
    if (!account) throw new Error('Account name is required.');
    let keys = [];
    keys.push(await createWallet());
    keys.push(await createWallet());
    return await client.execute('addmultisigaddress', [2, keys, account]);
};
/**
 * Create mulit signature wallet function
 * @param {String} account account name
 * @returns {Number} Return balance of particular address
 */
const getBalance = async (account) => {
    if (!account) throw new Error('Account name is required.');
    return await client.execute('getbalance', [account]);
};
/**
 * Create mulit signature wallet function
 * @param {String} from from account
 * @param {String} to to account
 * @param {String} amount amount to be sent
 * @param {Object} options will contain other options
 * @returns {String} Return transaction hex
 */
const transferAmount = async (from, to, amount, options) => {
    if (!from) throw new Error('from account is required.');
    if (!to) throw new Error('to account is required.');
    if (!amount) throw new Error('Amount is required.');
    return await client.execute('sendfrom', [from, to, amount]);
}
/**
 * @param {String} tx 
 * @return transaction object
 */
const getTransaction = async (tx) => {
    return await client.execute('gettransaction', [tx]);
}
module.exports = {
    createWallet
    , getBalance
    , transferAmount
    , createMultiSigWallet
    , getTransaction
};