'use strict';

import {NativeEventEmitter, NativeModules} from 'react-native';
const Server = NativeModules.HttpServer;
const ServerEventEmitter = new NativeEventEmitter(Server);

module.exports = {
    start: function (port, serviceName, callback) {
        if (port === 80) {
            throw "Invalid server port specified. Port 80 is reserved.";
        }

        Server.start(port, serviceName);
        ServerEventEmitter.addListener('httpServerResponseReceived', callback);
    },

    stop: () => {
        Server.stop();
        ServerEventEmitter.removeAllListeners('httpServerResponseReceived');
    },

    respond: (requestId, code, type, body) => Server.respond(requestId, code, type, body),
    
    respondFile: (requestId, code, type, filePath) => Server.respondFile(requestId, code, type, filePath)
}
