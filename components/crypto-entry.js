import {
    formatUsd,
    formatPercent,
    collapseZeros,
} from "../utils/data-formatter.js";

export default function CryptoEntry(number, { symbol, name, quote }, metadata) {
    // Return a new element/DOM object
    const element = document.createElement("tr");
    element.classList.add("crypto-entry");
    // ${collapseZeros(formatUsd(quote.USD.price))}
    // $0.<span class="collapse">0000</span>000123

    if (symbol == "BTC") {
        console.log(quote.USD.percent_change_24h);
        console.log(formatPercent(quote.USD.percent_change_24h / 100));
    }

    element.innerHTML += `
        <td class="crypto-number">${number}</td>
        <td>
            <div class="crypto-name-wrapper">
                <div class="crypto-logo">
                    <img src="${metadata ? metadata.logo : ""}" />
                </div>
                <div class="crypto-name">
                    <div class="crypto-symbol">${symbol}</div>
                    <div class="crypto-name-text display-hidden">${name}</div>
                    <div class="crypto-name-text">${collapseZeros(
                        formatUsd(quote.USD.price)
                    )}</div>
                </div>
            </div>
        </td>
        <td>
            <div
                class="crypto-entry-perc ${
                    quote.USD.percent_change_24h >= 0
                        ? "positive-entry"
                        : "negative-entry"
                }"
            >${formatPercent(quote.USD.percent_change_24h / 100)}</div>
        </td>
        <td class="crypto-mcap">${formatUsd(quote.USD.market_cap)}</td>
    `;

    return element;
}
