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
/******/ 	return __webpack_require__(__webpack_require__.s = 374);
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

/***/ 256:
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
            partitionKey: trigger.emailHash && `${trigger.emailHash}` || undefined,
            rowKey: trigger.serverCheckoutId && `${trigger.serverCheckoutId}` || undefined,
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

/***/ 257:
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
const client_config_1 = __webpack_require__(269);
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

/***/ 268:
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
const server_config_1 = __webpack_require__(256);
const stripe_client_1 = __webpack_require__(257);
const execute_stripe_checkout_1 = __webpack_require__(271);
const runtimeConfig = {
    executeRequest: execute_stripe_checkout_1.executeRequest,
    lookupUserByUserToken: (token) => __awaiter(this, void 0, void 0, function* () { return ({ userId: '42' }); }),
    getOrCreateCurrentUserId: (email) => __awaiter(this, void 0, void 0, function* () { return ({ userId: '42' }); }),
};
exports.config = new server_config_1.ServerConfig(stripe_client_1.clientConfig, runtimeConfig);


/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = __webpack_require__(70);
const hash_1 = __webpack_require__(270);
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

/***/ 270:
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
function executeRequest(request) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Do Something
        return;
    });
}
exports.executeRequest = executeRequest;


/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CheckoutStatus;
(function (CheckoutStatus) {
    // Nothing has happened yet
    CheckoutStatus["NotStarted"] = "NotStarted";
    // The user has clicked the open button and is opening
    CheckoutStatus["Started"] = "Started";
    // The form has called the opened callback
    CheckoutStatus["Opened"] = "Opened";
    // The form has called the closed callback (Cancelled, Failed Verification?)
    CheckoutStatus["Closed"] = "Closed";
    // // NOT SURE IF THESE CAN BE USED WITH STRIPE CHECKOUT
    // // The user has submitted and the provider is verifying the information 
    // Verifing = 'Verifing',
    // // The payment failed (Try Again)
    // VerificationFailed = 'VerificationFailed',
    // The payment was sent to the server
    CheckoutStatus["Submitting"] = "Submitting";
    // The payment was received by the server (and Queued)
    CheckoutStatus["Submitted"] = "Submitted";
    // The payment was rejected by the server (and not Queued)
    CheckoutStatus["Submission_Failed"] = "Submission_Failed";
    // The Submission Requires User Login with the Stripe Email
    CheckoutStatus["Submission_Rejected_LoginAndResubmit"] = "Submission_Rejected_LoginAndResubmit";
})(CheckoutStatus = exports.CheckoutStatus || (exports.CheckoutStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["NotStarted"] = "NotStarted";
    PaymentStatus["Processing"] = "Processing";
    PaymentStatus["Paused"] = "Paused";
    PaymentStatus["PaymentSuceeded"] = "PaymentSuceeded";
    PaymentStatus["PaymentFailed"] = "PaymentFailed";
    // Payment Refunded or Disputed
    PaymentStatus["PaymentWithdrawn"] = "PaymentWithdrawn";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["NotStarted"] = "NotStarted";
    SubscriptionStatus["Processing"] = "Processing";
    SubscriptionStatus["SubscriptionFailed"] = "SubscriptionFailed";
    SubscriptionStatus["Subscribed_TrialPeriod"] = "Subscribed_TrialPeriod";
    SubscriptionStatus["Subscribed_Normal"] = "Subscribed";
    // Payment Failed but Still Doing Automated Re-Attempts
    SubscriptionStatus["Subscribed_PastDue"] = "Subscribed_PastDue";
    // Failed to Process (No Further Automated Attempts will be Made)
    SubscriptionStatus["Unsubscribed_PastDue"] = "Unsubscribed_PastDue";
    SubscriptionStatus["Unsubscribed_Cancelled"] = "Unsubscribed_Cancelled";
})(SubscriptionStatus = exports.SubscriptionStatus || (exports.SubscriptionStatus = {}));
var DeliverableStatus;
(function (DeliverableStatus) {
    DeliverableStatus["NotStarted"] = "NotStarted";
    DeliverableStatus["Processing"] = "Processing";
    DeliverableStatus["Enabled"] = "Enabled";
    DeliverableStatus["Disabled"] = "Disabled";
})(DeliverableStatus = exports.DeliverableStatus || (exports.DeliverableStatus = {}));
var DeliverableStatus_ExecutionResult;
(function (DeliverableStatus_ExecutionResult) {
    DeliverableStatus_ExecutionResult["NotStarted"] = "NotStarted";
    DeliverableStatus_ExecutionResult["Processing"] = "Processing";
    DeliverableStatus_ExecutionResult["Enabled"] = "Enabled";
    DeliverableStatus_ExecutionResult["Disabled"] = "Disabled";
    // For example, something that is disabled but has already been delivered (so there is nothing further to do)
    DeliverableStatus_ExecutionResult["Disabled_Impossible"] = "Disabled_Impossible";
    // Attempt to Activate Caused an Error in the Activation System
    DeliverableStatus_ExecutionResult["Error"] = "Error";
})(DeliverableStatus_ExecutionResult = exports.DeliverableStatus_ExecutionResult || (exports.DeliverableStatus_ExecutionResult = {}));


/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_01_http_submit_1 = __webpack_require__(375);
const stripe_server_1 = __webpack_require__(268);
const run = function (...args) {
    function_01_http_submit_1.runFunction.apply(null, [stripe_server_1.config, ...args]);
};
global.__run = run;
module.exports = global.__run;


/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const function_builder_1 = __webpack_require__(253);
const checkout_types_1 = __webpack_require__(276);
const uuid_1 = __webpack_require__(376);
exports.deps = {
    getServerCheckoutId: () => uuid_1.uuid.v4(),
};
function buildFunction(config) {
    return function_builder_1.buildFunction_http({
        route: config.submit_route
    })
        .bindings(t => ({
        outProcessQueue: function_builder_1.build_binding(config.getBinding_processQueue())
    }));
}
exports.createFunctionJson = (config) => function_builder_1.build_createFunctionJson(config, buildFunction);
exports.runFunction = function_builder_1.build_runFunction_http(buildFunction, (config, context, req) => {
    context.log('START');
    // Handle Max Queue Size (64kb) -> Put in a blob
    context.log('req', { req });
    const request = JSON.parse(req.body);
    context.log('request', { request });
    if (!request.token) {
        context.res = {
            body: {
                error: 'No Token Sent',
                checkoutStatus: checkout_types_1.CheckoutStatus.Submission_Failed,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        };
        context.log('DONE');
        context.done();
        return;
    }
    const emailHash = config.getEmailHash(request.token.email);
    const serverCheckoutId = exports.deps.getServerCheckoutId();
    const checkoutStatus = checkout_types_1.CheckoutStatus.Submitted;
    context.bindings.outProcessQueue = {
        request,
        emailHash,
        serverCheckoutId,
    };
    // context.bindings.outStripeCheckoutTable = {
    //     PartitionKey: config.getStripeCheckoutPartitionKey(emailHash, serverCheckoutId),
    //     RowKey: config.getStripeCheckoutRowKey(emailHash, serverCheckoutId),
    //     request,
    //     status,
    //     timeRequested: Date.now(),
    // };
    context.log(`Stored in Queue`);
    context.res = {
        body: {
            checkoutStatus,
            serverCheckoutId,
        },
        headers: {
            'Content-Type': 'application/json',
        }
    };
    context.log('DONE');
    context.done();
});


/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// https://gist.github.com/jed/982883
exports.uuid = {
    v4: () => ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (a) => (a ^ Math.random() * 16 >> a / 4).toString(16))
};


/***/ }),

/***/ 70:
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
function partialDeepCompare(a, e) {
    if (e === a) {
        return true;
    }
    if ((e === undefined || e === null) && (a === undefined || a === null)) {
        return true;
    }
    if ((e === undefined || e === null || a === undefined || a === null)) {
        return false;
    }
    for (let k in e) {
        const e2 = e[k];
        const a2 = a[k];
        if (!partialDeepCompare(a[k], e[k])) {
            return false;
        }
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