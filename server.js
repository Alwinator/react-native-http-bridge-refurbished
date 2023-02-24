import httpServer from "./index";

class Request {
  constructor(rawRequest) {
    this.requestId = rawRequest.requestId;
    this.postData = rawRequest.postData;
    this.type = rawRequest.type;
    this.url = rawRequest.url;
  }
  get data() {
    return JSON.parse(this.postData);
  }
}
class Response {
  constructor(requestId) {
    this.requestId = requestId;
    this.closed = false;
  }

  send(code, type, body) {
    if (this.closed) {
      throw new Error('Response already sent');
    }

    httpServer.respond(this.requestId, code, type, body);
    this.closed = true;
  }
  json(obj, code = 200) {
    this.send(code, 'application/json', JSON.stringify(obj));
  }
  html(html, code = 200) {
    return this.send(code, 'text/html', html);
  }
}

class BridgeServer {
  static server;

  constructor(serviceName, devMode=false) {
    if (!serviceName) {
      throw new Error('Invalid service name');
    }
    if (BridgeServer.server) {
      if (devMode) {
        BridgeServer.server.stop();
      } else {
        throw new Error(
          'Only one instance of HttpServer is allowed. Use HttpServer.server to access the instance.',
        );
      }
    }

    this.callbacks = [];

    this.serviceName = serviceName;
    BridgeServer.server = this;
  }

  get(url, callback) {
    this.callbacks.push({method: 'GET', url, callback});
  }
  post(url, callback) {
    this.callbacks.push({method: 'POST', url, callback});
  }
  put(url, callback) {
    this.callbacks.push({method: 'PUT', url, callback});
  }
  delete(url, callback) {
    this.callbacks.push({method: 'DELETE', url, callback});
  }
  patch(url, callback) {
    this.callbacks.push({method: 'PATCH', url, callback});
  }
  use(callback) {
    this.callbacks.push({method: '*', url: '*', callback});
  }

  listen(port) {
    if (port < 0 || port > 65535) {
      throw new Error('Invalid port number');
    }

    httpServer.start(port, this.serviceName, async rawRequest => {
      const request = new Request(rawRequest);

      const callbacks = this.callbacks.filter(
        c =>
          (c.method === request.type || c.method === '*') &&
          (c.url === request.url || c.url === '*'),
      );

      for (const c of callbacks) {
        const response = new Response(request.requestId);
        const result = await c.callback(request, response);

        if (result) {
          response.json(result);
        }
        if (response.closed) {
          return;
        }
      }
    });
  }
  stop() {
    httpServer.stop();
  }
}
module.exports = {
    BridgeServer,
    Request,
    Response,
};
