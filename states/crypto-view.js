import { DEFAULT_CRYPTO_VIEW } from "../utils/constants.js";

/**
 * @type {"table"|"card"}
 */
export let cryptoView = DEFAULT_CRYPTO_VIEW;
const callbacks = [];

/**
 * @param {"table"|"card"} value
 */
export function setCryptoView(value) {
    cryptoView = value;
    for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](value);
    }
}

/**
 *
 * @param {() => {}} callback
 */
export function handleCryptoViewChange(callback) {
    callbacks.push(callback);
    callback(cryptoView);
}
