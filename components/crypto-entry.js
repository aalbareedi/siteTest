import { formatUsd, formatPercent } from "../utils/data-formatter.js";

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

export default function CryptoEntry(number, { symbol, name, quote }, metadata) {
    // Return a new element/DOM object
    const element = document.createElement("div");
    element.classList.add("crypto-entry");

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
                    ${formatUsd(quote.USD.price)}
                </div>
            </div>
            </div>
        </div>
        <div class="crypto-entry-perc ${
            quote.USD.percent_change_24h >= 0
                ? "positive-entry"
                : "negative-entry"
        }">
            ${formatPercent(quote.USD.percent_change_24h)}
        </div>
        <div class="crypto-mcap">
            ${formatUsd(quote.USD.market_cap)}
        </div>
    `;

    return element;
}
