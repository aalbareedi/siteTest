import {
    formatUsd,
    formatPercent,
    collapseZeros,
} from "../utils/data-formatter.js";
import { html } from "../utils/html.js";
import { skeletonize } from "../skeletonize/skeletonize.js";
import {
    DISABLE_COIN_EXPIRATION,
    DISABLE_COIN_LIFESPAN_METER,
} from "../utils/constants.js";

/**
 *
 * @param {{symbol: string, name: string, quote: object}} coin
 * @param {object} metadata
 * @param {"1h"|"24h"|"7d"|"30d"} changeTimeframe
 * @param {number} lifespan - The amount of time (in ms) before this data expires.
 * @param {Function} onScrollTo
 * @param {Function} onExpire
 * @returns
 */
export default function CryptoRow({
    index,
    coin,
    metadata,
    changeTimeframe,
    lifespan = null,
    onScrollTo = () => {},
    onExpire = () => {},
}) {
    const { symbol, name, quote, cmc_rank } = coin;

    // Return a new element/DOM object
    const element = html(`
        <tr class="crypto-row">
            <td class="crypto-number">${cmc_rank}</td>
            <td class="crypto-name-price-col">
                <div class="crypto-name-wrapper">
                    <div class="crypto-logo">
                        <img src="${metadata ? metadata.logo : ""}" />
                    </div>
                    <div class="crypto-name">
                        <div class="crypto-symbol">${symbol}</div>
                        <div class="crypto-name-text display-hidden">${name}</div>
                        <div class="crypto-price-text">${collapseZeros(
                            formatUsd(quote.USD.price)
                        )}</div>
                    </div>
                </div>
                <div class="lifespan-meter ${
                    DISABLE_COIN_LIFESPAN_METER ? "display-hidden" : ""
                }"></div>
            </td>
            <td class="crypto-price-col">${collapseZeros(
                formatUsd(quote.USD.price)
            )}</td>
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

    if (lifespan !== null) {
        let isExpired = false;

        if (!DISABLE_COIN_EXPIRATION) {
            let time = 0;
            const interval = setInterval(() => {
                if (!element.isConnected) {
                    clearInterval(interval);
                    return;
                }

                time += 1000;
                element.querySelector(".lifespan-meter").style.width =
                    100 - (time / lifespan) * 100 + "%";
            }, 1000);
        }

        setTimeout(() => {
            if (!element.isConnected) {
                return;
            }

            if (!DISABLE_COIN_EXPIRATION) {
                // skeletonize(element);
                isExpired = true;
                onExpire();
            }
        }, lifespan);

        new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    onScrollTo(isExpired);
                }
            });
        }).observe(element);
    }

    return element;
}
