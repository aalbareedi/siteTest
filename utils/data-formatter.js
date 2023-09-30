export function formatUsd(data) {
    if (data >= 1000000) {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            notation: "compact",
            compactDisplay: "short",
        }).format(data);
    }

    if (data >= 1) {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(data);
    }

    return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 4,
        roundingMode: "trunc",
    }).format(data);
}

export function formatPercent(data) {
    return Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: "always",
    }).format(data);
}
