const request = require('request');
const workerQueueEndpoint = process.env.WORKER_QUEUE_ENDPOINT;

request({ url: workerQueueEndpoint + '/jobs/fetch' }, (e, res, body) => {
  console.log('Fetching last job:', res.statusCode, res.statusMessage);

  if (!body) return;

  console.log(body);

  request({
    url: workerQueueEndpoint + `/jobs/${JSON.parse(body).id}/response`,
    method: 'post',
    json: { status: 'success' }
  }, (e, res) => console.log('Response on job completion:',
    res.statusCode, res.statusMessage));
});
