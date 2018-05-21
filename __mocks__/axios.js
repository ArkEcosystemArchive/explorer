// Axios mock


const mockFindAddress = {
  data: {
    success: true,
    account: {
      address: 'MockAddress'
    }
  }
}

const mockVoteAddress = {
  data: {
    success: true,
    delegates: [{
      username: 'MockDelegate'
    }]
  }
}

const mockNonVotingAddress = {
  data: {
    success: true,
    delegates: []
  }
}

const mockTopWallets = {
  data: {
    success: true,
    accounts: [{}]
  }
}

const mockPaginatingTopWallets = {
  data: {
    success: true,
    accounts: [{}, {}]
  }
}

export default {
  get: (url, config) => new Promise(resolve => {
    console.log(url)
    console.log(config)
    if (config.params.address === 'AMockedFindAddress') {
      resolve(mockFindAddress)
    } else if (config.params.address === 'AMockedVoteAddress') {
      resolve(mockVoteAddress)
    } else if (config.params.address === 'AMockedNonVotingAddress') {
      resolve(mockNonVotingAddress)
    } else if (config.params.offset === 0 && config.params.limit === 25) {
      resolve(mockTopWallets)
    } else if ((config.params.offset === 25 && config.params.limit === 25) || (config.params.offset === 20 && config.params.limit === 20)) {
      resolve(mockPaginatingTopWallets)
    } else {
      resolve({
        data: { success: false }
      })
    }
  })
}