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

export function collapseZeros(data) {
    const string = String(data);
    const MAX_ZEROS = 4;
    let start = null;
    let end = null;

    for (let i = 0; i < string.length; i++) {
        if (string[i] != 0) {
            if (start !== null && end !== null && end > start) {
                break;
            }

            start = null;
            end = null;
        }

        if (start === null && string[i] == 0) {
            start = i;
        }

        if (start !== null && i - start >= MAX_ZEROS) {
            end = i;
        }
    }

    if (start !== null && end !== null) {
        return (
            string.substring(0, start) +
            `<span class="collapse-zeroes">${string.substring(
                start,
                end
            )}</span>` +
            string.substring(end, string.length)
        );
    }

    return string;
}
