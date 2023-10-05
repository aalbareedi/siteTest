import {
    formatUsd,
    formatPercent,
    collapseZeros,
} from "../utils/data-formatter.js";

/**
 *
 * @param {number} number
 * @param {{symbol: string, name: string, quote: object}} coin
 * @param {object} metadata
 * @param {"1h"|"24h"|"7d"|"30d"} changeTimeframe
 * @returns
 */
export default function CryptoEntry(
    number,
    { symbol, name, quote, cmc_rank },
    metadata,
    changeTimeframe
) {
    // Return a new element/DOM object
    const element = document.createElement("tr");
    element.classList.add("crypto-entry");
    // ${collapseZeros(formatUsd(quote.USD.price))}
    // $0.<span class="collapse">0000</span>000123

    element.innerHTML += `
        <td class="crypto-number">${cmc_rank}</td>
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
                    quote.USD["percent_change_" + changeTimeframe] >= 0
                        ? "positive-entry"
                        : "negative-entry"
                }"
            ><i class="fas fa-caret-up"></i>${formatPercent(
                quote.USD["percent_change_" + changeTimeframe] / 100
            )}</div>
        </td>
        <td class="crypto-mcap">${formatUsd(quote.USD.market_cap)}</td>
    `;

    return element;
}
