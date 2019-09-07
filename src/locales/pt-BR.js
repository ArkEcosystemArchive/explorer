export default {
  COMMON: {
    BALANCE: 'Balanço',
    BLOCK: 'Bloco',
    BLOCKS: 'Blocos',
    CONFIRMATIONS: 'Confirmações',
    DELEGATE: 'Delegado',
    DELEGATES: 'Delegados',
    FEE: 'Taxa',
    HEIGHT: 'Altura',
    ID: 'ID',
    NO_RESULTS: 'Sem resultados',
    RANK: 'Posição',
    RELOAD: 'Atualize esta página',
    SEE_ALL: 'Ver todos',
    SUPPLY: 'Distribuição',
    SUPPLY_PERCENTAGE: 'Percentagem da distribuição total',
    TIMESTAMP: 'Timestamp',
    TRANSACTION: 'Transação',
    TRANSACTIONS: 'Transações',
    TYPE: 'Tipo'
  },

  MARKET_CHART: {
    ERROR: 'Os dados do gráfico não puderam ser carregados',
    RELOAD: 'Recarregar gráfico',
    PRICE: 'Preço',
    VOLUME: 'Volume',
    DAY: 'Dia',
    WEEK: 'Semana',
    MONTH: 'Mês',
    QUARTER: 'Trimestre',
    YEAR: 'Ano',
    ALL_TIME: 'Todo o período'
  },

  BLOCK: {
    ID: 'ID do bloco',
    PAGINATION: {
      NEXT: 'Próximo bloco',
      PREVIOUS: 'Bloco anterior'
    },
    FEES: 'Taxas',
    GENERATED_BY: 'Gerado por',
    REWARD: 'Recompensa',
    PROCESSED_AMOUNT: 'Quantidade processada',
    TOTAL_FORGED: 'Total forjado'
  },

  TRANSACTION: {
    AMOUNT: 'Quantia',
    BLOCK_ID: 'ID do bloco',
    ID: 'ID de transação',
    FEE: 'Taxa',
    TYPE: 'Tipo de transação',
    TYPES: {
      ALL: 'Todos',
      TRANSFER: 'Transferência',
      SECOND_SIGNATURE: 'Registro de Senha Secundária',
      DELEGATE_REGISTRATION: 'Registro de Delegado',
      VOTE: 'Voto',
      UNVOTE: 'Unvote',
      MULTI_SIGNATURE: 'Registro Multi-Assinatura',
      IPFS: 'IPFS',
      TIMELOCK_TRANSFER: 'Transferência de Timelock',
      MULTI_PAYMENT: 'Multipagamento',
      DELEGATE_RESIGNATION: 'Delegate Resignation',
      SENT: 'Enviado',
      RECEIVED: 'Recebido'
    },
    SENDER: 'Remetente',
    RECIPIENT: 'Destinatário',
    SMARTBRIDGE: 'Smartbridge',
    WELL_CONFIRMED: 'Confirmado'
  },

  WALLET: {
    ADDRESS: 'Endereço',
    PUBLIC_KEY: 'Public key',
    VERIFIED: 'Este é um endereço confirmado',
    VOTING_FOR: 'Votos para',
    BALANCE: 'Balanço ({token})',
    SECOND_PASSPHRASE_ENABLED: 'Senha Secundária ativada',
    SUMMARY: 'Sumário da carteira',
    QR_CODE: 'Código QR',
    SCAN_FOR_ADDRESS: 'Escanear endereço',
    DELEGATE: {
      FORGED_BLOCKS: 'Blocos forjados',
      TOTAL_FORGED: 'Total forjado',
      RANK: 'Posição',
      RANK_NOT_AVAILABLE: 'Não disponível ainda',
      USERNAME: 'Nome de usuário',
      VOTES: 'Votos',
      VOTERS: 'Votantes',
      VOTER_THRESHOLD: 'Somente votantes com mais de 0.1 {token}'
    }
  },

  SEARCH: {
    PLACEHOLDER: {
      SHORT: 'Buscar',
      LONG: 'Busque por um bloco, transação, endereço ou delegado'
    },
    NO_RESULTS: 'Não encontramos nenhum resultado para sua busca'
  },

  BUTTON_CLIPBOARD: {
    SUCCESS: 'Copiado!',
    ERROR: 'Erro!',
    COPY_TO_CLIPBOARD: 'Copiar para a Área de Transferência'
  },

  PAGES: {
    HOME: {
      TITLE: 'Início',
      HEADER: 'Últimas transações e blocos',
      LATEST_TRANSACTIONS: 'Últimas transações',
      LATEST_BLOCKS: 'Últimos blocos'
    },
    DELEGATE_MONITOR: {
      TITLE: 'Monitoramento de Delegados',
      HEADER: {
        LAST_BLOCK: 'Bloco anterior',
        FORGED: 'Forjado',
        TOTAL_FORGED: 'Total forjado ({token})',
        TX_COUNT: 'de 0 transações | de 1 transação | de {count} transações'
      },
      ACTIVE: 'Ativo',
      STANDBY: 'Em Espera',
      NEVER: 'Nunca',
      FORGED_BLOCKS: 'Blocos forjados',
      LAST_FORGED: 'Último bloco forjado',
      STATS: {
        FORGED: 'Bloco forjado recentemente',
        IN_QUEUE: 'Em espera para forjar',
        MISSED: 'Bloco perdido',
        NOT_FORGING: 'Não está forjando'
      },
      STATUS: {
        TITLE: 'Status',
        FORGING: 'Forjando',
        MISSING: 'Ausente',
        NOT_FORGING: 'Não está forjando',
        NEVER_FORGED: 'Never forged'
      },
      VOTES: 'Votos',
      TOOLTIP: 'Last block @ {height} on'
    },
    TOP_WALLETS: {
      TITLE: 'Carteiras Mais Ricas'
    },
    NOT_FOUND: {
      TITLE: 'Ooops!',
      PAGE: 'Desculpe, página não encontrada',
      DATA: 'Desculpe, {dataType} {dataId} não foi encontrado no blockchain'
    }
  },

  PAGINATION: {
    ALL: 'Todos',
    NEXT: 'Próximo',
    OF: 'Do',
    PAGE: 'Página',
    PREVIOUS: 'Anterior',
    ROWS_PER_PAGE: 'Linhas por página',
    SHOW_MORE: 'Mostrar mais',
    PLACEHOLDER: {
      SHORT: '# de página',
      LONG: 'Digite um número de página'
    },
    NO_RESULTS: 'Número de página inválido'
  },

  HEADER: {
    MENU: 'Menu',
    NETWORK: 'Rede',
    MAIN: 'Mainnet',
    DEVELOPMENT: 'Desenvolvimento',
    SUPPLY: 'Distribuição',
    MARKET_CAP: 'Valor de mercado'
  },

  FOOTER: {
    ALL_RIGHTS_RESERVED: 'Todos os direitos reservados',
    VERSION: 'Versão',
    DATE: 'Data'
  }
}
