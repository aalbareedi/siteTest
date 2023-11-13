export const USE_SANDBOX_DATA = false;
export const DISABLE_RENDER_DATA = false;
export const DISABLE_INFINITE_SCROLLING = false;
export const DISABLE_COIN_EXPIRATION = false;
export const COIN_EXPIRE_LIFESPAN = 60000;

export const DEFAULT_CRYPTO_VIEW = "table";
export const MAX_SIGNIFICANT_DIGITS = 4;
export const DEFAULT_CRYPTO_TIMEFRAME = "24h";
export const DEFAULT_CRYPTO_QUANTITY = "All Coins";
export const DEFAULT_CRYPTO_SORT = {
    property: "market_cap",
    direction: "desc",
};

export const SKELETON_ROW_OPTIONS = {
    index: 0,
    coin: {
        symbol: "BTCB",
        name: "Bitcoin",
        quote: {
            USD: {
                price: 0.000099,
                market_cap: 44000000,
                percent_change_1h: 90.0,
                percent_change_24h: 90.0,
                percent_change_7d: 90.0,
                percent_change_30d: 90.0,
            },
        },
        cmc_rank: 888,
    },
    metadata: {
        logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    },
    changeTimeframe: "24h",
};
