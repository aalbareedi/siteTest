const API_URL =
    location.hostname == "127.0.0.1" || location.hostname == "localhost"
        ? "http://localhost:3000"
        : location.hostname == "10.0.0.180"
        ? "http://10.0.0.180:3000"
        : "https://stocks-backend-production.up.railway.app";

export async function getCryptoCoins() {
    const response = await fetch(`${API_URL}/api/crypto`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Something went wrong.");
    }

    return await response.json();
}

export async function getCryptoMetadata(ids) {
    const response = await fetch(`${API_URL}/api/crypto/metadata?ids=${ids}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Something went wrong.");
    }

    return await response.json();
}
