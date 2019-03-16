const _isDev = window.location.port.indexOf('4200') > -1;

const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const TEST_NET =  true;
const apiURI = _isDev ? 'http://localhost:3000/api/' : `/api/`;
export const ENV = {
  BASE_URI: getHost(),
  BTC_EXPLORER: TEST_NET ? 'https://live.blockcypher.com/btc-testnet/tx/' : 'https://live.blockcypher.com/tx/',
  BCH_EXPLORER: TEST_NET ? 'https://www.blocktrail.com/BTC/tx/' : 'https://www.blocktrail.com/tBTC/tx/',
  LTC_EXPLORER: TEST_NET ? 'https://chain.so/tx/LTCTEST/' : 'https://chain.so/tx/LTC/',
  ETH_EXPLORER: TEST_NET ? 'https://ropsten.etherscan.io/tx/' : 'https://etherscan.io/tx/',
  BASE_API: apiURI,
  LOGIN_URI: apiURI + 'users/login',
  WALLET_URI: apiURI + 'users/wallets',
  TRANSACTION_URI: apiURI + 'users/transactions',
  SEND_MONEY_URI: apiURI + 'users/transact',
  REFRESH_WALLET_URI: apiURI + 'users/wallets/refresh',
  REGISTER_URI: apiURI + 'users/register',
  ADMIN_LOGIN_URI: apiURI + 'admin/login',
  ADMIN_USERS: apiURI + 'admin/users',
  ADMIN_PROFILE: apiURI + 'admin/profile',
  PROFILE: apiURI + 'users/profile',
  FORGOT_PASSWORD_URI: apiURI + 'forgotPassword',
  CW_WITHDRAW_AMOUNT: apiURI + 'users/currencyWallet/withdrawAmount',
  CW_DEPOSIT_AMOUNT: apiURI + 'users/currencyWallet/depositAmount',
  CW_SEND_AMOUNT: apiURI + 'users/currencyWallet/sendAmount',
  CW_BUY_CRYPTO: apiURI + 'users/currencyWallet/buyCrypto',
  CW_SELL_CRYPTO: apiURI + 'users/currencyWallet/sellCrypto',
  CW_GET_TRANSACTIONS: apiURI + 'users/currencyWallet/getTransactions',
  CW_GET_ADMIN_TRANSACTIONS: apiURI + 'admin/currencyWallet/getTransactions',
  CW_GET_ADMIN_WALLET: apiURI + 'admin/currencyWallet/getTransactions',
  CW_GET_ADMIN_COIN_LOOKUP: apiURI + 'admin/currencyWallet/getCurrencyLookup',
  CW_GET_ADMIN_UPDATE_COIN_LOOKUP: apiURI + 'admin/currencyWallet/updateCurrencyLookup'
};
