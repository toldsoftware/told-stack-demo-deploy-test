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
/******/ 	return __webpack_require__(__webpack_require__.s = 361);
/******/ })
/************************************************************************/
/******/ ({

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_01_http_1 = __webpack_require__(362);
const http_input_table_1 = __webpack_require__(363);
const run = function (...args) {
    function_01_http_1.runFunction.apply(null, [http_input_table_1.config, ...args]);
};
global.__run = run;
module.exports = global.__run;


/***/ }),

/***/ 362:
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
                name: "inInputTable",
                type: "table",
                direction: "in",
                tableName: config.inputTable_tableName,
                partitionKey: config.inputTable_partitionKey,
                rowKey: config.inputTable_rowKey,
                connection: config.inputTable_connection
            },
        ],
        disabled: false
    };
}
exports.createFunctionJson = createFunctionJson;
function runFunction(config, context, req) {
    const data = context.bindings.inInputTable;
    context.res = {
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    context.done();
}
exports.runFunction = runFunction;
;


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(364);
exports.config = new config_1.Config();


/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(http_routeRoot = 'api/http-input-table', default_storageConnectionString_AppSettingName = 'AZURE_STORAGE_CONNECTION_STRING') {
        this.http_routeRoot = http_routeRoot;
        this.default_storageConnectionString_AppSettingName = default_storageConnectionString_AppSettingName;
        this.http_route = this.http_routeRoot + '/{table}/{partition}/{row}';
        this.inputTable_tableName = '{table}';
        this.inputTable_partitionKey = '{partition}';
        this.inputTable_rowKey = '{row}';
        this.inputTable_connection = this.default_storageConnectionString_AppSettingName;
    }
    getDataFromRequest(req, bindingData) {
        return { key: { container: bindingData.container, blob: bindingData.blob }, value: req.body };
    }
}
exports.Config = Config;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map