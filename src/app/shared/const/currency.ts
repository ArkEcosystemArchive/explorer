import { CONFIG } from '../../app.config';

const initName = CONFIG.NETWORKS[CONFIG.NETWORK].CURRENCIES[0];
export const initCurrency = {
    name: initName,
    value: 1
};

const tickerVal = {};
tickerVal[initName] = 1;

export const ticker = tickerVal;
