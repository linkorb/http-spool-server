# http-spool-server
HTTP Spool Server

## Deployment

1. Install dependencies:

```sh
    npm install
```

2. Copy and set environment variables:

```sh
    cp env.sample .env
```

Variable                 | Description
-------------------------|----------------------------------
PROXY_PORT               | Proxy server port
QUEUE_PORT               | Job queue server port
WORKER_QUEUE_ENDPOINT    | HTTP(s) endpoint for the worker to access the queue
BODY_LIMIT               | Body size limit (MB)

3. Start the servers:

```sh
    npm run start
```

## Testing

Make an http request, e.g.:

```sh
  curl -d '{"data": "test"}' \
    -H 'Content-Type: application/json' \
    -x http://127.0.0.1:3000 \
    http://www.google.com/search?q=test
```

Job with request data will be pushed to queue:

```json
  {
    "id": "22365cb0-a267-11e9-a7ce-5d3331ba802a",
    "headers": {
      "host": "www.google.com",
      "user-agent": "curl/7.54.0",
      "accept": "*/*",
      "proxy-connection": "Keep-Alive",
      "content-type": "application/json",
      "content-length": "16"
    },
    "body": {
      "data": "test"
    }
  }
```

You can run a simple test worker that fetches last job from queue
and responses to `/jobs/{jobId}/response` endpoint:

```sh
  npm run worker
```
