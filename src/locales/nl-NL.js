export default {
  COMMON: {
    BALANCE: 'Balans',
    BLOCK: 'Block',
    BLOCKS: 'Blocks',
    CONFIRMATIONS: 'Confirmaties',
    DELEGATE: 'Afgevaardigde',
    DELEGATES: 'Afgevaardigden',
    FEE: 'Kosten',
    HEIGHT: 'Hoogte',
    ID: 'ID',
    NO_RESULTS: 'Geen Resultaten',
    RANK: 'Rang',
    RELOAD: 'Ververs deze pagina',
    SEE_ALL: 'Zie alle',
    SUPPLY: 'Voorraad',
    SUPPLY_PERCENTAGE: 'Percentage van de totale voorraad',
    TIMESTAMP: 'Timestamp',
    TRANSACTION: 'Transactie',
    TRANSACTIONS: 'Transacties',
    TYPE: 'Type'
  },

  MARKET_CHART: {
    ERROR: 'De diagram kunnen niet worden geladen',
    RELOAD: 'Herladen diagram',
    PRICE: 'Prijs',
    VOLUME: 'Volume',
    DAY: 'Dag',
    WEEK: 'Week',
    MONTH: 'Maand',
    QUARTER: 'Kwartaal',
    YEAR: 'Jaar',
    ALL_TIME: 'Altijd'
  },

  BLOCK: {
    ID: 'Block ID',
    PAGINATION: {
      NEXT: 'Volgende block',
      PREVIOUS: 'Vorige block'
    },
    FEES: 'Kosten',
    GENERATED_BY: 'Gegenereerd door',
    REWARD: 'Beloning',
    PROCESSED_AMOUNT: 'Verwerkte hoeveelheid',
    TOTAL_FORGED: 'Totaal gemaakt'
  },

  TRANSACTION: {
    AMOUNT: 'Hoeveelheid',
    BLOCK_ID: 'Block ID',
    ID: 'Transactie ID',
    FEE: 'Kosten',
    TYPE: 'Transactie Type',
    TYPES: {
      ALL: 'Alles',
      TRANSFER: 'Transfer',
      SECOND_SIGNATURE: 'Registratie 2e Handtekening',
      DELEGATE_REGISTRATION: 'Registratie Afgevaardigde',
      VOTE: 'Stem',
      UNVOTE: 'Stem weggehaald',
      MULTI_SIGNATURE: 'Registratie Multisignature',
      IPFS: 'IPFS',
      TIMELOCK_TRANSFER: 'Timelock Transfer',
      MULTI_PAYMENT: 'Multipayment',
      DELEGATE_RESIGNATION: 'Aftreden Afgevaardigde',
      SENT: 'Verzonden',
      RECEIVED: 'Ontvangen'
    },
    SENDER: 'Verzender',
    RECIPIENT: 'Ontvanger',
    SMARTBRIDGE: 'Smartbridge',
    WELL_CONFIRMED: 'Goed bevestigd'
  },

  WALLET: {
    ADDRESS: 'Adres',
    PUBLIC_KEY: 'Public key',
    VERIFIED: 'Dit is een geverifieerd adres',
    VOTING_FOR: 'Stemt voor',
    BALANCE: 'Balans ({token})',
    SECOND_PASSPHRASE_ENABLED: '2e Handtekening Ingeschakeld',
    SUMMARY: 'Wallet samenvatting',
    QR_CODE: 'QR Code',
    SCAN_FOR_ADDRESS: 'Scan voor Adres',
    DELEGATE: {
      FORGED_BLOCKS: 'Blocks geforged',
      TOTAL_FORGED: 'Totaal geforged',
      RANK: 'Rang',
      RANK_NOT_AVAILABLE: 'Nog niet beschikbaar',
      USERNAME: 'Gebruikersnaam',
      VOTES: 'Stemmen',
      VOTERS: 'Stemmers',
      VOTER_THRESHOLD: 'Alleen stemmers met meer dan 0.1 {token}'
    }
  },

  SEARCH: {
    PLACEHOLDER: {
      SHORT: 'Zoeken',
      LONG: 'Vind een block, transactie, adres of afgevaardigde'
    },
    NO_RESULTS: 'We konden niets vinden'
  },

  BUTTON_CLIPBOARD: {
    SUCCESS: 'Gekopieerd!',
    ERROR: 'Fout!',
    COPY_TO_CLIPBOARD: 'Kopieer naar klembord'
  },

  PAGES: {
    HOME: {
      TITLE: 'Home',
      HEADER: 'Laatste transacties en blocks',
      LATEST_TRANSACTIONS: 'Laatste Transacties',
      LATEST_BLOCKS: 'Laatste Blocks'
    },
    DELEGATE_MONITOR: {
      TITLE: 'Afgevaardigde Monitor',
      HEADER: {
        LAST_BLOCK: 'Laatste block',
        FORGED: 'Geforged',
        TOTAL_FORGED: 'Totaal geforged ({token})',
        TX_COUNT: 'van 0 transacties | van 1 transactie | van {count} transacties'
      },
      ACTIVE: 'Actief',
      STANDBY: 'Standby',
      NEVER: 'Nooit',
      FORGED_BLOCKS: 'Blocks geforged',
      LAST_FORGED: 'Laatst geforged',
      STATS: {
        FORGED: 'Recentelijk block geforged',
        IN_QUEUE: 'In de rij om te forgen',
        MISSED: 'Block gemist',
        NOT_FORGING: 'Niet aan het forgen'
      },
      STATUS: {
        TITLE: 'Status',
        FORGING: 'Aan het forgen',
        MISSING: 'Missend',
        NOT_FORGING: 'Niet aan het forgen',
        NEVER_FORGED: 'Nooit geforged'
      },
      VOTES: 'Stemmen',
      TOOLTIP: 'Laatste block @ {height} aan'
    },
    TOP_WALLETS: {
      TITLE: 'Top Wallets'
    },
    NOT_FOUND: {
      TITLE: 'Ooops!',
      PAGE: 'Sorry, pagina niet gevonden',
      DATA: 'Sorry, {dataType} {dataId} kon niet worden gevonden op de blockchain'
    }
  },

  PAGINATION: {
    ALL: 'Alles',
    NEXT: 'Volgende',
    OF: 'Van',
    PAGE: 'Pagina',
    PREVIOUS: 'Vorige',
    ROWS_PER_PAGE: 'Rijen per pagina',
    SHOW_MORE: 'Meer laden',
    PLACEHOLDER: {
      SHORT: 'Pagina #',
      LONG: 'Voer een paginanummer in'
    },
    NO_RESULTS: 'Ongeldig paginanummer'
  },

  HEADER: {
    MENU: 'Menu',
    NETWORK: 'Netwerk',
    MAIN: 'Main',
    DEVELOPMENT: 'Ontwikkeling',
    SUPPLY: 'Voorraad',
    MARKET_CAP: 'Market Cap'
  },

  FOOTER: {
    ALL_RIGHTS_RESERVED: 'Alle rechten voorbehouden',
    VERSION: 'Versie',
    DATE: 'Datum'
  }
}
