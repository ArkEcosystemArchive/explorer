import store from "@/store";
import { IDelegate, IRoundDelegate } from "../interfaces";
import { ForgingStatus } from "../enums";
import { roundFromHeight } from "@/utils";

class ForgingService {
  public status(delegate: IDelegate, height: number, previousDelegates: IRoundDelegate[]): ForgingStatus {
    if (delegate.blocks.last === undefined) {
      return ForgingStatus.NeverForged;
    }

    const networkRound = roundFromHeight(height);
    const lastBlockRound = roundFromHeight(delegate.blocks.last.height);
    const roundDelta = networkRound - lastBlockRound;

    if (!roundDelta) {
      return ForgingStatus.Forging;
    }

    if (!previousDelegates.find(el => el.publicKey === delegate.publicKey)) {
      return ForgingStatus.BecameActive;
    }

    switch (roundDelta) {
      // the delegate is either still waiting for their slot or has missed it
      case 1: {
        return ForgingStatus.Forging;
      }
      // the delegate has missed their slot in the previous round and is now
      // either still waiting for their slot or has missed their slot
      case 2: {
        return ForgingStatus.Missing;
      }
      // the delegate has missed their slot in at least the previous two rounds
      // and is now either still waiting for their slot or has missed again
      default: {
        return ForgingStatus.NotForging;
      }
    }
  }

  public totals(delegates: IDelegate[]): object {
    let forging = 0;
    let missedBlock = 0;
    let notForging = 0;
    let neverForged = 0;
    let becameActive = 0;

    const height = store.getters["network/height"];
    const activeDelegates = store.getters["network/activeDelegates"];

    const remainingBlocks = activeDelegates - (height % activeDelegates) || activeDelegates;

    delegates.forEach(delegate => {
      switch (delegate.forgingStatus) {
        case ForgingStatus.Forging: {
          forging++;
          break;
        }
        case ForgingStatus.Missing: {
          missedBlock++;
          break;
        }
        case ForgingStatus.NotForging: {
          notForging++;
          break;
        }
        case ForgingStatus.NeverForged: {
          neverForged++;
          break;
        }
        case ForgingStatus.BecameActive: {
          becameActive++;
          break;
        }
        default: {
          break;
        }
      }
    });

    return {
      forging,
      missedBlock,
      notForging,
      neverForged,
      becameActive,
      remainingBlocks,
    };
  }
}

export default new ForgingService();
