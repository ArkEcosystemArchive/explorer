import { Network, NetworkConfig } from './models/network-config.model';

const mainNet: Network = {
  name: 'MAINNET',
  node: 'https://explorer.ark.io:8443/api',
  nethash: '6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988',
  currencies: ['ARK', 'BTC', 'USD', 'EUR', 'GBP', 'CNY', 'KRW'],
  knownAddresses: {
    'AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V': 'Binance',
    'AJbmGnDAx9y91MQCDApyaqZhn6fBvYX9iJ': 'Cryptopia',
    'ALgvTAoz5Vi9easHqBK6aEMKatHb4beCXm': 'ARK Shield',
    'AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv': 'ARK Team',
    'AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK': 'Bittrex',
    'AeUyEH2UGpYrwHAupBh7syFhWYSBNFAkap' : 'OKEx'
  },
  properties: {}
};

const devNet: Network = {
  name: 'DEVNET',
  node: 'https://dexplorer.ark.io:8443/api',
  nethash: '578e820911f24e039733b45e4882b73e301f813a0d2c31330dafda84534ffa23',
  currencies: ['DARK'],
  knownAddresses: {},
  properties: {
    disablePriceApi: true
  }
};

export const CONFIG: NetworkConfig = {
  activeNetwork: devNet,
  availableNetworks: [mainNet, devNet]
};
