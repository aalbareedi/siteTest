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

function CryptoEntry(number, { symbol, name, quote }) {
    // Return a new element/DOM object
    const element = document.createElement("div");
    element.classList.add("crypto-entry");

    const usdFormatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    const percentFormatter = Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    element.innerHTML = `
        <div class="crypto-entry-pair">
            <div class="crypto-number">${number}</div>
            <div class="crypto-name-wrapper">
            <div class="crypto-logo"></div>
            <div class="crypto-name">
                <div class="crypto-symbol">${symbol}</div>
                <div class="crypto-name-text">${name}</div>
            </div>
            </div>
        </div>
        <div class="crypto-price">${usdFormatter.format(quote.USD.price)}</div>
        <div>999.99b</div>
        <div class="percent-change positive">${percentFormatter.format(
            quote.USD.percent_change_24h
        )}</div>
    `;

    return element;
}
