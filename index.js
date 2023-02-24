'use strict';

import httpServer from "./httpServer";
import bridgeServer from "./bridgeServer";

module.exports = {
    ...httpServer,
    ...bridgeServer
}
