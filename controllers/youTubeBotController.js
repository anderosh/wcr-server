const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');
const requireUser = require('../middleware/requireUser');

const youTubeSearch = qSearch => {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?type=video&key=${process.env.YTAPIKEY}&part=snippet&maxResults=1&q=${qSearch}`,
    {
      method: 'GET'
    }
  ).then(res => res.json());
};

router.post('/youtube-bot', requireUser, async (req, res) => {
  console.log(req.body);
  const qSearch = req.body.qSearch;
  try {
    const youTubeResults = await youTubeSearch(qSearch);
    res.json(youTubeResults.items[0].id.videoId);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
