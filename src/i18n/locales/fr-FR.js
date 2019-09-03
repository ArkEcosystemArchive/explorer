export default {
  COMMON: {
    BALANCE: 'Solde',
    BLOCK: 'Bloc',
    BLOCKS: 'Blocs',
    CONFIRMATIONS: 'Confirmations',
    DELEGATE: 'Délégué',
    DELEGATES: 'Délégués',
    FEE: 'Frais',
    HEIGHT: 'Hauteur',
    ID: 'ID',
    NO_RESULTS: 'Pas de résultats',
    RANK: 'Rang',
    RELOAD: 'Actualiser cette page',
    SEE_ALL: 'Voir tout',
    SUPPLY: 'Stock',
    SUPPLY_PERCENTAGE: 'Pourcentage de l\'offre totale',
    TIMESTAMP: 'Horodatage',
    TRANSACTION: 'Transaction',
    TRANSACTIONS: 'Transactions',
    TYPE: 'Type'
  },

  MARKET_CHART: {
    ERROR: 'Les données du graphique n\'ont pas pu être chargées',
    RELOAD: 'Recharger le graphique',
    PRICE: 'Prix',
    VOLUME: 'Volume',
    DAY: 'Jour',
    WEEK: 'Semaine',
    MONTH: 'Mois',
    QUARTER: 'Trimèstre',
    YEAR: 'Année',
    ALL_TIME: 'Tout les temps'
  },

  BLOCK: {
    ID: 'Bloc ID',
    PAGINATION: {
      NEXT: 'Bloc suivant',
      PREVIOUS: 'Bloc précédent'
    },
    FEES: 'Frais',
    GENERATED_BY: 'Généré par',
    REWARD: 'Récompense',
    PROCESSED_AMOUNT: 'Montant traité',
    TOTAL_FORGED: 'Total forgé'
  },

  TRANSACTION: {
    AMOUNT: 'Montant',
    BLOCK_ID: 'Bloc ID',
    ID: 'ID de transaction',
    FEE: 'Frais',
    TYPE: 'Type de transaction',
    TYPES: {
      ALL: 'Tout',
      TRANSFER: 'Transfer',
      SECOND_SIGNATURE: 'Enregistrement de seconde Signature',
      DELEGATE_REGISTRATION: 'Inscription de Délégué',
      VOTE: 'Vote',
      UNVOTE: 'Annuler le vote',
      MULTI_SIGNATURE: 'Enregistrement Multisignature',
      IPFS: 'IPFS',
      TIMELOCK_TRANSFER: 'Transfert différé',
      MULTI_PAYMENT: 'Multi-Paiement',
      DELEGATE_RESIGNATION: 'Résignation de Délégué',
      SENT: 'Envoyé',
      RECEIVED: 'Reçu'
    },
    SENDER: 'Envoyeur',
    RECIPIENT: 'Bénéficiaire',
    SMARTBRIDGE: 'Smartbridge',
    WELL_CONFIRMED: 'Bien confirmé'
  },

  WALLET: {
    ADDRESS: 'Adresse',
    PUBLIC_KEY: 'Clé publique',
    VERIFIED: 'Ceci est une adresse vérifiée',
    VOTING_FOR: 'Votes pour',
    BALANCE: 'Solde ({token})',
    SECOND_PASSPHRASE_ENABLED: 'Seconde signature activée',
    SUMMARY: 'Résumé du portefeuille',
    QR_CODE: 'QR Code',
    SCAN_FOR_ADDRESS: 'Scanner une adresse',
    DELEGATE: {
      FORGED_BLOCKS: 'Blocs forgés',
      TOTAL_FORGED: 'Total forgé',
      RANK: 'Rang',
      RANK_NOT_AVAILABLE: 'Pas encore disponible',
      USERNAME: 'Nom d\'utilisateur',
      VOTES: 'Votes',
      VOTERS: 'Votants',
      VOTER_THRESHOLD: 'Seulement pour les votants avec plus de 0.1 {token}'
    }
  },

  SEARCH: {
    PLACEHOLDER: {
      SHORT: 'Recherche',
      LONG: 'Trouver un bloc, une transaction, une adresse ou un délégué'
    },
    NO_RESULTS: 'Rien ne correspond à votre recherche'
  },

  BUTTON_CLIPBOARD: {
    SUCCESS: 'Copié!',
    ERROR: 'Erreur!',
    COPY_TO_CLIPBOARD: 'Copier vers le presse-papier'
  },

  PAGES: {
    HOME: {
      TITLE: 'Accueil',
      HEADER: 'Dernières transactions et blocs',
      LATEST_TRANSACTIONS: 'Dernières transactions',
      LATEST_BLOCKS: 'Derniers blocs'
    },
    DELEGATE_MONITOR: {
      TITLE: 'Moniteur des Délégués',
      HEADER: {
        LAST_BLOCK: 'Dernier bloc',
        FORGED: 'Forgé',
        TOTAL_FORGED: 'Total forgé ({token})',
        TX_COUNT: 'de 0 transactions | de 1 transaction | de {count} transactions'
      },
      ACTIVE: 'Actif',
      STANDBY: 'En attente',
      NEVER: 'Jamais',
      FORGED_BLOCKS: 'Blocs forgés',
      LAST_FORGED: 'Dernier forgé',
      STATS: {
        FORGED: 'Ont forgé récemment',
        IN_QUEUE: 'En file pour forgeage',
        MISSED: 'Ont manqué un bloc',
        NOT_FORGING: 'Ne forge(nt) pas'
      },
      STATUS: {
        TITLE: 'Statut',
        FORGING: 'Forgeage',
        MISSING: 'Manquant',
        NOT_FORGING: 'Ne forge(nt) pas',
        NEVER_FORGED: 'Jamais forgé'
      },
      VOTES: 'Votes',
      TOOLTIP: 'Dernier bloc @ {height}'
    },
    TOP_WALLETS: {
      TITLE: 'Top des Portefeuilles'
    },
    NOT_FOUND: {
      TITLE: 'Ooops!',
      PAGE: 'Désolé, page introuvable',
      DATA: 'Désolé, {dataType} {dataId} n\'a pu être trouvé sur la blockchain'
    }
  },

  PAGINATION: {
    ALL: 'Tout',
    NEXT: 'Suivant',
    OF: 'De',
    PAGE: 'Page',
    PREVIOUS: 'Précédent',
    ROWS_PER_PAGE: 'Lignes par page',
    SHOW_MORE: 'Montrez plus',
    PLACEHOLDER: {
      SHORT: '# de page',
      LONG: 'Entrer un numéro de page'
    },
    NO_RESULTS: 'Numéro de page invalide'
  },

  HEADER: {
    MENU: 'Menu',
    NETWORK: 'Réseau',
    MAIN: 'Principal',
    DEVELOPMENT: 'Développement',
    SUPPLY: 'Stock',
    MARKET_CAP: 'Capitalisation'
  },

  FOOTER: {
    ALL_RIGHTS_RESERVED: 'Tout droits réservés',
    VERSION: 'Version',
    DATE: 'Date'
  }
}
