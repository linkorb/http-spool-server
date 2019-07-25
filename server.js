const uuid = require('uuid/v1');
const express = require('express');
const bodyParser = require('body-parser');

const queue = [];
const activeConnections = [];

const proxyServer = express();
const queueServer = express();

const proxyPort = process.env.PROXY_PORT;
const queuePort = process.env.QUEUE_PORT;

const BODY_LIMIT = process.env.BODY_LIMIT || 50;

proxyServer.use(bodyParser.json({ limit: `${BODY_LIMIT}mb` }));
queueServer.use(bodyParser.json({ limit: `${BODY_LIMIT}mb` }));

proxyServer.all('*', pushJob);

queueServer.get('/jobs/fetch', getJob);
queueServer.post('/jobs/:id/response', response);

proxyServer.listen(proxyPort, () =>
  console.log(`Proxy server started on port ${proxyPort}`));

queueServer.listen(queuePort, () =>
  console.log(`Queue server started on port ${queuePort}`));

function pushJob(req, res) {
  const { headers, body } = req;

  const id = uuid();

  queue.push({ id, headers, body });
  activeConnections.push({ id, res });
}

function getJob(req, res) {
  const lastJob = queue.pop();

  if (!lastJob) return res.status(204).send('No content');

  res.send(lastJob);
}

function response(req, res) {
  const response = activeConnections.find(res => res.id === req.params.id);

  activeConnections.splice(activeConnections.indexOf(response), 1);

  res.sendStatus(200);
  response.res.send(req.body);
}
