

let mongoose = require('mongoose');
let config = require('config');
mongoose.connect(config.get('dbConnection'));
const fiat = require('./schemas/fiat_wallet');
(async() => {
    // await fiat.remove({});
    const stored = await fiat.depositAmount('5aa282dd56d4801e07f386da', 10000, 'STRIPE', '5aa282dd56d4801e07f386da', 'COMPLETED');
   
    // console.log('STORED',  stored);
    
    // const spend = await fiat.buyCrypto('5aa282dd56d4801e07f386da', 500000000, 'btc', 0.01);
    // console.log('FETCHED',  spend);
    const spend = await fiat.withdrawAmount('5aa282dd56d4801e07f386da', 50);
    console.log('FETCHED',  spend);


     const fetched = await fiat.amountInWallet('5aa282dd56d4801e07f386da');
     console.log('FETCHED',  fetched);
})();