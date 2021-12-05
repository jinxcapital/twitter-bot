import fetch from 'node-fetch';

export default async () => {
  try {
    const coin = await (
      await fetch('https://api.jinx.capital/coins/btc')
    ).json();
    const chart = await (
      await fetch('https://api.jinx.capital/chart/btc:usd.jpg')
    ).buffer();

    console.log({ coin, chart });
  } catch (e) {
    console.error(e);
  }
};
