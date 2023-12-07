import {
    formatUsd,
    formatPercent,
    collapseZeros,
} from "../utils/data-formatter.js";
import { html } from "../utils/html.js";
import { skeletonize } from "../skeletonize/skeletonize.js";
import {
    COIN_LIFESPAN,
    DISABLE_COIN_EXPIRATION,
    DISABLE_COIN_LIFESPAN_METER,
} from "../utils/constants.js";

/**
 * @param {{symbol: string, name: string, quote: object, index: number, lifespan: number}} coin
 * @param {object} metadata
 * @param {"1h"|"24h"|"7d"|"30d"} changeTimeframe
 * @param {Function} onScrollTo
 * @param {Function} onExpire
 * @returns
 */
export default function CryptoRow({
    index,
    coin,
    metadata,
    changeTimeframe,
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
                        <div class="crypto-price-text">${collapseZeros(
                            formatUsd(quote.USD.price)
                        )}</div>
                    </div>
                </div>
                <div class="lifespan-meter ${
                    DISABLE_COIN_LIFESPAN_METER ? "display-hidden" : ""
                }"></div>
            </td>
            <td class="crypto-name-col">
                <div class="crypto-name-wrapper">
                    <div class="crypto-logo">
                        <img src="${metadata ? metadata.logo : ""}" />
                    </div>
                    <div class="crypto-name">
                        <div class="crypto-symbol">${symbol}</div>
                        <div class="crypto-name-text">${name}</div>
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

    if (coin.lifespan !== null) {
        let isExpired = false;

        if (!DISABLE_COIN_EXPIRATION) {
            const interval = setInterval(() => {
                if (!element.isConnected) {
                    clearInterval(interval);
                    return;
                }

                coin.lifespan -= 1000;
                element
                    .querySelectorAll(".lifespan-meter")
                    .forEach(
                        (x) =>
                            (x.style.width =
                                (coin.lifespan / COIN_LIFESPAN) * 100 + "%")
                    );
            }, 1000);

            element
                .querySelectorAll(".lifespan-meter")
                .forEach(
                    (x) =>
                        (x.style.width =
                            (coin.lifespan / COIN_LIFESPAN) * 100 + "%")
                );
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
        }, coin.lifespan);

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
