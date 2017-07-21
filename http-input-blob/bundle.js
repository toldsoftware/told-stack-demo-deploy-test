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
/******/ 	return __webpack_require__(__webpack_require__.s = 353);
/******/ })
/************************************************************************/
/******/ ({

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_01_http_1 = __webpack_require__(354);
const http_input_blob_1 = __webpack_require__(355);
const run = function (...args) {
    function_01_http_1.runFunction.apply(null, [http_input_blob_1.config, ...args]);
};
global.__run = run;
module.exports = global.__run;


/***/ }),

/***/ 354:
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
                name: "inInputBlob",
                type: "blob",
                direction: "in",
                path: config.inputBlob_path,
                connection: config.inputBlob_connection
            },
        ],
        disabled: false
    };
}
exports.createFunctionJson = createFunctionJson;
function runFunction(config, context, req) {
    const data = context.bindings.inInputBlob;
    context.log('http-input-blob', data);
    context.res = {
        isRaw: true,
        body: data,
        headers: {
            'Content-Type': config.responseOptions.contentType || 'application/json',
            'Content-Encoding': config.responseOptions.contentEncoding || undefined,
            'Cache-Control': config.responseOptions.cacheControl || undefined,
        }
    };
    context.done();
}
exports.runFunction = runFunction;
;


/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(356);
exports.config = new config_1.Config();


/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = __webpack_require__(49);
class Config {
    constructor(options = {}) {
        this.http_routeRoot = 'api/http-input-blob';
        this.default_storageConnectionString_AppSettingName = 'AZURE_STORAGE_CONNECTION_STRING';
        this.responseOptions = {};
        this.http_route = this.http_routeRoot + '/{container}/{*blob}';
        this.inputBlob_path = '{container}/{blob}';
        this.inputBlob_connection = this.default_storageConnectionString_AppSettingName;
        objects_1.assignPartial(this, options);
    }
}
exports.Config = Config;


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