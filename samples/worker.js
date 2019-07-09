const request = require('request');

request({ url: 'http://127.0.0.1:4000/jobs/fetch' }, (e, res, body) => {
  console.log('Fetching last job:', res.statusCode, res.statusMessage);

  if (!body) return;

  console.log(body);

  request({
    url: `http://127.0.0.1:4000/jobs/${JSON.parse(body).id}/response`,
    method: 'post',
    json: { status: 'success' }
  }, (e, res) => console.log('Response on job completion:',
    res.statusCode, res.statusMessage));
});
