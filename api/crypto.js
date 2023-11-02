import { coins, cryptoTotalCount } from "../sandbox/crypto-data.js";
import { USE_SANDBOX_DATA } from "../utils/constants.js";

const API_URL =
    location.hostname == "127.0.0.1" || location.hostname == "localhost"
        ? "http://localhost:3000"
        : location.hostname == "10.0.0.180"
        ? "http://10.0.0.180:3000"
        : "https://stocks-backend-production.up.railway.app";

/**
 *
 * @param {{
 *  start: number,
 *  quantity: number,
 *  sort: {
 *    property: "market_cap"|"price"|"percent_change_24h"|"percent_change_1h"|"percent_change_7d"|"percent_change_30d",
 *    direction: "asc"|"desc"
 *  },
 *  abortSignal: AbortSignal
 * }}
 * @returns {[]}
 */
export async function getCryptoCoins({ start, quantity, sort, abortSignal }) {
    if (USE_SANDBOX_DATA) {
        return coins;
    }

    const limit = quantity;

    const url = new URL(`${API_URL}/api/crypto`);
    url.searchParams.set("start", start);
    url.searchParams.set("limit", limit);
    url.searchParams.set("sort", JSON.stringify(sort));

    try {
        const response = await fetch(url, {
            method: "GET",
            signal: abortSignal,
        });

        if (!response.ok) {
            throw new Error("Something went wrong.");
        }

        return await response.json();
    } catch (error) {
        if (error.name == "AbortError") {
            return null;
        }

        throw error;
    }
}

/**
 *
 * @param {{
 *  start: number,
 *  cryptoQuantity: string,
 *  quantityNumber: number,
 *  cryptoSort: object,
 *  abortSignal: AbortSignal
 * }}
 * @returns
 */
export async function getCryptoCoinsFinal({
    start = null,
    cryptoQuantity,
    quantityNumber,
    cryptoSort,
    abortSignal,
}) {
    const coins = await getCryptoCoins({
        start:
            cryptoQuantity == "Top 100" || cryptoQuantity == "Top 200"
                ? 0
                : start,
        quantity:
            cryptoQuantity == "Top 100"
                ? 100
                : cryptoQuantity == "Top 200"
                ? 200
                : quantityNumber,
        sort:
            cryptoQuantity == "Top 100" || cryptoQuantity == "Top 200"
                ? { property: "market_cap", direction: "desc" }
                : cryptoSort,
        abortSignal: abortSignal,
    });

    if (!coins) {
        return coins;
    }

    if (
        cryptoSort &&
        (cryptoQuantity == "Top 100" || cryptoQuantity == "Top 200")
    ) {
        // coins.sort((a, b) => {
        //     if (cryptoSort.direction == "desc") {
        //         return (
        //             b.quote.USD[cryptoSort.property] -
        //             a.quote.USD[cryptoSort.property]
        //         );
        //     } else {
        //         return (
        //             a.quote.USD[cryptoSort.property] -
        //             b.quote.USD[cryptoSort.property]
        //         );
        //     }
        // });

        sortCoins(coins, cryptoSort.property, cryptoSort.direction);
    }

    return coins;
}

/**
 *
 * @param {object[]} coins
 * @param {string} property
 * @param {"asc"|"desc"} direction
 */
export function sortCoins(coins, property, direction) {
    coins.sort((a, b) => {
        if (direction == "desc") {
            return b.quote.USD[property] - a.quote.USD[property];
        } else {
            return a.quote.USD[property] - b.quote.USD[property];
        }
    });
}

/**
 * @returns {number}
 */
export async function getCyptoTotalCount() {
    if (USE_SANDBOX_DATA) {
        return cryptoTotalCount;
    }

    const response = await fetch(`${API_URL}/api/crypto-total-count`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Something went wrong.");
    }

    const data = await response.json();

    return data.totalCount;
}

/**
 *
 * @param {{
 *  coinIds: number[]
 * }}
 * @returns {[]}
 */
export async function getCryptoMetadata({ coinIds }) {
    const response = await fetch(
        `${API_URL}/api/crypto/metadata?ids=${coinIds}`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        throw new Error("Something went wrong.");
    }

    return await response.json();
}

export async function getCryptoGlobalMetrics() {
    const response = await fetch(`${API_URL}/api/crypto/global-metrics`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Something went wrong.");
    }

    return await response.json();
}
