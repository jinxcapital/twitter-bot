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

    const percentageFormatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      maximumFractionDigits: 2,
      signDisplay: 'always',
    });
    const dollarFormatter = Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    });

    const text = `GM! In the last 24 hours Bitcoin is ${
      coin.percentageChange24h < 0 ? 'down' : 'up'
    } ${percentageFormatter.format(
      coin.percentageChange24h / 100,
    )} and is currently sitting at ${dollarFormatter.format(
      coin.price,
    )}. How are we feeling about it today? #bitcoin $btc`;

    console.log(text);

    await tweet(text, chart);
  } catch (e) {
    console.error(e);
  }
};
