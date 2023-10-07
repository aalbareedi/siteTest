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
 *  quantity: number
 * }}
 * @returns {[]}
 */
export async function getCryptoCoins({ quantity }) {
    if (USE_SANDBOX_DATA) {
        return coins;
    }

    const limit = quantity;

    const response = await fetch(`${API_URL}/api/crypto?limit=${limit}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Something went wrong.");
    }

    return await response.json();
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
