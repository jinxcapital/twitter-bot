import Twitter from 'twitter';

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY as string,
  consumer_secret: process.env.TWITTER_API_SECRET as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});

const uploadMedia = async (media: Buffer) => {
  try {
    const response = await twitter.post('/media/upload', {
      media,
    });

    return response?.media_id_string || '';
  } catch {
    return '';
  }
};

export const tweet = async (text: string, media?: Buffer) => {
  const tweet = { status: text, media_ids: '' };
  if (media) {
    const mediaId = await uploadMedia(media);

    if (mediaId) {
      tweet.media_ids = mediaId;
    }
  }

  try {
    await twitter.post('statuses/update', tweet);
  } catch (e) {
    return false;
  }

  return true;
};
