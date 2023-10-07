const API_URL =
    location.hostname == "127.0.0.1" || location.hostname == "localhost"
        ? "http://localhost:3000"
        : location.hostname == "10.0.0.180"
        ? "http://10.0.0.180:3000"
        : "https://stocks-backend-production.up.railway.app";

/**
 *
 * @param {{
 *  quantity: "All Coins"|"Top 100"|"Top 200"
 * }}
 * @returns {[]}
 */
export async function getCryptoCoins({ quantity }) {
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
