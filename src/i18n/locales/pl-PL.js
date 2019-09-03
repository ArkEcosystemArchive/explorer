export default {
  COMMON: {
    BALANCE: 'Saldo',
    BLOCK: 'Blok',
    BLOCKS: 'Bloki',
    CONFIRMATIONS: 'Potwierdzeń',
    DELEGATE: 'Delegat',
    DELEGATES: 'Delegaci',
    FEE: 'Opłata',
    HEIGHT: 'Wysokość',
    ID: 'ID',
    NO_RESULTS: 'Brak wyników',
    RANK: 'L.p.',
    RELOAD: 'Odśwież stronę',
    SEE_ALL: 'Zobacz wszystko',
    SUPPLY: 'Zasoby',
    SUPPLY_PERCENTAGE: 'Odsetek zasobów ogółem',
    TIMESTAMP: 'Znacznik czasu',
    TRANSACTION: 'Transakcja',
    TRANSACTIONS: 'Transakcje',
    TYPE: 'Typ'
  },

  MARKET_CHART: {
    ERROR: 'Nie można załadować danych wykresu',
    RELOAD: 'Przeładuj wykres',
    PRICE: 'Cena',
    VOLUME: 'Wolumen',
    DAY: 'Dzień',
    WEEK: 'Tydzień',
    MONTH: 'Miesiąc',
    QUARTER: 'Kwartał',
    YEAR: 'Rok',
    ALL_TIME: 'Wszystko'
  },

  BLOCK: {
    ID: 'ID bloku',
    PAGINATION: {
      NEXT: 'Następny blok',
      PREVIOUS: 'Poprzedni blok'
    },
    FEES: 'Opłacono',
    GENERATED_BY: 'Wygenerowany przez',
    REWARD: 'Nagroda',
    PROCESSED_AMOUNT: 'Przetworzona kwota',
    TOTAL_FORGED: 'Łącznie wytworzono'
  },

  TRANSACTION: {
    AMOUNT: 'Ilość',
    BLOCK_ID: 'ID bloku',
    ID: 'ID transakcji',
    FEE: 'Opłata',
    TYPE: 'Typ transakcji',
    TYPES: {
      ALL: 'Wszystko',
      TRANSFER: 'Transfer',
      SECOND_SIGNATURE: 'Rejestracja Drugiego Podpisu',
      DELEGATE_REGISTRATION: 'Rejestracja Delegata',
      VOTE: 'Głos',
      UNVOTE: 'Cofnięcie głosu',
      MULTI_SIGNATURE: 'Rejestracja Multisygnatury',
      IPFS: 'IPFS',
      TIMELOCK_TRANSFER: 'Opóźniony transfer',
      MULTI_PAYMENT: 'Multipłatność',
      DELEGATE_RESIGNATION: 'Rezygnacja Delegata',
      SENT: 'Wysłano',
      RECEIVED: 'Otrzymano'
    },
    SENDER: 'Nadawca',
    RECIPIENT: 'Odbiorca',
    SMARTBRIDGE: 'Smartbridge',
    WELL_CONFIRMED: 'Dobrze Potwierdzona'
  },

  WALLET: {
    ADDRESS: 'Adres',
    PUBLIC_KEY: 'Klucz publiczny',
    VERIFIED: 'To jest zweryfikowany adres',
    VOTING_FOR: 'Głosy dla',
    BALANCE: 'Saldo ({token})',
    SECOND_PASSPHRASE_ENABLED: 'Aktywowany Drugi Podpis',
    SUMMARY: 'Podsumowanie Portfela',
    QR_CODE: 'Kod QR',
    SCAN_FOR_ADDRESS: 'Zeskanuj adres',
    DELEGATE: {
      FORGED_BLOCKS: 'Wydobytych bloków',
      TOTAL_FORGED: 'Łącznie wydobyto',
      RANK: 'L.p.',
      RANK_NOT_AVAILABLE: 'Jeszcze nie dostępne',
      USERNAME: 'Nazwa Użytkownika',
      VOTES: 'Głosy',
      VOTERS: 'Wyborcy',
      VOTER_THRESHOLD: 'Tylko wyborcy posiadający więcej niż 0,1 {token}'
    }
  },

  SEARCH: {
    PLACEHOLDER: {
      SHORT: 'Wyszukaj',
      LONG: 'Znajdź blok, transakcję, adres lub delegata'
    },
    NO_RESULTS: 'Brak wyników'
  },

  BUTTON_CLIPBOARD: {
    SUCCESS: 'Skopiowano!',
    ERROR: 'Błąd!',
    COPY_TO_CLIPBOARD: 'Skopiuj do schowka'
  },

  PAGES: {
    HOME: {
      TITLE: 'Strona główna',
      HEADER: 'Najnowsze transakcje i bloki',
      LATEST_TRANSACTIONS: 'Najnowsze transakcje',
      LATEST_BLOCKS: 'Najnowsze bloki'
    },
    DELEGATE_MONITOR: {
      TITLE: 'Monitor delegatów',
      HEADER: {
        LAST_BLOCK: 'Ostatni blok',
        FORGED: 'Wydobyto',
        TOTAL_FORGED: 'Łącznie wydobyto ({token})',
        TX_COUNT: 'z {count} transakcji'
      },
      ACTIVE: 'Aktywni',
      STANDBY: 'Oczekujący',
      NEVER: 'Nigdy',
      FORGED_BLOCKS: 'Wydobytych bloków',
      LAST_FORGED: 'Ostatnie wydobycie',
      STATS: {
        FORGED: 'Niedawno wydobyło blok',
        IN_QUEUE: 'W kolejce do wydobycia',
        MISSED: 'Przeoczyło blok',
        NOT_FORGING: 'Nie wydobywa'
      },
      STATUS: {
        TITLE: 'Status',
        FORGING: 'Wydobywa',
        MISSING: 'Przegapia',
        NOT_FORGING: 'Nie wydobywa',
        NEVER_FORGED: 'Nigdy nie wydobywał'
      },
      VOTES: 'Głosy',
      TOOLTIP: 'Ostatni blok @ {height} wytworzony'
    },
    TOP_WALLETS: {
      TITLE: 'Najbogatsze portfele'
    },
    NOT_FOUND: {
      TITLE: 'Ooops!',
      PAGE: 'Przykro nam, strona nie została odnaleziona',
      DATA: 'Przykro nam, {dataType} {dataId} nie można znaleźć na blockchain'
    }
  },

  PAGINATION: {
    ALL: 'Wszystko',
    NEXT: 'Następny',
    OF: 'Z',
    PAGE: 'Strona',
    PREVIOUS: 'Poprzedni',
    ROWS_PER_PAGE: 'Wiersze na stronę',
    SHOW_MORE: 'Pokaż więcej',
    PLACEHOLDER: {
      SHORT: '# strony',
      LONG: 'Wprowadź numer strony'
    },
    NO_RESULTS: 'Nieprawidłowy numer strony'
  },

  HEADER: {
    MENU: 'Menu',
    NETWORK: 'Sieć',
    MAIN: 'Główna',
    DEVELOPMENT: 'Deweloperska',
    SUPPLY: 'Zasoby',
    MARKET_CAP: 'Kapitalizacja rynkowa'
  },

  FOOTER: {
    ALL_RIGHTS_RESERVED: 'Wszelkie prawa zastrzeżone',
    VERSION: 'Wersja',
    DATE: 'Data'
  }
}
