const apiKey = 'bad939602febb4c93217ea43c01eb126';
export const currencylayerUrl = 'http://www.apilayer.net';
export const currencylayerGet = '/api/live';
const accessQueryParam = `?access_key=${apiKey}`;
const supportedCurrencies = ['GBP'];
const currenciesParam = `&currencies=${supportedCurrencies.join(',')}`;

export const currenciesPath = `${currencylayerGet}${accessQueryParam}${currenciesParam}`;
export const currenciesUrl = `${currencylayerUrl}${currencylayerGet}${accessQueryParam}${currenciesParam}`;
