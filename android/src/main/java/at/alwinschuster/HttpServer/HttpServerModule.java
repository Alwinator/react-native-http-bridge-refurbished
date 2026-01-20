package at.alwinschuster.HttpServer;

import android.content.Context;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;

import android.util.Log;

public class HttpServerModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    ReactApplicationContext reactContext;

    private static final String MODULE_NAME = "HttpServer";

    private static int port;
    private static Server server = null;

    public HttpServerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void start(int port, String serviceName) {
        Log.d(MODULE_NAME, "Initializing server...");
        this.port = port;

        startServer();
    }

    @ReactMethod
    public void stop() {
        Log.d(MODULE_NAME, "Stopping server...");

        stopServer();
    }

    @ReactMethod
    public void respond(String requestId, int code, String type, String body) {
        if (server != null) {
            server.respond(requestId, code, type, body);
        }
    }

    @ReactMethod
    public void respondFile(String requestId, int code, String type, String filePath) {
        if (server != null) {
            server.respondFile(requestId, code, type, filePath);
        }
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Set up any upstream listeners or background tasks as necessary
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        stopServer();
    }

    private void startServer() {
        if (this.port == 0) {
            return;
        }

        if (server == null) {
            server = new Server(reactContext, port);
        }
        try {
            server.start();
        } catch (IOException e) {
            Log.e(MODULE_NAME, e.getMessage());
        }
    }

    private void stopServer() {
        if (server != null) {
            server.stop();
            server = null;
            port = 0;
        }
    }
}
