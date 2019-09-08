export interface IBlock {
    id: string,
    height: number,
    timestamp: {
        unix: number
    },
    transactions: [ITransaction]
}

export interface IDelegate {
    address: string,
    username: string,
    publicKey: string
}

export interface ITransaction {

}

export interface ISortParameters {
    field: string,
    type: string
}