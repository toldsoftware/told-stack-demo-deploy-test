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
/******/ 	return __webpack_require__(__webpack_require__.s = 321);
/******/ })
/************************************************************************/
/******/ ({

/***/ 30:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_01_http_1 = __webpack_require__(322);
const static_server_1 = __webpack_require__(323);
const run = function (...args) {
    function_01_http_1.runFunction.apply(null, [static_server_1.config, ...args]);
};
global.__run = run;
module.exports = global.__run;


/***/ }),

/***/ 322:
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
const fs = __webpack_require__(30);
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
                direction: "out",
            },
        ],
        disabled: false
    };
}
exports.createFunctionJson = createFunctionJson;
function runFunction(config, context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('START', { query: req.query });
        let p = '';
        try {
            p = config.getPath(req);
        }
        catch (err) {
            context.res = {
                isRaw: true,
                body: {
                    error: 'File Path Error',
                    also: 'Ain\'t nobody got time for that',
                    ref: 'https://youtu.be/Nh7UgAprdpM',
                },
                headers: {
                    'Cache-Control': 'max-age=300, public',
                    'Content-Type': 'application/json',
                }
            };
            context.log('ERROR', { err });
            context.done();
            return;
        }
        context.log('Reading File', { p, query: req.query });
        fs.readFile(p, (err, data) => {
            context.log('readFile', { p, err });
            if (err != null) {
                context.res = {
                    status: 404,
                    body: `File not found: ${p}`,
                    headers: {
                        'Cache-Control': 'max-age=15, public',
                        'Content-Type': 'text/plain',
                    }
                };
                context.log('readFile ERROR', { p, err });
                context.done();
                return;
            }
            let type = 'text/plain';
            let shouldInject = false;
            if (p.match('\.html$')) {
                type = 'text/html';
                shouldInject = true;
            }
            if (p.match('\.css$')) {
                type = 'text/css';
                shouldInject = true;
            }
            if (p.match('\.js$')) {
                type = 'application/x-javascript';
                shouldInject = true;
            }
            if (p.match('\.json$')) {
                type = 'application/json';
                shouldInject = true;
            }
            if (p.match('\.jpg$')) {
                type = 'image/jpeg';
            }
            if (p.match('\.png$')) {
                type = 'image/png';
            }
            if (p.match('\.gif$')) {
                type = 'image/gif';
            }
            if (p.match('\.ico$')) {
                type = 'image/x-icon';
            }
            let body = data;
            if (shouldInject) {
                const injectVars = Object.getOwnPropertyNames(process.env)
                    .filter(k => k.indexOf(config.injectSettingsPrefix) === 0)
                    .map(k => ({
                    find: k.replace(config.injectSettingsPrefix, ''),
                    replace: process.env[k],
                }));
                context.log('injectVars', { injectVars });
                if (injectVars.length) {
                    let dataStr = data.toString('utf8');
                    Object.getOwnPropertyNames(process.env).forEach(x => {
                        if (x.indexOf(config.injectSettingsPrefix) !== 0) {
                            return;
                        }
                        const find = x.replace(config.injectSettingsPrefix, '');
                        const replace = process.env[x];
                        dataStr = dataStr.split(find).join(replace);
                    });
                    body = dataStr;
                }
            }
            context.res = {
                isRaw: true,
                body,
                headers: {
                    'Cache-Control': 'max-age=300, public',
                    'Content-Type': type,
                }
            };
            context.log('DONE', { bodyType: Object.getPrototypeOf(body).name, bodyLength: body.length });
            context.done();
        });
    });
}
exports.runFunction = runFunction;


/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = __webpack_require__(324);
exports.config = new server_config_1.ServerConfig();


/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(37);
const fs = __webpack_require__(30);
class ServerConfig {
    constructor(injectSettingsPrefix = 'INJECT_', pathToStatic = '../static', apiRoute = 'api/static') {
        this.injectSettingsPrefix = injectSettingsPrefix;
        this.pathToStatic = pathToStatic;
        this.apiRoute = apiRoute;
        this.http_route = this.apiRoute;
    }
    getPath(req) {
        const filename = req.query.file
            || 'index.html';
        const dir = path.join(__dirname, '../static');
        let p = path.join(dir, filename);
        if (fs.statSync(p).isDirectory()) {
            p = path.join(p, 'index.html');
        }
        return p;
    }
}
exports.ServerConfig = ServerConfig;


/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map