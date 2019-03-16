let wallet = require('./lib/wallet');
// console.log(wallet.xrp.createWallet())
// (async()=> {
try {
    setTimeout(async () => {
        let transaction = await wallet.xrp.transferAmount('rE9bEUs9HHGbpxAyAhgat2yJjejJa3VcDp', 'rhkqJVHcJi6f31G6jzQW9akz87xJMkUBg3', '9900', {
            password: 'sskB17yMz9cjGyJNRVjHoowDpBaZ7'
        });
        console.log('TRANSACTION', transaction);
        let balance = await wallet.xrp.getBalance('rhkqJVHcJi6f31G6jzQW9akz87xJMkUBg3');
        console.log('BALANCE', balance);
    }, 10000)
}
catch (ex) {
    console.log(ex.message);
}

// })();