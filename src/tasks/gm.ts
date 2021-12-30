import fetch from 'node-fetch';
import { tweet } from 'utils/twitter';

const gm = async () => {
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
    const { data: leverage } = await (
      await fetch('https://api.jinx.capital/leverage')
    ).json();

    const percentageFormatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      maximumFractionDigits: 2,
      signDisplay: 'always',
    });
    const bigDollarFormatter = Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
      currency: 'usd',
      style: 'currency',
    });
    const bigNumberFormatter = Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
      signDisplay: 'always',
    });

    let text = `GM! In the last 24 hours, #Bitcoin is ${
      coin.percentageChange24h < 0 ? 'down' : 'up'
    } ${percentageFormatter.format(
      coin.percentageChange24h / 100,
    )} and is currently sitting at ${bigDollarFormatter.format(
      coin.price,
    )} while open interest ${
      leverage.openInterestChange > 0 ? 'increased' : 'decreased'
    } by ${percentageFormatter.format(
      leverage.openInterestChange / 100,
    )} to ${bigDollarFormatter.format(leverage.openInterest)}.`;

    if (exchangeFlows.diff24h) {
      text += ` Exchange balances saw ${
        exchangeFlows.diff24h < 0 ? 'a decrease' : 'an increase'
      } of ${bigNumberFormatter.format(exchangeFlows.diff24h)} BTC.`;
    }

    text += '\n\nHow are we feeling about $BTC today?';

    await tweet(text, chart);
  } catch (e) {
    console.error(e);
  }
};

export default async () => {
  try {
    await gm();
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await gm();
  }
};
