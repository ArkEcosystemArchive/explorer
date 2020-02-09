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

    if (!previousDelegates.find((el) => el.publicKey === delegate.publicKey)) {
      return ForgingStatus.BecameActive;
    }

    switch (roundDelta) {
      // the delegate is either still waiting for their turn to forge or has failed to forge
      case 1: {
        return ForgingStatus.Forging;
      }
      // the delegate has failed to forge in the previous round and is now
      // either still waiting for their turn or has failed to forge again
      case 2: {
        return ForgingStatus.Missing;
      }
      // the delegate has failed to forge in at least the previous two rounds and
      // is now either still waiting for their turn or has failed to forge again
      default: {
        return ForgingStatus.NotForging;
      }
    }
  }

  public totals(delegates: IDelegate[]): object {
    let forging = 0;
    let missedRound = 0;
    let notForging = 0;
    let neverForged = 0;
    let becameActive = 0;

    const height = store.getters["network/height"];
    const activeDelegates = store.getters["network/activeDelegates"];

    const remainingBlocks = activeDelegates - (height % activeDelegates) || activeDelegates;

    delegates.forEach((delegate) => {
      switch (delegate.forgingStatus) {
        case ForgingStatus.Forging: {
          forging++;
          break;
        }
        case ForgingStatus.Missing: {
          missedRound++;
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
      missedRound,
      notForging,
      neverForged,
      becameActive,
      remainingBlocks,
    };
  }
}

export default new ForgingService();
