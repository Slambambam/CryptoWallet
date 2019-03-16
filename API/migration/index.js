const coinLookup = require('../schemas/coin_lookup');
const sModel = require('../schemas/settings');
const coinStore = [
    {
        coin: 'btc',
        buy_amount: 500,
        sell_amount: 500,
        status: true
    },
    {
        coin: 'bch',
        buy_amount: 400,
        sell_amount: 400,
        status: true
    },
    {
        coin: 'ltc',
        buy_amount: 300,
        sell_amount: 300,
        status: true
    },
    {
        coin: 'eth',
        buy_amount: 200,
        sell_amount: 200,
        status: true
    },
    {
        coin: 'debc',
        buy_amount: 100,
        sell_amount: 100,
        status: true
    },
    {
        coin: 'xrp',
        buy_amount: 100,
        sell_amount: 100,
        status: true
    }
];
coinLookup.remove({}).then(() => {
    coinLookup.insertMany(coinStore).then(console.log);
});


const Settings = [
    {
        key: 'admin_email',
        value: 'james@bitexchange.systems'
    },
    {
        key: 'contact_email',
        value: 'james@bitexchange.systems'
    },
    {
        key: 'site_name',
        value: 'Bit Exchange'
    },
    {
        key: 'admin_btc',
        value: {
            account: '5ad457545119040985edac28',
            address: '2N128TXrXouiABVgYFYpm1ivWQNF489icmv'
        }
    },
    {
        key: 'admin_bch',
        value: {
            account: '5ad457545119040985edac28',
            address: 'bchtest:prs0zqfzxsetf9n76d3q4q70xea2qygusup2ke22wn'
        }
    },
    {
        key: 'admin_ltc',
        value: {
            account: '5ad457545119040985edac28',
            address: 'QdXb8AGi2bgAZbARV9EjEcsqgohTqUD4io'
        }
    },
    {
        key: 'admin_eth',
        value: {
            address: '0xb9c85eb3dadf4e60d77f827011506a1e791e7efa',
            password: '$2a$10$PllLARju3C/B7zChtzsSj.bhfEcsNWmfeJaYxNx4E8JBWh6HP9ZSq'
        }
    },
    {
        key: 'admin_xrp',
        value: {
            address: 'rhkqJVHcJi6f31G6jzQW9akz87xJMkUBg3',
            password: 'snciXJfjvSgDx62vfBgzHDr8hgXXa'
        }
    },
    {
        key: 'btc_configuration',
        value: {
            "protocol": "http",
            "path": "/",
            "port": 18222,
            "host": "159.65.165.32",
            "username": "bit_user",
            "password": "64b7dd9f23f4b2e9e3a4f25526018e88"
        }
    },
    {
        key: 'bch_configuration',
        value: {
            "protocol": "http",
            "path": "/",
            "port": 18222,
            "host": "159.65.253.14",
            "username": "bit_user",
            "password": "64b7dd9f23f4b2e9e3a4f25526018e88"
        }
    },
    {
        key: "xrp_configuration",
        value: {
            "protocol": "wss",
            "path": "/",
            "port": 51233,
            "host": "s.altnet.rippletest.net",
            "username": "",
            "password": "",
            "uri": "wss://s.altnet.rippletest.net:51233"
        }
    },
    {
        key: "ltc_configuration",
        value: {
            "protocol": "http",
            "path": "/",
            "port": 18222,
            "host": "159.203.121.126",
            "username": "bit_user",
            "password": "64b7dd9f23f4b2e9e3a4f25526018e88"
        }
    },
    {
        key: "eth_configuration",
        value: {
            "protocol": "http",
            "path": "/eth",
            "port": 80,
            "host": "159.203.67.241",
            "wsPort": 8546,
            "username": "bit_user",
            "password": "64b7dd9f23f4b2e9e3a4f25526018e88"
        }
    }
];
sModel.remove({}).then(() => {
    sModel.insertMany(Settings).then(console.log);
    sModel.getSettings('admin_email').then(console.log);
});
