import store from "@/store";
import { IDelegate, IRoundDelegate } from "../interfaces";
import { roundFromHeight } from "@/utils";

const ForgeStatus: { [key: string]: number } = Object.freeze({
  FORGING: 0,
  MISSING: 1,
  NOT_FORGING: 2,
  NEVER_FORGED: 3,
  BECAME_ACTIVE: 4,
});

class ForgingService {
  public status(delegate: IDelegate, height: number, previousDelegates: IRoundDelegate[]): number {
    let forgingStatus: number;

    if (!previousDelegates.find(el => el.publicKey === delegate.publicKey)) {
      forgingStatus = ForgeStatus.BECAME_ACTIVE;
    } else if (delegate.blocks.last === undefined) {
      forgingStatus = ForgeStatus.NEVER_FORGED;
    } else {
      const networkRound = roundFromHeight(height);
      const lastBlockRound = roundFromHeight(delegate.blocks.last.height);
      const roundDelta = networkRound - lastBlockRound;

      switch (roundDelta) {
        case 0:
        case 1: {
          forgingStatus = ForgeStatus.FORGING;
          break;
        }
        case 2: {
          forgingStatus = ForgeStatus.MISSING;
          break;
        }
        default: {
          forgingStatus = ForgeStatus.NOT_FORGING;
          break;
        }
      }
    }

    return forgingStatus;
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
        case ForgeStatus.FORGING: {
          forging++;
          break;
        }
        case ForgeStatus.MISSING: {
          missedBlock++;
          break;
        }
        case ForgeStatus.NOT_FORGING: {
          notForging++;
          break;
        }
        case ForgeStatus.NEVER_FORGED: {
          neverForged++;
          break;
        }
        case ForgeStatus.BECAME_ACTIVE: {
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
