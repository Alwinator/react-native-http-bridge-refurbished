'use strict';

import {DeviceEventEmitter} from 'react-native';
import {NativeModules} from 'react-native';
const Server = NativeModules.HttpServer;

module.exports = {
    start: function (port, serviceName, callback) {
        if (port === 80) {
            throw "Invalid server port specified. Port 80 is reserved.";
        }

        Server.start(port, serviceName);
        DeviceEventEmitter.addListener('httpServerResponseReceived', callback);
    },

    stop: () => {
        Server.stop();
        DeviceEventEmitter.removeAllListeners('httpServerResponseReceived');
    },

    respond: (requestId, code, type, body) => Server.respond(requestId, code, type, body)
}
