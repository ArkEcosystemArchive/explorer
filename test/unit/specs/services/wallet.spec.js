import walletService from '@/services/wallet'

describe('Wallet Service', () => {
	it('should return mocked address when searching existing wallet', async () => {
		await expect(walletService.find('AMockedFindAddress')).resolves.toHaveProperty('address', 'MockAddress')
	}),

	it('should fail when searching for incorrect wallet address', async () => {
		await expect(walletService.find('AnIncorrectFindAddress')).rejects
	}),

	it('should return delegate when address is voting for one', async () => {
		await expect(walletService.vote('AMockedVoteAddress')).resolves.toHaveProperty('username', 'MockDelegate')
	}),

	it('should return false when address is not voting', async () => {
		await expect(walletService.vote('AMockedNonVotingAddress')).resolves.toEqual(false)
	}),

	it('should fail when fetching vote for incorrect wallet address', async () => {
		await expect(walletService.vote('AnIncorrectVoteAddress')).rejects
	}),

  it('should return a list of top wallet accounts', async () => {
    await expect(walletService.top()).resolves.toHaveLength(1)
  }),

  it('should correctly paginate top wallet accounts', async () => {
    await expect(walletService.top(2)).resolves.toHaveLength(2),
    await expect(walletService.top(2, 20)).resolves.toHaveLength(2)
  })
})