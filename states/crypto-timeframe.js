import { DEFAULT_CRYPTO_TIMEFRAME } from "../utils/constants.js";

export let cryptoTimeframe = DEFAULT_CRYPTO_TIMEFRAME;
const callbacks = [];

export function setCryptoTimeframe(value) {
    cryptoTimeframe = value;
    for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](value);
    }
}

/**
 *
 * @param {(cryptoTimeframe: string) => {}} callback
 */
export function handleCryptoTimeframeChange(callback) {
    callbacks.push(callback);
    callback(cryptoTimeframe);
}
