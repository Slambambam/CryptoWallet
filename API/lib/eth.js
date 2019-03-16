/**
 * It is library that helps creating addres, transfer amount
 * it supports ether
 */
const RpcClient = require('./rpcclient');
const config = require('config');
let { convertETH } = require('cryptocurrency-unit-convert');
let hexToDec = require('hex-to-dec')
let { convert } = require('../helpers/index')
let { dec2hex } = convert;
let Web3 = require('web3');
let web3 = new Web3(config.get('contracts.debc.web3Uri'));
const client = new RpcClient(config.get('eth'));

/**
 * Create wallet function
 * @param {String} coin currnecy name
 * @param {String} password wallet password. for now we are creating it dynamically
 * @returns {String} Return address
 */
const createWallet = async (password) => {
    if (!password) throw new Error('Password is required.');
    return await client.execute('personal_newAccount', [password]);
};
const createMultiSigWallet = async (coin, account) => {
    if (!account) throw new Error('Account name is required.');
    if (!coin) throw new Error('Coin is required.');
    let keys = [];
    keys.push(await createWallet(coin));
    keys.push(await createWallet(coin));
    // client.execute('setaccount', [account, keys[0]])
    // client.execute('setaccount', [account, keys[1]])
    return await client.execute('addmultisigaddress', [2, keys, account]);
};
/**
 * Create mulit signature wallet function
 * @param {String} coin currnecy name
 * @param {String} address account name
 * @returns {String} Return balance of particular address
 */
const getBalance = async (address) => {
    if (!address) throw new Error('Address is required.');
    let eth_balance = await client.execute('eth_getBalance', [address, 'latest']);
    return convertETH(hexToDec(eth_balance), 'wei', 'eth');
};
/**
 * Create mulit signature wallet function
 * @param {String} coin currnecy name
 * @param {String} from from address
 * @param {Object} options option will contain address, amount and password
 * @returns {String} Return transaction hex
 */
const transferAmount = async (from, to, amount, options) => {
    if (!from) throw new Error('From address is required.');
    if (!to) throw new Error('Address is required.');
    if (!amount) throw new Error('Amount is required.');
    if (!options.password) throw new Error('Eth Password is required.');
    let tx = { from, to, value: '0x' + dec2hex(convertETH(amount, 'eth', 'wei')) };
    let result = await client.execute('personal_sendTransaction', [tx, options.password]);
    // console.log('ETH RESULT = ', result);
    return result;
}
const subscribe = (cb) => {
    web3.eth.subscribe('pendingTransactions', () => { }).on("data", (trxData) => {
        web3.eth.getTransaction(trxData).then((data) => {
            cb({ tx: trxData, transaction: data });
        });
    });
};
module.exports = { createWallet, getBalance, transferAmount, createMultiSigWallet, subscribe };