
let config = require('config');
let Web3 = require('web3');
let web3 = new Web3(config.get('contracts.debc.web3Uri'));
const getContract = (from) => {
    return new web3.eth.Contract(
        require('../config/debc.json'),
        config.get('contracts.debc.address'),
        { gas: config.get('contracts.debc.gas'), from }
    );
};
const getBalance = async (address) => {
    const ctx = getContract(address);
    console.log("BALANCE OF = ", address);
    const promise = await new Promise((rs, rj) => {
        ctx.methods.balanceOf(address).call(function (err, res) {
            console.log("BALANCE OF ERRR= ", err.message)
            if (err) rs(0);
            else {
                res = res / 100000000;
                rs(res);
            }
        });
    });
    return promise;
};
const unlockAddress = async (address, password) => {
    return await await new Promise((rs, rj) => {
        web3.eth.personal.unlockAccount(
            address,
            password,
            config.get('contracts.debc.unlocktime'),
            async (err, res) => {
                if (err) rj(err);
                else rs(res);
            })
    });
};
const transferAmount = async (address, pwd, options) => {
    const ctx = getContract(address);
    const unlocked = await unlockAddress(address, pwd);
    const promise = new Promise((rs, rj) => {
        ctx.methods.transfer(options.address, 100000000 * (options.amount)).send(function (err, res) {
            if (err) rj(err);
            else rs(res);
        });
    });
    return promise;
};
module.exports = { getBalance, transferAmount };