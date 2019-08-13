export default {
  COMMON: {
    BALANCE: 'Balance',
    BLOCK: 'Block',
    BLOCKS: 'Blocks',
    CONFIRMATIONS: 'Confirmations',
    DELEGATE: 'Delegate',
    DELEGATES: 'Delegates',
    FEE: 'Fee',
    HEIGHT: 'Height',
    ID: 'ID',
    LOADING: 'Loading...',
    NO_RESULTS: 'No results',
    RANK: 'Rank',
    RELOAD: 'Reload this page',
    SEE_ALL: 'See all',
    SUPPLY: 'Supply',
    SUPPLY_PERCENTAGE: 'Percentage of the total supply',
    TIMESTAMP: 'Timestamp',
    TRANSACTION: 'Transaction',
    TRANSACTIONS: 'Transactions',
    TYPE: 'Type',
    WALLETS: 'Wallets'
  },

  MARKET_CHART: {
    ERROR: 'The chart data could not be loaded',
    RELOAD: 'Reload chart',
    PRICE_IN: 'Price in',
    DAY: 'Day',
    WEEK: 'Week',
    MONTH: 'Month',
    QUARTER: 'Quarter',
    YEAR: 'Year',
    ALL_TIME: 'All time'
  },

  BLOCK: {
    ID: 'Block ID',
    PAGINATION: {
      NEXT: 'Next block',
      PREVIOUS: 'Previous block'
    },
    FEES: 'Fees',
    GENERATED_BY: 'Generated by',
    REWARD: 'Reward',
    PROCESSED_AMOUNT: 'Processed amount',
    TOTAL_FORGED: 'Total forged'
  },

  TRANSACTION: {
    AMOUNT: 'Amount',
    BLOCK_ID: 'Block ID',
    ID: 'Transaction ID',
    FEE: 'Fee',
    TYPE: 'Transaction type',
    TYPES: {
      ALL: 'All',
      TRANSFER: 'Transfer',
      SECOND_SIGNATURE: '2nd Signature Registration',
      DELEGATE_REGISTRATION: 'Delegate Registration',
      VOTE: 'Vote',
      UNVOTE: 'Unvote',
      MULTI_SIGNATURE: 'Multisignature Registration',
      IPFS: 'IPFS',
      TIMELOCK_TRANSFER: 'Timelock Transfer',
      MULTI_PAYMENT: 'Multipayment',
      DELEGATE_RESIGNATION: 'Delegate Resignation',
      SENT: 'Sent',
      RECEIVED: 'Received'
    },
    SENDER: 'Sender',
    RECIPIENT: 'Recipient',
    SMARTBRIDGE: 'Smartbridge',
    WELL_CONFIRMED: 'Well confirmed'
  },

  WALLET: {
    ADDRESS: 'Address',
    PUBLIC_KEY: 'Public key',
    VERIFIED: 'This is a verified address',
    VOTING_FOR: 'Voting for',
    BALANCE: 'Balance ({token})',
    SECOND_PASSPHRASE_ENABLED: 'Second signature enabled',
    SUMMARY: 'Wallet summary',
    QR_CODE: 'QR Code',
    SCAN_FOR_ADDRESS: 'Scan for address',
    DELEGATE: {
      FORGED_BLOCKS: 'Forged blocks',
      TOTAL_FORGED: 'Total forged',
      RANK: 'Rank',
      RANK_NOT_AVAILABLE: 'Not yet available',
      USERNAME: 'Username',
      VOTES: 'Votes',
      VOTERS: 'Voters',
      VOTER_THRESHOLD: 'Only voters with more than 0.1 {token}'
    }
  },

  SEARCH: {
    PLACEHOLDER: {
      SHORT: 'Search',
      LONG: 'Find a block, transaction, address or delegate'
    },
    NO_RESULTS: 'Nothing matched your search'
  },

  BUTTON_CLIPBOARD: {
    SUCCESS: 'Copied!',
    ERROR: 'Error!',
    COPY_TO_CLIPBOARD: 'Copy to clipboard'
  },

  PAGES: {
    ADVANCED_SEARCH: {
      TITLE: 'Advanced Search',
      RESULTS: 'Results'
    },
    HOME: {
      TITLE: 'Home',
      HEADER: 'Latest transactions and blocks',
      LATEST_TRANSACTIONS: 'Latest transactions',
      LATEST_BLOCKS: 'Latest blocks'
    },
    DELEGATE_MONITOR: {
      TITLE: 'Delegate Monitor',
      HEADER: {
        LAST_BLOCK: 'Last block',
        FORGED: 'Forged',
        TOTAL_FORGED: 'Total forged ({token})',
        TX_COUNT: 'from 0 transactions | from 1 transaction | from {count} transactions'
      },
      ACTIVE: 'Active',
      STANDBY: 'Standby',
      NEVER: 'Never',
      FORGED_BLOCKS: 'Forged blocks',
      LAST_FORGED: 'Last forged',
      STATS: {
        FORGED: 'Forged block recently',
        IN_QUEUE: 'In queue for forging',
        MISSED: 'Missed block',
        NOT_FORGING: 'Not forging'
      },
      STATUS: {
        TITLE: 'Status',
        FORGING: 'Forging',
        MISSING: 'Missing',
        NOT_FORGING: 'Not forging',
        NEVER_FORGED: 'Never forged'
      },
      VOTES: 'Votes',
      TOOLTIP: 'Last block @ {height} on'
    },
    TOP_WALLETS: {
      TITLE: 'Top Wallets'
    },
    NOT_FOUND: {
      TITLE: 'Ooops!',
      PAGE: 'Sorry, page not found',
      DATA: 'Sorry, {dataType} {dataId} could not be found on the blockchain'
    }
  },

  PAGINATION: {
    ALL: 'All',
    NEXT: 'Next',
    OF: 'of',
    PAGE: 'Page',
    PREVIOUS: 'Previous',
    ROWS_PER_PAGE: 'Rows per page',
    SHOW_MORE: 'Show more',
    PLACEHOLDER: {
      SHORT: 'Page #',
      LONG: 'Enter a page number'
    },
    NO_RESULTS: 'Invalid page number'
  },

  HEADER: {
    MENU: 'Menu',
    NETWORK: 'Network',
    MAIN: 'Main',
    DEVELOPMENT: 'Development',
    SUPPLY: 'Supply',
    MARKET_CAP: 'Market Cap'
  },

  FOOTER: {
    ALL_RIGHTS_RESERVED: 'All rights reserved',
    VERSION: 'Version',
    DATE: 'Date'
  }
}
