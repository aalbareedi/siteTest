import { DEFAULT_CRYPTO_SORT } from "../utils/constants.js";

/**
 * @type {{
 *  property: "market_cap"|"price"|"percent_change_24h"|"percent_change_1h"|"percent_change_7d"|"percent_change_30d",
 *  direction: "asc"|"desc"
 * }}
 */
export let cryptoSort = DEFAULT_CRYPTO_SORT;
const callbacks = [];

export function setCryptoSort(value) {
    cryptoSort = value;
    for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](value);
    }
}

/**
 *
 * @param {(cryptoSort: string) => {}} callback
 */
export function handleCryptoSortChange(callback) {
    callbacks.push(callback);
    callback(cryptoSort);
}
