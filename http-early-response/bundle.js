/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 333);
/******/ })
/************************************************************************/
/******/ ({

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_01_http_1 = __webpack_require__(334);
const http_early_response_1 = __webpack_require__(335);
const run = function (...args) {
    function_01_http_1.runFunction.apply(null, [http_early_response_1.config, ...args]);
};
global.__run = run;
module.exports = global.__run;


/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Http Request: Handle Update Request
// Blob In: Read Old Lookup Blob Value
// Queue Out: Update Request Queue
// Http Response: Return Old Lookup Value with Short TTL
function createFunctionJson(config) {
    return {
        bindings: [
            {
                name: "req",
                type: "httpTrigger",
                direction: "in",
                authLevel: "anonymous",
                route: config.http_route
            },
            {
                name: "res",
                type: "http",
                direction: "out"
            },
            {
                name: "outOutputQueue",
                type: "queue",
                direction: "out",
                queueName: config.outputQueue_queueName,
                connection: config.outputQueue_connection
            },
        ],
        disabled: false
    };
}
exports.createFunctionJson = createFunctionJson;
function runFunction(config, context, req) {
    context.log('START Immediate Response');
    context.res = {
        body: 'The Data will be Queued',
        headers: {
            'Content-Type': 'text/plain'
        }
    };
    // EXPERIMENT: Will the response be sent before the done call?
    // Wait 5 Seconds before marking done
    // Test how quickly the response is received.
    // RESULT: The response is not processed until context.done() is called
    context.log('Wait 5 Seconds');
    setTimeout(() => {
        context.log('Queue Message');
        const data = config.getDataFromRequest(req, context.bindingData);
        context.bindings.outOutputQueue = data;
        context.log('DONE');
        context.done();
    }, 5000);
}
exports.runFunction = runFunction;
;


/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(336);
exports.config = new config_1.Config();


/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(http_routeRoot = 'api/http-early-response', default_storageConnectionString_AppSettingName = 'AZURE_STORAGE_CONNECTION_STRING') {
        this.http_routeRoot = http_routeRoot;
        this.default_storageConnectionString_AppSettingName = default_storageConnectionString_AppSettingName;
        this.http_route = this.http_routeRoot + '/{key}';
        this.outputQueue_queueName = 'http-to-queue-output-queue';
        this.outputQueue_connection = this.default_storageConnectionString_AppSettingName;
    }
    getDataFromRequest(req, bindingData) {
        return { key: bindingData.key, value: req.body };
    }
}
exports.Config = Config;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map