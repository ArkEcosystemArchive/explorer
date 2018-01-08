import { Injectable } from '@angular/core';

@Injectable()
export class DelegateMonitorService {
    constructor() { }

    public getTotalForged(data: any) {
        let amount = 0;
        if (data && data.active) {
            data.active.delegates.forEach(element => {
                amount += +element.forged;
            });
        }
        return amount;
    }

    public getBestForger(data: any) {
        let forger = null;
        let forgerAmount = 0;
        if (data && data.active) {
            data.active.delegates.forEach(element => {
                if (+element.forged > forgerAmount) {
                    forgerAmount = +element.forged;
                    forger = element;
                }
            });
        }
        return forger;
    }

    public getProductivity(data: any) {
        let productivity = null;

        if (data && data.active && data.active.delegates) {
            let bestScore = data.active.delegates[0].productivity;
            let worstScore = data.active.delegates[0].productivity;
            let best = data.active.delegates[0];
            let worst = data.active.delegates[0];

            data.active.delegates.forEach(element => {
                if (element.productivity > bestScore) {
                    bestScore = element.productivity;
                    best = element;
                } else if (element.productivity < worstScore) {
                    worstScore = element.productivity;
                    worst = element;
                }
            });
            productivity = { best, worst };
        }
        return productivity;
    }

    public getTotals(data: any, height: number) {
        let totals = null;

        if (data && data.active && data.active.delegates) {
            data.active.delegates.forEach(element => {
                element.forgingStatus = this._getForgingStatus(element, height);
            });
            totals = this._getforgingTotals(data.active.delegates);
        }

        return totals;
    }

    public _getForgingStatus(delegate: any, height: number) {
        const status: any = {
            updatedAt: delegate.blocksAt
        };
        // let statusAge: number = 0;
        // let blockAge: number = 0;

        if (delegate.blocksAt && delegate.blocks.length > 0) {
            status.lastBlock = delegate.blocks[0];
            status.blockAt = this._epochStamp(status.lastBlock.timestamp);
            status.networkRound = this._round(height);
            status.delegateRound = this._round(status.lastBlock.height);
            status.awaitingSlot = status.networkRound - status.delegateRound;

            // statusAge = moment().diff(delegate.blocksAt, 'minutes');
            // blockAge = moment().diff(status.blockAt, 'minutes');
        } else {
            status.lastBlock = null;
        }

        if (status.awaitingSlot === 0) {
            // Forged block in current round
            status.code = 0;
        } else if (!delegate.isRoundDelegate && status.awaitingSlot === 1) {
            // Missed block in current round
            status.code = 1;
        } else if (!delegate.isRoundDelegate && status.awaitingSlot > 1) {
            // Missed block in current and last round = not forging
            status.code = 2;
        } else if (status.awaitingSlot === 1) {
            // Awaiting slot, but forged in last round
            status.code = 3;
        } else if (status.awaitingSlot === 2) {
            // Awaiting slot, but missed block in last round
            status.code = 4;
        } else if (!status.blockAt && !status.updatedAt) {
            // Awaiting status or unprocessed
            status.code = 5;
            // For delegates which not forged a signle block yet (statuses 0,3,5 not apply here)
        } else if (!status.blockAt && status.updatedAt) {
            if (!delegate.isRoundDelegate && delegate.missedblocks === 1) {
                // Missed block in current round
                status.code = 1;
            } else if (delegate.missedblocks > 1) {
                // Missed more than 1 block = not forging
                status.code = 2;
            } else if (delegate.missedblocks === 1) {
                // Missed block in previous round
                status.code = 4;
            }
        } else {
            // Not Forging
            status.code = 2;
        }

        delegate.status = [status.code, delegate.rate].join(':');
        return status;
    }

    private _getforgingTotals(delegates) {
        let forging = 0;
        let missedBlock = 0;
        let notForging = 0;
        let awaitingSlot = 0;
        let unprocessed = 0;

        delegates.forEach(element => {
            switch (element.forgingStatus.code) {
                case 0:
                case 3: {
                    forging++;
                    break;
                }
                case 1:
                case 4: {
                    missedBlock++;
                    break;
                }
                case 2: {
                    notForging++;
                    break;
                }
                default: {
                    unprocessed++;
                    break;
                }
            }
        });

        delegates.forEach(element => {
            switch (element.forgingStatus.code) {
                case 3:
                case 4: {
                    awaitingSlot++;
                    break;
                }
                default: {
                    break;
                }
            }
        });

        return {forging, missedBlock, notForging, awaitingSlot, unprocessed};
    }

    private _epochStamp(d: any) {
        return new Date(
            (((Date.UTC(2017, 2, 21, 13, 0, 0, 0) / 1000) + d) * 1000)
        );
    }

    private _round(height) {
        if (isNaN(height)) {
            return 0;
        } else {
            return Math.floor(height / 51) + (height % 51 > 0 ? 1 : 0);
        }
    }
}
