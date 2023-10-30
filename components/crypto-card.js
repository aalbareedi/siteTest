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
export default function CryptoCard({
    coin,
    metadata,
    changeTimeframe,
    lifespan = 60000,
}) {
    const { symbol, name, quote, cmc_rank } = coin;
    // <div>${cmc_rank}</div>
    // Return a new element/DOM object
    const element = html(`
        <div class="crypto-card">
            <div class="crypto-card-intro">
                <div class="crypto-card-logo">
                    <img src="${metadata ? metadata.logo : ""}" />
                </div>
                <div class="crypto-card-name">
                    <div class="crypto-card-symbol">${symbol}</div>
                    <div class="crypto-card-name-text">${name}</div>
                </div>
            </div>
            <div class="crypto-card-stats-wrapper">
                <div class="crypto-card-price">${collapseZeros(
                    formatUsd(quote.USD.price)
                )}</div>
                <div class="crypto-card-stats">
                    <div class="crypto-card-row-perc ${
                        quote.USD["percent_change_" + changeTimeframe] >= 0
                            ? "card-positive-entry"
                            : "card-negative-entry"
                    }">
                        <i class="fas fa-caret-up"></i>${formatPercent(
                            quote.USD["percent_change_" + changeTimeframe] / 100
                        )}
                    </div>
                    <div class="crypto-card-mcap">${formatUsd(
                        quote.USD.market_cap
                    )}</div>
                </div>
            </div>
        </div>
    `);

    setTimeout(() => {
        if (!DISABLE_COIN_EXPIRATION) {
            skeletonize(element);
        }
    }, lifespan);

    return element;
}
