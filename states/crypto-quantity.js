import { DEFAULT_CRYPTO_QUANTITY } from "../utils/constants.js";

/**
 * @type {"All Coins"|"Top 100"|"Top 200"}
 */
export let cryptoQuantity = DEFAULT_CRYPTO_QUANTITY;
const callbacks = [];

export function setCryptoQuantity(value) {
    cryptoQuantity = value;
    for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](value);
    }
}

/**
 *
 * @param {(cryptoQuantity: string) => {}} callback
 */
export function handleCryptoQuantityChange(callback) {
    callbacks.push(callback);
    callback(cryptoQuantity);
}
