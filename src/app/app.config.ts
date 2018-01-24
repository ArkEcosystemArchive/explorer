export const CONFIG = {
    NETWORK: 'DEVNET',

    NETWORKS: {
      MAINNET: {
        NODE: 'https://explorer.ark.io:8443/api',
        NETHASH: '6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988',
        CURRENCIES: ['ARK', 'BTC', 'USD', 'EUR', 'GBP', 'CNY', 'KRW'],
        KNOWN_ADDRESSES: {
          'AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V' : 'Binance',
          'AJbmGnDAx9y91MQCDApyaqZhn6fBvYX9iJ' : 'Cryptopia',
          'ALgvTAoz5Vi9easHqBK6aEMKatHb4beCXm' : 'ARK Shield',
          'AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv' : 'ARK Team',
          'AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK' : 'Bittrex',
          'AeUyEH2UGpYrwHAupBh7syFhWYSBNFAkap' : 'OKEx',
        },
        PROPERTIES: [],
      },
      DEVNET: {
        NODE: 'https://dexplorer.ark.io:8443/api',
        NETHASH: '578e820911f24e039733b45e4882b73e301f813a0d2c31330dafda84534ffa23',
        CURRENCIES: ['DARK'],
        KNOWN_ADDRESSES: {},
        PROPERTIES: [
          'DISABLE_PRICE_API',
        ],
      }
    },
};
