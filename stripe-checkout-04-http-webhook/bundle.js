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
/******/ 	return __webpack_require__(__webpack_require__.s = 458);
/******/ })
/************************************************************************/
/******/ ({

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createTrigger(trigger) {
    const t = Object.assign({}, trigger);
    for (let k in t) {
        t[k] = `{${k}}`;
    }
    return t;
}
exports.createTrigger = createTrigger;
function build_createFunctionJson(config, cf) {
    return cf(config).build_functionJson();
}
exports.build_createFunctionJson = build_createFunctionJson;
function build_runFunction_http(cf, runFunction) {
    return runFunction;
}
exports.build_runFunction_http = build_runFunction_http;
function build_runFunction_common(cf, runFunction) {
    return runFunction;
}
exports.build_runFunction_common = build_runFunction_common;
class FunctionBuilder {
    constructor(bindingData) {
        this._bindings = {};
        this._bindingData_trigger = createTrigger(bindingData);
    }
    bindings(getBindings) {
        const bindings = getBindings(this._bindingData_trigger);
        // Add Bindings
        for (let k in bindings) {
            this._bindings[k] = bindings[k];
            // Use name to set direction
            if (k.match('^in')) {
                this._bindings[k].direction = 'in';
            }
            else if (k.match('^out')) {
                this._bindings[k].direction = 'out';
            }
            // Use name to set type
            if (k.match('Queue$')) {
                this._bindings[k].type = 'queue';
            }
            else if (k.match('Table$')) {
                this._bindings[k].type = 'table';
            }
            else if (k.match('Blob$')) {
                this._bindings[k].type = 'blob';
            }
            else if (k.match('QueueTrigger$')) {
                this._bindings[k].type = 'queueTrigger';
            }
            else if (k.match('TableTrigger$')) {
                this._bindings[k].type = 'tableTrigger';
            }
            else if (k.match('BlobTrigger$')) {
                this._bindings[k].type = 'blobTrigger';
            }
        }
        return this;
    }
    // Functions Json
    build_functionJson() {
        // return {
        //     bindings: [
        //         {
        //             name: 'req',
        //             type: 'httpTrigger',
        //             direction: 'in',
        //             authLevel: 'anonymous',
        //             route: config.submit_route
        //         },
        //         {
        //             name: 'res',
        //             type: 'http',
        //             direction: 'out'
        //         },
        //         {
        //             name: 'outProcessQueue',
        const bObj = this._bindings;
        const b = Object.getOwnPropertyNames(bObj).map(k => {
            const o = bObj[k];
            return Object.assign({ name: k }, o);
        });
        return {
            bindings: b,
        };
    }
    // Runtime
    build_runtimeTypes() {
        return null;
    }
}
exports.FunctionBuilder = FunctionBuilder;
function buildFunction_http(options) {
    // {
    //     name: 'req',
    //     type: 'httpTrigger',
    //     direction: 'in',
    //     authLevel: 'anonymous',
    //     route: config.submit_route
    // },
    // {
    //     name: 'res',
    //     type: 'http',
    //     direction: 'out'
    // },
    const b = new FunctionBuilder({});
    const b2 = b.bindings(t => ({
        req: {
            type: 'httpTrigger',
            direction: 'in',
            authLevel: 'anonymous',
            route: options.route,
        },
        res: {
            type: 'http',
            direction: 'out'
        }
    }));
    return b2;
}
exports.buildFunction_http = buildFunction_http;
function buildFunction_common(bindingData) {
    return new FunctionBuilder(bindingData);
}
exports.buildFunction_common = buildFunction_common;
function build_binding(binding) {
    return binding;
}
exports.build_binding = build_binding;


/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_builder_1 = __webpack_require__(253);
exports.processQueueTrigger = function_builder_1.createTrigger({
    emailHash: '',
    serverCheckoutId: '',
});
exports.statusHttpTrigger = exports.processQueueTrigger;
var GetUserResultError;
(function (GetUserResultError) {
    GetUserResultError["NoError"] = "";
    GetUserResultError["EmailBelongsToAnotherUser_RequireLogin"] = "EmailBelongsToAnotherUser_RequireLogin";
})(GetUserResultError = exports.GetUserResultError || (exports.GetUserResultError = {}));
class ServerConfig {
    constructor(clientConfig, runtimeConfig, default_storageConnectionString_AppSettingName = 'AZURE_STORAGE_CONNECTION_STRING', stripeSecretKey_AppSettingName = 'STRIPE_SECRET_KEY', stripeWebhookSigningSecret_AppSettingName = 'STRIPE_WEBHOOK_SIGNING_SECRET') {
        this.clientConfig = clientConfig;
        this.runtimeConfig = runtimeConfig;
        this.default_storageConnectionString_AppSettingName = default_storageConnectionString_AppSettingName;
        this.stripeSecretKey_AppSettingName = stripeSecretKey_AppSettingName;
        this.stripeWebhookSigningSecret_AppSettingName = stripeWebhookSigningSecret_AppSettingName;
        this.runtime = this.runtimeConfig;
        this.storageConnection = this.default_storageConnectionString_AppSettingName;
        this.submit_route = this.clientConfig.submit_route;
        this.status_route = this.clientConfig.status_route;
        this.webhook_route = 'webhook/stripe';
        this.getEmailHash = this.clientConfig.getEmailHash;
    }
    getBinding_processQueue() {
        return {
            queueName: 'stripe-checkout-request',
            connection: this.storageConnection
        };
    }
    getBinding_stripeWebhookQueue() {
        return {
            queueName: 'stripe-webhook',
            connection: this.storageConnection
        };
    }
    getBinding_stripeCheckoutTable_fromTrigger(trigger) {
        return {
            tableName: 'stripe',
            partitionKey: `${trigger.emailHash}`,
            rowKey: `${trigger.serverCheckoutId}`,
            connection: this.storageConnection
        };
    }
    getBinding_stripeCustomerLookupTable_fromTrigger(trigger) {
        return {
            tableName: 'stripe',
            partitionKey: `${trigger.emailHash}`,
            rowKey: `lookup-email-customer`,
            connection: this.storageConnection
        };
    }
    getBinding_stripeUserLookupTable_fromTrigger(trigger) {
        return {
            tableName: 'stripe',
            partitionKey: `${trigger.emailHash}`,
            rowKey: `lookup-email-user`,
            connection: this.storageConnection
        };
    }
    getStripeSecretKey() {
        return process.env[this.stripeSecretKey_AppSettingName];
    }
    getStripeWebhookSigningSecret() {
        return process.env[this.stripeWebhookSigningSecret_AppSettingName];
    }
}
exports.ServerConfig = ServerConfig;


/***/ }),

/***/ 255:
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
const client_config_1 = __webpack_require__(259);
exports.clientConfig = new client_config_1.ClientConfig({
    stripePublishableKey: 'pk_stripe_publishable_key_1234',
    checkoutOptions: {
        business: {
            name: 'Told Software',
            imageUrl: 'https://toldstackdemo.blob.core.windows.net/images/ToldLogo128.png',
            statementDescriptor: 'ToldSoft',
        },
        requirements: {
            requireZipCode: true,
            requireBillingAddress: true,
        },
        experience: {
            allowRememberMe: true
        },
    },
}, () => __awaiter(this, void 0, void 0, function* () { return ({ userToken: 'userToken42' }); }));


/***/ }),

/***/ 258:
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
const server_config_1 = __webpack_require__(254);
const stripe_client_1 = __webpack_require__(255);
const execute_stripe_checkout_1 = __webpack_require__(261);
const runtimeConfig = {
    executeRequest: execute_stripe_checkout_1.executeRequest,
    lookupUserByUserToken: (token) => __awaiter(this, void 0, void 0, function* () { return ({ userId: '42' }); }),
    getOrCreateCurrentUserId: (email) => __awaiter(this, void 0, void 0, function* () { return ({ userId: '42' }); }),
};
exports.config = new server_config_1.ServerConfig(stripe_client_1.clientConfig, runtimeConfig);


/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = __webpack_require__(49);
const hash_1 = __webpack_require__(260);
class ClientConfig {
    constructor(options, getUserToken) {
        this.options = options;
        this.getUserToken = getUserToken;
        this.domain = '/';
        this.submit_route = 'api/stripe-checkout-submit';
        this.status_route_partial = 'api/stripe-checkout-status';
        objects_1.assignPartial(this, options);
    }
    get status_route() { return `${this.status_route_partial}/{emailHash}/{serverCheckoutId}`; }
    getSubmitTokenUrl() {
        return `${this.domain}${this.submit_route}`;
    }
    getCheckoutStatusUrl(email, serverCheckoutId) {
        return `${this.domain}${this.status_route_partial}/${this.getEmailHash(email)}/${serverCheckoutId}`;
    }
    getEmailHash(email) {
        return hash_1.hashEmail_partial(email);
    }
    getStripeChargeMetadata(options) {
        return Object.assign({}, options.user, options.product);
    }
    getStripeChargeStatementDescriptor(options) {
        return `${options.business.statementDescriptor} ${options.product.statementDescriptor}`.substr(0, 22);
    }
    getStripeChargeStatementDescriptor_subscription(options) {
        return `${options.business.statementDescriptor} ${options.product.statementDescriptor_subscription}`.substr(0, 22);
    }
}
exports.ClientConfig = ClientConfig;


/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function hashEmail_partial(email) {
    const name = email
        .substr(0, email.indexOf('@'))
        .replace(/\./g, '_')
        .replace(/[^a-zA-Z0-9]/g, '');
    const h = hash(email);
    return name + h;
}
exports.hashEmail_partial = hashEmail_partial;
function hash(text) {
    return text.split('').reduce((hash, c) => {
        const code = c.charCodeAt(0);
        hash = ((hash << 5) - hash) + code;
        return hash | 0;
    }, 0);
}
exports.hash = hash;


/***/ }),

/***/ 261:
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
function executeRequest(request) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Do Something
        return;
    });
}
exports.executeRequest = executeRequest;


/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_04_http_webhook_1 = __webpack_require__(459);
const stripe_server_1 = __webpack_require__(258);
const run = function (...args) {
    function_04_http_webhook_1.runFunction.apply(null, [stripe_server_1.config, ...args]);
};
global.__run = run;
module.exports = global.__run;


/***/ }),

/***/ 459:
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
function createFunctionJson(config) {
    return {
        bindings: [
            {
                name: "req",
                type: "httpTrigger",
                // This requires a code be sent by stripe, we will do manual verification instead
                // webhookType: "genericJson",
                direction: "in",
                authLevel: "anonymous",
                route: config.webhook_route
            },
            {
                name: "res",
                type: "http",
                direction: "out"
            },
            {
                name: "outWebhookQueue",
                type: "queue",
                direction: "out",
                queueName: config.webhookQueue_queueName,
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
        const stripeSignature = req.headers['stripe-signature'];
        context.bindings.outWebhookQueue = {
            body: req.body,
            stripeSignature,
        };
        context.res = {
            status: 200,
            body: {
                ok: true,
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