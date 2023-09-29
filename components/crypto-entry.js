/* <div class="crypto-entry">
<div class="crypto-entry-pair">
    <div class="crypto-number">1</div>
    <div class="crypto-name-wrapper">
    <div class="crypto-logo"></div>
    <div class="crypto-name">
        <div class="crypto-symbol">BTC</div>
        <div class="crypto-name-text">Bitcoin</div>
    </div>
    </div>
</div>
<div class="crypto-price">$33,375.43</div>
<div class="percent-change negative"><span>-</span>1.08%</div>
</div> */

function CryptoEntry(number, { symbol, name, quote }, metadata) {
    // Return a new element/DOM object
    const element = document.createElement("div");
    element.classList.add("crypto-entry");

    const percentFormatter = Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: "always",
    });

    element.innerHTML += `
        <div class="crypto-entry-pair">
            <div class="crypto-number">${number}</div>
            <div class="crypto-name-wrapper">
            <div class="crypto-logo">
                <img src="${metadata ? metadata.logo : ""}" />
            </div>
            <div class="crypto-name">
                <div class="crypto-symbol">${symbol}</div>
                <div class="crypto-name-text display-hidden">${name}</div>
                <div class="crypto-name-text">
                    ${getUsdFormatter(quote.USD.price).format(quote.USD.price)}
                </div>
            </div>
            </div>
        </div>
        <div class="crypto-mcap">
            ${getUsdFormatter(quote.USD.market_cap).format(
                quote.USD.market_cap
            )}
        </div>
        <div class="percent-change ${
            quote.USD.percent_change_24h >= 0 ? "positive" : "negative"
        }">
            ${percentFormatter.format(quote.USD.percent_change_24h)}
        </div>
    `;

    return element;
}

function getUsdFormatter(amount) {
    if (amount >= 1000000) {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            notation: "compact",
            compactDisplay: "short",
        });
    }

    if (amount >= 1) {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 4,
        roundingMode: "trunc",
    });
}
