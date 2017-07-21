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
/******/ 	return __webpack_require__(__webpack_require__.s = 365);
/******/ })
/************************************************************************/
/******/ ({

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = __webpack_require__(268);
const client_1 = __webpack_require__(269);
const obtain_test_blob_data_1 = __webpack_require__(271);
exports.config = new server_config_1.ServerConfig(client_1.clientConfig, obtain_test_blob_data_1.obtainTestBlobData);
// // Test Fast Change
// config.timeToLiveSeconds = 1;
// config.timeExtendSeconds = 1;
// config.timeExecutionSeconds = 1; 


/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ServerConfig {
    constructor(clientConfig, obtainBlobData, default_storageConnectionString_AppSettingName = 'AZURE_STORAGE_CONNECTION_STRING') {
        this.clientConfig = clientConfig;
        this.obtainBlobData = obtainBlobData;
        this.default_storageConnectionString_AppSettingName = default_storageConnectionString_AppSettingName;
        this.timeToLiveSeconds = this.clientConfig.timeToLiveSeconds;
        this.timePollSeconds = this.clientConfig.timePollSeconds;
        this.timeExtendSeconds = 1;
        this.timeExecutionSeconds = 10;
        this.shouldGzip = this.clientConfig.shouldGzipDownloadBlob;
        this.updateRequestQueue_connection = this.default_storageConnectionString_AppSettingName;
        this.updateExecuteQueue_connection = this.default_storageConnectionString_AppSettingName;
        this.lookupTable_connection = this.default_storageConnectionString_AppSettingName;
        this.changeTable_connection = this.default_storageConnectionString_AppSettingName;
        this.dataRawBlob_connection = this.default_storageConnectionString_AppSettingName;
        this.dataDownloadBlob_connection = this.default_storageConnectionString_AppSettingName;
        // Slash in blobName is not supported (i.e. {*blobName}) because table partitionKey/rowKey cannot / in the name
        // http_route = this.apiRoutePath + '/{containerName}/{*blobName}';
        this.http_route = this.clientConfig.lookup_route + '/{containerName}/{blobName}';
        this.getDataDownloadBlobName = this.clientConfig.getDataDownloadBlobName;
        this.dataRawBlob_path_fromQueueTrigger = `{containerName}/{blobName}`;
        this.dataDownloadBlob_path_from_queueTrigger = `{containerName}/{blobName}/{timeKey}${this.shouldGzip ? '_gzip' : ''}`;
        this.http_dataDownload_route = this.clientConfig.downloadBlob_route + '/{containerName}/{blobName}/{timeKeyWithGzip}';
        this.dataDownloadBlob_path_from_http_dataDownload_route = `{containerName}/{blobName}/{timeKeyWithGzip}`;
        this.updateRequestQueue_queueName = 'lookup-lsc-update-request-queue';
        this.updateExecuteQueue_queueName = 'lookup-lsc-update-execute-queue';
        // These will encode to a url that receives parametes
        // Example: '{containerName}/{blobName}/_lookup.txt'
        this.lookupTable_tableName = `blobaccess`;
        this.lookupTable_partitionKey = `{containerName}_{blobName}`;
        this.lookupTable_rowKey = `lookup`;
        this.lookupTable_tableName_fromQueueTrigger = `blobaccess`;
        this.lookupTable_partitionKey_fromQueueTrigger = `{containerName}_{blobName}`;
        this.lookupTable_rowKey_fromQueueTrigger = `lookup`;
        this.changeTable_tableName = `blobaccess`;
        this.changeTable_partitionKey = `{containerName}_{blobName}`;
        this.changeTable_rowKey = `change`;
        this.changeTable_tableName_fromQueueTrigger = `blobaccess`;
        this.changeTable_partitionKey_fromQueueTrigger = `{containerName}_{blobName}`;
        this.changeTable_rowKey_fromQueueTrigger = `change`;
    }
    get timeToLiveSeconds_downloadBlob() { return this.timeToLiveSeconds * 4 + 300; }
    getDataDownloadBlobName_from_queueMessage(message) {
        return `${message.blobName}/${message.timeKey}${this.shouldGzip ? '_gzip' : ''}`;
    }
    getKeyFromRequest(req, bindingData) {
        const d = bindingData;
        return {
            containerName: d.containerName,
            blobName: d.blobName,
        };
    }
    getLookupTableRowKey_fromQueueTrigger(queueTrigger) {
        return {
            table: this.lookupTable_tableName_fromQueueTrigger
                .replace(/\{containerName\}/g, queueTrigger.containerName)
                .replace(/\{blobName\}/g, queueTrigger.blobName),
            partition: this.lookupTable_partitionKey_fromQueueTrigger
                .replace(/\{containerName\}/g, queueTrigger.containerName)
                .replace(/\{blobName\}/g, queueTrigger.blobName),
            row: this.lookupTable_rowKey_fromQueueTrigger
                .replace(/\{containerName\}/g, queueTrigger.containerName)
                .replace(/\{blobName\}/g, queueTrigger.blobName),
        };
    }
    getChangeTableRowKey_fromQueueTrigger(queueTrigger) {
        return {
            table: this.changeTable_tableName_fromQueueTrigger
                .replace(/\{containerName\}/g, queueTrigger.containerName)
                .replace(/\{blobName\}/g, queueTrigger.blobName),
            partition: this.changeTable_partitionKey_fromQueueTrigger
                .replace(/\{containerName\}/g, queueTrigger.containerName)
                .replace(/\{blobName\}/g, queueTrigger.blobName),
            row: this.changeTable_rowKey_fromQueueTrigger
                .replace(/\{containerName\}/g, queueTrigger.containerName)
                .replace(/\{blobName\}/g, queueTrigger.blobName),
        };
    }
}
exports.ServerConfig = ServerConfig;


/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const client_config_1 = __webpack_require__(270);
exports.clientConfig = new client_config_1.ClientConfig({
    // lookup_domain: 'https://told-stack-demo.azurewebsites.net',
    // downloadBlob_domain: 'https://told-stack-demo.azurewebsites.net',
    lookup_domain: 'https://told-stack-demo.azureedge.net',
    downloadBlob_domain: 'https://told-stack-demo.azureedge.net',
    lookup_route: 'api/lookup-lsc',
    downloadBlob_route: 'api/lookup-lsc-download'
});


/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = __webpack_require__(49);
class ClientConfig {
    constructor(options) {
        this.timePollSeconds = 1;
        this.maxPollCount = 5;
        this.timeToLiveSeconds = 60;
        this.lookup_domain = '/';
        this.lookup_route = 'api/lookup-lsc';
        this.downloadBlob_domain = '/';
        this.downloadBlob_route = 'blob';
        // WARNING: Gzip is not working in the 4th step: Reading from .gzip blob with node and sending to client
        // In addition, since using a function instead of proxy, gzip is done automatically by the function
        // So it is not needed, and would only be useful to reduce storage size at the cost of increased processing
        this.shouldGzipDownloadBlob = false;
        objects_1.assignPartial(this, options);
    }
    getLookupUrl(key) {
        return `${this.lookup_domain}/${this.lookup_route}/${key.containerName}/${key.blobName}`;
    }
    getDataDownloadUrl(key, lookup) {
        return `${this.downloadBlob_domain}/${this.downloadBlob_route ? this.downloadBlob_route + '/' : ''}${key.containerName}/${this.getDataDownloadBlobName(key.blobName, lookup)}`;
    }
    getDataDownloadBlobName(blobName, lookup) {
        // TODO: Test if works with .ext and switch to underscore if needed
        return `${blobName}/${lookup.timeKey}${this.shouldGzipDownloadBlob ? '_gzip' : ''}`;
    }
}
exports.ClientConfig = ClientConfig;


/***/ }),

/***/ 271:
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
function obtainTestBlobData(oldBlob, key) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            data: {
                key,
                time: new Date(),
                oldBlob
            }
        };
    });
}
exports.obtainTestBlobData = obtainTestBlobData;


/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_01_http_1 = __webpack_require__(366);
const server_1 = __webpack_require__(267);
const run = function (...args) {
    function_01_http_1.runFunction.apply(null, [server_1.config, ...args]);
};
global.__run = run;
module.exports = global.__run;


/***/ }),

/***/ 366:
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
// Http Request: Handle Update Request
// Table In: Read Old Lookup Blob Value
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
                name: "inLookupTable",
                type: "table",
                direction: "in",
                tableName: config.lookupTable_tableName,
                partitionKey: config.lookupTable_partitionKey,
                rowKey: config.lookupTable_rowKey,
                connection: config.lookupTable_connection
            },
            {
                name: "outUpdateRequestQueue",
                type: "queue",
                direction: "out",
                queueName: config.updateRequestQueue_queueName,
                connection: config.updateRequestQueue_connection
            },
        ],
        disabled: false
    };
}
exports.createFunctionJson = createFunctionJson;
function runFunction(config, context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('START');
        const dataKey = config.getKeyFromRequest(req, context.bindingData);
        const lookup = context.bindings.inLookupTable;
        context.log('Lookup', { lookup });
        // If the blob value is not stale
        // Return Current Blob Value with Long TTL
        const remainingTtl = lookup && lookup.timeKey
            && Math.ceil((parseInt(lookup.timeKey) + config.timeToLiveSeconds * 1000 - Date.now()) / 1000);
        context.log('remainingTtl', { remainingTtl, timeKey: lookup, timeToLiveSeconds: config.timeToLiveSeconds, now: Date.now() });
        if (remainingTtl > config.timeExtendSeconds) {
            context.log('Return Old Lookup', { lookup, remainingTtl });
            // Return Old Lookup (Long TTL)
            context.res = {
                body: {
                    timeKey: lookup.timeKey,
                    timeToExpireSeconds: remainingTtl
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': `public, max-age=${remainingTtl}`
                }
            };
            context.log('DONE');
            context.done();
            return;
        }
        context.log('Request Update');
        // Set Update Request Queue
        context.bindings.outUpdateRequestQueue = Object.assign({}, dataKey, { timeKey: '' + Date.now() });
        // Return Current Blob Value with Short TTL
        if (!lookup) {
            context.log('Missing Lookup (First Time?)');
            context.res = {
                body: {
                    error: `Not Ready Yet: Try again in ${config.timePollSeconds} Seconds`,
                    timeToExpireSeconds: config.timePollSeconds,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': `public, max-age=${config.timeExtendSeconds}`,
                }
            };
            // context.res = {
            //     status: 400,
            //     body: `Not Ready Yet: Try again in ${config.timePollSeconds} Seconds`,
            //     headers: {
            //         'Cache-Control': `public, max-age=${config.timeExtendSeconds}`
            //     }
            // };
            context.log('DONE');
            context.done();
            return;
        }
        // Return Old Lookup (Short)
        context.log('Return Old Lookup with Short TTL while Getting New Lookup and Value');
        context.res = {
            body: {
                timeKey: lookup.timeKey,
                timeToExpireSeconds: config.timeExtendSeconds,
            },
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': `public, max-age=${config.timeExtendSeconds}`,
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