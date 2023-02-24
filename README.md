# react-native-http-bridge-refurbished

[![npm](https://img.shields.io/npm/v/react-native-http-bridge-refurbished?style=for-the-badge)](https://www.npmjs.com/package/react-native-http-bridge-refurbished)
[![npm](https://img.shields.io/npm/dt/react-native-http-bridge-refurbished?style=for-the-badge)](https://www.npmjs.com/package/react-native-http-bridge-refurbished)
[![GitHub contributors](https://img.shields.io/github/contributors/Alwinator/react-native-http-bridge-refurbished?style=for-the-badge)](https://github.com/Alwinator/react-native-http-bridge-refurbished)
[![GitHub Repo stars](https://img.shields.io/github/stars/Alwinator/react-native-http-bridge-refurbished?style=for-the-badge)](https://github.com/Alwinator/react-native-http-bridge-refurbished)

A simple HTTP server for [React Native](https://github.com/facebook/react-native) based on [react-native-http-bridge](https://github.com/alwx/react-native-http-bridge).


Since 1.2.0 there is a new express-like syntax for handling requests. You can still use the old syntax:
```tsx
import {respond, start, stop} from 'react-native-http-bridge-refurbished';
```

## Install

```shell
npm install --save react-native-http-bridge-refurbished
```

## Example
```tsx
import React, {useEffect, useState} from 'react';
import {BridgeServer} from 'react-native-http-bridge-refurbished';
import {Text} from 'react-native';

function App(): JSX.Element {
    const [lastCalled, setLastCalled] = useState<number | undefined>();

    useEffect(() => {
        const server = new BridgeServer('http_service', true);
        server.get('/', async (req, res) => {
            // do something
            setLastCalled(Date.now());
            return {message: 'OK'}; // or res.json({message: 'OK'});
        });
        server.listen(3000);

        return () => {
            server.stop();
        };
    }, []);

    return (
        <Text>
            {lastCalled === undefined
                ? 'Request webserver to change text'
                : 'Called at ' + new Date(lastCalled).toLocaleString()}
        </Text>
    );
}

export default App;
```

After running the example you can send a request to the server using `curl`:

```shell
curl http://IP_OF_DEVICE:MY_PORT
```
For example:
```shell
curl http://192.168.1.109:3000
```
