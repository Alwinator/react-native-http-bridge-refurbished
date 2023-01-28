declare module "react-native-http-bridge-refurbished" {
    function start(
        port: number,
        serviceName: string,
        callback: (request: {
            requestId: string;
            postData?: {};
            type: string;
            url: string;
        }) => void
    ): void;

    function stop(): void;

    function respond(
        requestId: string,
        code: number,
        type: string,
        body: string
    ): void;
}
