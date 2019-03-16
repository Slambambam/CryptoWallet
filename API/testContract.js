// let Web3 = require('web3');
// var web3 = new Web3();
// let config = {
//     'testnet': {
//         'address': '0x8b96630a278de6f721361b7509c42b3f73e7ce3e',
//         'password': '$2a$10$oxI//wEXWka0xpRRAh1QBuvJt0vYRQvavUiIjuuaUQp9/FCmMwGX2',
//         'unlocktime': 5000,
//         'uri': 'ws://159.203.67.241:8546',
//         'contract': '0x499121e9367b3c7d52f41315cd8606691b088d26'
//     },
//     'mainnet': {
//         'address': '0xe74a18388e647D9e6b96C14190BA022B9194F774',
//         'password': '123456',
//         'unlocktime': 5000,
//         'uri': 'ws://localhost:8546',
//         'contract': '0x74650a7D75cb3996A0e03aD2d92e5bfCA30B0a27'
//     }
// };
// let configEnabled = config['testnet'];
// web3.setProvider(configEnabled.uri);
// let abi = require('./config/debc');
// console.log(Web3.utils.toWei('1', 'ether'))



// web3.eth.personal.unlockAccount(configEnabled.address, configEnabled.password, configEnabled.unlocktime, async () => {
//     let myContract = new web3.eth.Contract(abi, configEnabled.contract, {
//         from: configEnabled.address,
//         gas: 50000
//     });
//     let a = await new Promise(function (resolve, reject) {
//         myContract.methods.balanceOf('0x2c1f74707328015f8159d6337953f64d03cf69d8').call(function (err, res) {
//             if (err) reject(err);
//             else resolve(res);
//         });
//     });
//     // let a = await myContract.methods.balanceOf('0x2c1f74707328015f8159d6337953f64d03cf69d8');
//     console.log(a)
//     // myContract.methods.transfer('0x2c1f74707328015f8159d6337953f64d03cf69d8', 1).send(console.log)
//     // web3.eth.call({
//     //     to: configEnabled.address, // Contract address, used call the token balance of the address in question
//     //     data: contractData // Combination of contractData and tknAddress, required to call the balance of an address 
//     // }, console.log)
//     // new web3.eth.getBalance('0x2c1f74707328015f8159d6337953f64d03cf69d8', console.log)
// });




// // web3.eth.getBlock("latest", console.log);
// // web3.eth.personal.unlockAccount('0xe74a18388e647D9e6b96C14190BA022B9194F774', '123456', 5000, () => {
// //     let myContract = new web3.eth.Contract(abi, '0x74650a7D75cb3996A0e03aD2d92e5bfCA30B0a27', {
// //         from: '0xe74a18388e647D9e6b96C14190BA022B9194F774',
// //         gas: '5000',
// //         gasPrice: '5000'
// //     });
// //     myContract.methods.transfer('0xe74a18388e647D9e6b96C14190BA022B9194F774', 1).send(console.log)
// // })
// // console.log( String(Web3.utils.toWei('1','ether')))

// // myContract.events.Transfer({filter:}, console.log)

// // myContract.events.allEvents({event:'Transfer'}, console.log)
let debc = require('./lib/debc');
(async () => {
    // let a = await debc.getBalance('0x303cf7c339beb1260b838521ab503d52d9091c11');
    let b = await debc.transferAmount('0x0e8ee62b7f2657999b01ccee56a4b88dc876ddc3', '$2a$10$r1C/09gRN6kJYOCMFQBpMuoZloz/dSzY7RNr5I1suJsi8jDeyJUOW', {
        address: '0x303cf7c339beb1260b838521ab503d52d9091c11',
        amount: '5'
    })
    console.log(a)
})();