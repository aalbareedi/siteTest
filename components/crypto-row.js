import {
    formatUsd,
    formatPercent,
    collapseZeros,
} from "../utils/data-formatter.js";
import { html } from "../utils/html.js";
import { skeletonize } from "../skeletonize/skeletonize.js";
import { DISABLE_COIN_EXPIRATION } from "../utils/constants.js";

/**
 *
 * @param {{symbol: string, name: string, quote: object}} coin
 * @param {object} metadata
 * @param {"1h"|"24h"|"7d"|"30d"} changeTimeframe
 * @param {number} lifespan - The amount of time (in ms) before this data expires.
 * @returns
 */
export default function CryptoRow({
    coin,
    metadata,
    changeTimeframe,
    lifespan = 60000,
}) {
    const { symbol, name, quote, cmc_rank } = coin;
    // Return a new element/DOM object
    const element = html(`
        <tr class="crypto-row">
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
                    class="crypto-row-perc ${
                        quote.USD["percent_change_" + changeTimeframe] >= 0
                            ? "positive-entry"
                            : "negative-entry"
                    }"
                ><i class="fas fa-caret-up"></i>${formatPercent(
                    quote.USD["percent_change_" + changeTimeframe] / 100
                )}</div>
            </td>
            <td class="crypto-mcap">${formatUsd(quote.USD.market_cap)}</td>
        </tr>
    `);

    setTimeout(() => {
        if (!DISABLE_COIN_EXPIRATION) {
            skeletonize(element);
        }
    }, lifespan);

    return element;
}
