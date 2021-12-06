import fetch from 'node-fetch';
import { tweet } from 'utils/twitter';

export default async () => {
  try {
    const { data: coin } = await (
      await fetch('https://api.jinx.capital/coins/btc')
    ).json();
    const chart = await (
      await fetch('https://api.jinx.capital/chart/btc:usd.jpg')
    ).buffer();
    const { data: exchangeFlows } = await (
      await fetch('https://api.jinx.capital/exchange-flows/bitcoin')
    ).json();

    const percentageFormatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      maximumFractionDigits: 2,
      signDisplay: 'always',
    });
    const dollarFormatter = Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    });
    const bigNumberFormatter = Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
      signDisplay: 'always',
    });

    let text = `GM! In the last 24 hours Bitcoin is ${
      coin.percentageChange24h < 0 ? 'down' : 'up'
    } ${percentageFormatter.format(
      coin.percentageChange24h / 100,
    )} and is currently sitting at ${dollarFormatter.format(coin.price)}.`;

    if (exchangeFlows.total.change.day) {
      text += ` Exchange netflow: ${bigNumberFormatter.format(
        exchangeFlows.total.change.day,
      )} BTC.`;
    }

    text += ' How are we feeling about Bitcoin today? $bitcoin $btc';

    await tweet(text, chart);
  } catch (e) {
    console.error(e);
  }
};
