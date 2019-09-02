export default {
  COMMON: {
    BALANCE: 'Saldo',
    BLOCK: 'Blocco',
    BLOCKS: 'Blocchi',
    CONFIRMATIONS: 'Conferme',
    DELEGATE: 'Delegato',
    DELEGATES: 'Delegati',
    FEE: 'Commissione',
    HEIGHT: 'Altezza',
    ID: 'ID',
    NO_RESULTS: 'Nessun risultato',
    RANK: 'Rango',
    RELOAD: 'Ricarica questa pagina',
    SEE_ALL: 'Vedi tutto',
    SUPPLY: 'Distribuzione',
    SUPPLY_PERCENTAGE: 'Percentuale della distribuzione totale',
    TIMESTAMP: 'Timestamp',
    TRANSACTION: 'Transazione',
    TRANSACTIONS: 'Transazioni',
    TYPE: 'Tipo'
  },

  MARKET_CHART: {
    ERROR: 'I dati del grafico non possono essere caricati',
    RELOAD: 'Ricarica grafico',
    PRICE: 'Prezzo',
    VOLUME: 'Volume',
    DAY: 'Giorno',
    WEEK: 'Settimana',
    MONTH: 'Mese',
    QUARTER: 'Trimestre',
    YEAR: 'Anno',
    ALL_TIME: 'Sempre'
  },

  BLOCK: {
    ID: 'ID blocco',
    PAGINATION: {
      NEXT: 'Prossimo blocco',
      PREVIOUS: 'Blocco precedente'
    },
    FEES: 'Commissioni',
    GENERATED_BY: 'Generato da',
    REWARD: 'Ricompensa',
    PROCESSED_AMOUNT: 'Importo processato',
    TOTAL_FORGED: 'Totale forgiato'
  },

  TRANSACTION: {
    AMOUNT: 'Importo',
    BLOCK_ID: 'ID blocco',
    ID: 'ID transazione',
    FEE: 'Fee',
    TYPE: 'Tipo transazione',
    TYPES: {
      ALL: 'Tutto',
      TRANSFER: 'Trasferimento',
      SECOND_SIGNATURE: 'Registrazione 2ª Firma',
      DELEGATE_REGISTRATION: 'Registrazione Delegato',
      VOTE: 'Voto',
      UNVOTE: 'Voto rimosso',
      MULTI_SIGNATURE: 'Registrazione Multisignature',
      IPFS: 'IPFS',
      TIMELOCK_TRANSFER: 'Trasferimento Timelock',
      MULTI_PAYMENT: 'Pagamento multiplo',
      DELEGATE_RESIGNATION: 'Dimissione Delegato',
      SENT: 'Inviato',
      RECEIVED: 'Ricevuto'
    },
    SENDER: 'Mittente',
    RECIPIENT: 'Destinatario',
    SMARTBRIDGE: 'Smartbridge',
    WELL_CONFIRMED: 'Ben confermata'
  },

  WALLET: {
    ADDRESS: 'Indirizzo',
    PUBLIC_KEY: 'Chiave pubblica',
    VERIFIED: 'Questo è un indirizzo verificato',
    VOTING_FOR: 'Vota per',
    BALANCE: 'Saldo ({token})',
    SECOND_PASSPHRASE_ENABLED: 'Seconda firma abilitata',
    SUMMARY: 'Sommario portafoglio',
    QR_CODE: 'Codice QR',
    SCAN_FOR_ADDRESS: 'Scannerizza per l\'indirizzo',
    DELEGATE: {
      FORGED_BLOCKS: 'Blocchi forgiati',
      TOTAL_FORGED: 'Totale forgiato',
      RANK: 'Rango',
      RANK_NOT_AVAILABLE: 'Non ancora disponibile',
      USERNAME: 'Username',
      VOTES: 'Voti',
      VOTERS: 'Votanti',
      VOTER_THRESHOLD: 'Solo votanti con più di 0.1 {token}'
    }
  },

  SEARCH: {
    PLACEHOLDER: {
      SHORT: 'Cerca',
      LONG: 'Trova un blocco, transazione, indirizzo o delegato'
    },
    NO_RESULTS: 'Niente corrisponde alla tua ricerca'
  },

  BUTTON_CLIPBOARD: {
    SUCCESS: 'Copiato!',
    ERROR: 'Errore!',
    COPY_TO_CLIPBOARD: 'Copia negli appunti'
  },

  PAGES: {
    HOME: {
      TITLE: 'Home',
      HEADER: 'Ultime transazioni e blocchi',
      LATEST_TRANSACTIONS: 'Ultime transazioni',
      LATEST_BLOCKS: 'Ultimi blocchi'
    },
    DELEGATE_MONITOR: {
      TITLE: 'Monitor Delegati',
      HEADER: {
        LAST_BLOCK: 'Ultimo blocco',
        FORGED: 'Forgiato',
        TOTAL_FORGED: 'Totale forgiato ({token})',
        TX_COUNT: 'di 0 transazioni | di 1 transazione | di {count} transazioni'
      },
      ACTIVE: 'Attivo',
      STANDBY: 'In attesa',
      NEVER: 'Mai',
      FORGED_BLOCKS: 'Blocchi forgiati',
      LAST_FORGED: 'Ultimo fiorgiato',
      STATS: {
        FORGED: 'Blocco forgiato recentemente',
        IN_QUEUE: 'In coda per la forgiatura',
        MISSED: 'Blocco perso',
        NOT_FORGING: 'Non sta forgiando'
      },
      STATUS: {
        TITLE: 'Stato',
        FORGING: 'Sta forgiando',
        MISSING: 'Sta mancando',
        NOT_FORGING: 'Non sta forgiando',
        NEVER_FORGED: 'Mai fiorgiato'
      },
      VOTES: 'Voti',
      TOOLTIP: 'Ultimo blocco @ {height}'
    },
    TOP_WALLETS: {
      TITLE: 'Portafogli Maggiori'
    },
    NOT_FOUND: {
      TITLE: 'Ooops!',
      PAGE: 'Spiacente, pagina non trovata',
      DATA: 'Spiacente, {dataType} {dataId} non può essere trovato nella blockchain'
    }
  },

  PAGINATION: {
    ALL: 'All',
    NEXT: 'Prossimo',
    OF: 'Di',
    PAGE: 'Pagina',
    PREVIOUS: 'Precedente',
    ROWS_PER_PAGE: 'Righe per pagina',
    SHOW_MORE: 'Mostra di più',
    PLACEHOLDER: {
      SHORT: '# di pagina',
      LONG: 'Inserisci un numero di pagina'
    },
    NO_RESULTS: 'Numero di pagina non valido'
  },

  HEADER: {
    MENU: 'Menu',
    NETWORK: 'Rete',
    MAIN: 'Principale',
    DEVELOPMENT: 'Sviluppo',
    SUPPLY: 'Distribuzione',
    MARKET_CAP: 'Capitalizzazione di mercato'
  },

  FOOTER: {
    ALL_RIGHTS_RESERVED: 'Tutti i diritti riservati',
    VERSION: 'Versione',
    DATE: 'Data'
  }
}
