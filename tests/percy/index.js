const PercyScript = require('@percy/script');
const rc = require('rc');

const { props: { url } } = rc('config');

PercyScript.run(async (page, percySnapshot) => {
  await page.goto(url);
  await percySnapshot('homepage');
});
