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
/******/ 	return __webpack_require__(__webpack_require__.s = 325);
/******/ })
/************************************************************************/
/******/ ({

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = __webpack_require__(304);
const logger_client_1 = __webpack_require__(307);
exports.config = new server_config_1.ServerConfig(logger_client_1.clientConfig);


/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const left_pad_1 = __webpack_require__(305);
const rand_1 = __webpack_require__(306);
class ServerConfig {
    constructor(clientConfig, default_storageConnectionString_AppSettingName = 'AZURE_STORAGE_CONNECTION_STRING') {
        this.clientConfig = clientConfig;
        this.default_storageConnectionString_AppSettingName = default_storageConnectionString_AppSettingName;
        this.storageConnection = this.default_storageConnectionString_AppSettingName;
        this.http_route = this.clientConfig.sendLog_route;
        this.logQueue_queueName = 'log';
        // logOversizeQueue_queueName = 'log-oversize';
        // logOversizeBlob_path = `log-oversize/{DateTime}_{rand-guid}.json`;
        // getLogOversizeBlobName(bindingData: HttpFunction_BindingData) {
        //     return this.logOversizeBlob_path
        //         .replace('{DateTime}', bindingData.DateTime)
        //         .replace('{rand-guid}', bindingData['rand-guid'])
        //         ;
        // }
        this.logTable_tableName_fromQueueTrigger = `log`;
        // logTable_partitionKey_fromQueueTrigger = `{}`;
        // logTable_rowKey_fromQueueTrigger = ``;
        this.sessionLookupTable_tableName_fromQueueTrigger = `sessionuserlookup`;
        this.sessionLookupTable_partitionKey_fromQueueTrigger = `lookup-session-user`;
        this.sessionLookupTable_rowKey_fromQueueTrigger = `{sessionId}`;
        this.userLookupTable_tableName_fromQueueTrigger = `sessionuserlookup`;
        this.userLookupTable_partitionKey_fromQueueTrigger = `lookup-user-session`;
        this.userLookupTable_rowKey_fromQueueTrigger = `{userId}`;
    }
    getPartitionKey(item) {
        return `${item.userInfo.sessionId}`;
    }
    getRowKey(item) {
        // Avoid Collisions in case of bot using replay values (add Random and Date)
        return `${item.userInfo.userId}_t-${left_pad_1.leftPad(item.runTime, 10, '-')}_r-${rand_1.randHex(8)}_d-${Date.now()}`;
    }
}
exports.ServerConfig = ServerConfig;


/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Max Length 64
function leftPad(v, length, character = '') {
    let p = '0000000000000000000000000000000000000000000000000000000000000000';
    if (character) {
        p = p.replace(/0/g, character);
    }
    return (p + v).substr(-length);
}
exports.leftPad = leftPad;


/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// maxLength = 64
function randHex(length = 8) {
    return '0000000000000000000000000000000000000000000000000000000000000000'
        .substr(0, length).replace(/0/g, () => (0 | Math.random() * 16).toString(16));
}
exports.randHex = randHex;


/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const client_config_1 = __webpack_require__(308);
exports.clientConfig = new client_config_1.ClientConfig({
    timeBatchSeconds: 10,
    sendLog_domain: 'https://told-stack-demo.azureedge.net',
    // sendLog_domain: 'http://localhost:7071',
    sendLog_route: 'api/logger/send-log',
});


/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = __webpack_require__(49);
class ClientConfig {
    constructor(options) {
        this.maxSendSize = 32 * 1024;
        this.maxDataSize = 28 * 1024;
        this.sendLog_domain = '/';
        this.sendLog_route = 'api/logger/send-log';
        this.getSendLogUrl = () => `${this.sendLog_domain}/${this.sendLog_route}`;
        objects_1.assignPartial(this, options);
    }
}
exports.ClientConfig = ClientConfig;


/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_01_http_1 = __webpack_require__(326);
const logger_server_1 = __webpack_require__(303);
const run = function (...args) {
    function_01_http_1.runFunction.apply(null, [logger_server_1.config, ...args]);
};
global.__run = run;
module.exports = global.__run;


/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = __webpack_require__(49);
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
                name: "outLogQueue",
                type: "queue",
                direction: "out",
                queueName: config.logQueue_queueName,
                connection: config.storageConnection
            },
        ],
        disabled: false
    };
}
exports.createFunctionJson = createFunctionJson;
function runFunction(config, context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('START');
        // Handle Max Queue Size (64kb) -> Put in a blob
        const items = JSON.parse(req.body);
        if (!items) {
            context.res = {
                body: {
                    error: 'No Items Sent'
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            context.log('DONE');
            context.done();
            return;
        }
        context.log(`Received ${items.length} log items`);
        // if (JSON.stringify(items).length < this.config.maxQueueSize) {
        const c = req;
        const requestInfo = items.some(x => !!x.deviceInfo) ? {
            originalUrl: c.originalUrl,
            method: c.method,
            query: c.query,
            headers: c.headers
        } : undefined;
        const clientInfo = {
            ip: c.headers['x-forwarded-for'],
            userAgent: c.headers['user-agent'],
        };
        const groupByUserId = objects_1.groupToArray(items, x => x.userInfo.userId);
        context.bindings.outLogQueue = groupByUserId.map(g => ({
            items: g,
            sessionId: items[0].userInfo.sessionId || '',
            userId: items[0].userInfo.userId || '',
            ip: clientInfo.ip,
            userAgent: clientInfo.userAgent,
            requestInfo,
        }));
        context.log(`Stored in Queue`);
        // } else {
        //     context.bindings.outLogOversizeBlob = { items };
        //     context.bindings.outLogOversizeQueue = config.getLogOversizeBlobName(context.bindingData);
        //     context.log(`Stored in Oversize Blob`);
        // }
        context.res = {
            body: {
                ok: true
            },
            headers: {
                'Content-Type': 'application/json',
            }
        };
        context.log('DONE');
        context.done();
    });
}
exports.runFunction = runFunction;
;


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// export function objectToValueIterator<T>(obj: { [key: string]: T }): { [key: string]: T } & Iterable<T> {
Object.defineProperty(exports, "__esModule", { value: true });
//     const o = obj as any;
//     o[Symbol.iterator] = () => {
//         let keys = Object.getOwnPropertyNames(obj);
//         let i = 0;
//         return {
//             next: () => {
//                 const key = keys[i++];
//                 const value = obj[key];
//                 return {
//                     value,
//                     done: i >= keys.length
//                 };
//             }
//         };
//     };
//     return o;
// }
// export function objectToKeyValueIterator<T>(obj: { [key: string]: T }): { [key: string]: T } & Iterable<{ key: string, value: T }> {
//     const o = obj as any;
//     o[Symbol.iterator] = () => {
//         let keys = Object.getOwnPropertyNames(obj);
//         let i = 0;
//         return {
//             next: () => {
//                 const key = keys[i++];
//                 const value = obj[key];
//                 return {
//                     value: { key, value },
//                     done: i >= keys.length
//                 };
//             }
//         };
//     };
//     return o;
// }
function group(items, getKey) {
    const g = items.reduce((o, x) => {
        const k = getKey(x);
        const group = o[k] = o[k] || { items: [] };
        group.items.push(x);
        return o;
    }, {});
    //return objectToValueIterator(g);
    return g;
}
exports.group = group;
function groupToArray(items, getKey) {
    const g = group(items, getKey);
    return Object.getOwnPropertyNames(g).map(k => g[k].items);
}
exports.groupToArray = groupToArray;
function assignPartial(t, p) {
    for (let k in p) {
        if (p.hasOwnProperty(k)) {
            t[k] = p[k];
        }
    }
    return t;
}
exports.assignPartial = assignPartial;
function partialDeepCompare(actual, expected) {
    for (let k in expected) {
        const e = expected[k];
        const a = actual[k];
        if (e === a) {
            continue;
        }
        if ((e === undefined || e === null) && (a === undefined || a === null)) {
            continue;
        }
        if (typeof e === 'object' && typeof a === 'object' && partialDeepCompare(a, e)) {
            continue;
        }
        return false;
    }
    return true;
}
exports.partialDeepCompare = partialDeepCompare;
function deepCompare(actual, expected) {
    return partialDeepCompare(actual, expected) && partialDeepCompare(expected, actual);
}
exports.deepCompare = deepCompare;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map