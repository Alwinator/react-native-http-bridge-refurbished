# react-native-http-bridge-refurbished

[![npm](https://img.shields.io/npm/v/react-native-http-bridge-refurbished?style=for-the-badge)](https://www.npmjs.com/package/react-native-http-bridge-refurbished)
[![npm](https://img.shields.io/npm/dt/react-native-http-bridge-refurbished?style=for-the-badge)](https://www.npmjs.com/package/react-native-http-bridge-refurbished)
[![GitHub contributors](https://img.shields.io/github/contributors/Alwinator/react-native-http-bridge-refurbished?style=for-the-badge)](https://github.com/Alwinator/react-native-http-bridge-refurbished)
[![GitHub Repo stars](https://img.shields.io/github/stars/Alwinator/react-native-http-bridge-refurbished?style=for-the-badge)](https://github.com/Alwinator/react-native-http-bridge-refurbished)

A maintained fork of [react-native-http-bridge](https://github.com/alwx/react-native-http-bridge). 

Simple HTTP server for [React Native](https://github.com/facebook/react-native).

Since 0.5.0 supports and handles GET, POST, PUT and DELETE requests.
The library can be useful for handling requests with `application/json` content type
(and this is the only content type we support at the current stage) and returning different responses.

Since 0.6.0 can handle millions of requests at the same time and also includes some very basic support for [React Native QT](https://github.com/status-im/react-native-desktop). 

## Install

```shell
npm install --save react-native-http-bridge-refurbished
```

## Example

```tsx
import React, {useEffect} from 'react';
import {respond, start, stop} from 'react-native-http-bridge-refurbished';
import {Text} from 'react-native';

function App(): JSX.Element {
    const [logs, setLogs] = React.useState<string[]>([]);

    useEffect(() => {
        start(5561, 'http_service', request => {
            // you can use request.url, request.type and request.postData here
            if (request.type === 'GET') {
                setLogs([...logs, request.url]);
                respond(
                    request.requestId,
                    200,
                    'application/json',
                    '{"message": "OK"}',
                );
            }

            return () => {
                stop();
            };
        });
    }, [logs]);

    return (
        <Text>
            {logs.length === 0 ? 'Request webserver to change text' : logs.join('\n')}
        </Text>
    );
}

export default App;
```

After running the example you can send a request to the server using `curl`:

```shell
curl http://IP_OF_DEVICE:MY_PORT/hello
```
For example:
```shell
curl http://192.168.1.109:5561/hello
```
