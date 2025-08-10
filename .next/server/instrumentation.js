/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "instrumentation";
exports.ids = ["instrumentation"];
exports.modules = {

/***/ "(instrument)/./node_modules/@opentelemetry/instrumentation/build/esm/platform/node sync recursive":
/*!***********************************************************************************!*\
  !*** ./node_modules/@opentelemetry/instrumentation/build/esm/platform/node/ sync ***!
  \***********************************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(instrument)/./node_modules/@opentelemetry/instrumentation/build/esm/platform/node sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(instrument)/./node_modules/@prisma/instrumentation/node_modules/@opentelemetry/instrumentation/build/esm/platform/node sync recursive":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/@prisma/instrumentation/node_modules/@opentelemetry/instrumentation/build/esm/platform/node/ sync ***!
  \************************************************************************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(instrument)/./node_modules/@prisma/instrumentation/node_modules/@opentelemetry/instrumentation/build/esm/platform/node sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(instrument)/./src/instrumentation.ts":
/*!********************************!*\
  !*** ./src/instrumentation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/nextjs */ \"(instrument)/./node_modules/@sentry/nextjs/build/cjs/index.server.js\");\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);\nglobalThis[\"_sentryRewritesTunnelPath\"] = \"/monitoring\";\nglobalThis[\"SENTRY_RELEASE\"] = undefined;\nglobalThis[\"_sentryBasePath\"] = undefined;\nglobalThis[\"_sentryRewriteFramesDistDir\"] = \".next\";\n\nasync function register() {\n    _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.init({\n        dsn: process.env.SENTRY_DSN,\n        tracesSampleRate: 0.2,\n        debug: false,\n        environment: \"development\",\n        // Disable telemetry in development\n        telemetry: \"development\" === 'production',\n        // Configure integrations\n        integrations: [],\n        // Configure beforeSend to filter out certain errors\n        beforeSend (event, hint) {\n            // Don't send errors in development\n            if (true) {\n                return null;\n            }\n            return event;\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vc3JjL2luc3RydW1lbnRhdGlvbi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQ0EsVUFBVSxDQUFDLDRCQUE0QixHQUFHO0FBQWNBLFVBQVUsQ0FBQyxpQkFBaUIsR0FBR0M7QUFBVUQsVUFBVSxDQUFDLGtCQUFrQixHQUFHQztBQUFVRCxVQUFVLENBQUMsOEJBQThCLEdBQUc7QUFBaUQ7QUFFbE8sZUFBZUc7SUFDcEJELGdEQUFXLENBQUM7UUFDVkcsS0FBS0MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1FBQzNCQyxrQkFBa0I7UUFDbEJDLE9BQU87UUFDUEMsYUFQSjtRQVNJLG1DQUFtQztRQUNuQ0MsV0FBV04sa0JBQXlCO1FBRXBDLHlCQUF5QjtRQUN6Qk8sY0FBYyxFQUViO1FBRUQsb0RBQW9EO1FBQ3BEQyxZQUFXQyxLQUFLLEVBQUVDLElBQUk7WUFDcEIsbUNBQW1DO1lBQ25DLElBQUlWLElBQXNDLEVBQUU7Z0JBQzFDLE9BQU87WUFDVDtZQUNBLE9BQU9TO1FBQ1Q7SUFDRjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvdXNlci9Eb2N1bWVudHMvR2l0SHViL0RPSk1BUkstSU5DLi9zcmMvaW5zdHJ1bWVudGF0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIjtnbG9iYWxUaGlzW1wiX3NlbnRyeVJld3JpdGVzVHVubmVsUGF0aFwiXSA9IFwiL21vbml0b3JpbmdcIjtnbG9iYWxUaGlzW1wiU0VOVFJZX1JFTEVBU0VcIl0gPSB1bmRlZmluZWQ7Z2xvYmFsVGhpc1tcIl9zZW50cnlCYXNlUGF0aFwiXSA9IHVuZGVmaW5lZDtnbG9iYWxUaGlzW1wiX3NlbnRyeVJld3JpdGVGcmFtZXNEaXN0RGlyXCJdID0gXCIubmV4dFwiO2ltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9uZXh0anNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICBTZW50cnkuaW5pdCh7XG4gICAgZHNuOiBwcm9jZXNzLmVudi5TRU5UUllfRFNOLFxuICAgIHRyYWNlc1NhbXBsZVJhdGU6IDAuMixcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgZW52aXJvbm1lbnQ6IHByb2Nlc3MuZW52Lk5PREVfRU5WLFxuICAgIFxuICAgIC8vIERpc2FibGUgdGVsZW1ldHJ5IGluIGRldmVsb3BtZW50XG4gICAgdGVsZW1ldHJ5OiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgIFxuICAgIC8vIENvbmZpZ3VyZSBpbnRlZ3JhdGlvbnNcbiAgICBpbnRlZ3JhdGlvbnM6IFtcbiAgICAgIC8vIEFkZCBhbnkgc3BlY2lmaWMgaW50ZWdyYXRpb25zIGhlcmUgaWYgbmVlZGVkXG4gICAgXSxcbiAgICBcbiAgICAvLyBDb25maWd1cmUgYmVmb3JlU2VuZCB0byBmaWx0ZXIgb3V0IGNlcnRhaW4gZXJyb3JzXG4gICAgYmVmb3JlU2VuZChldmVudCwgaGludCkge1xuICAgICAgLy8gRG9uJ3Qgc2VuZCBlcnJvcnMgaW4gZGV2ZWxvcG1lbnRcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9LFxuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJnbG9iYWxUaGlzIiwidW5kZWZpbmVkIiwiU2VudHJ5IiwicmVnaXN0ZXIiLCJpbml0IiwiZHNuIiwicHJvY2VzcyIsImVudiIsIlNFTlRSWV9EU04iLCJ0cmFjZXNTYW1wbGVSYXRlIiwiZGVidWciLCJlbnZpcm9ubWVudCIsInRlbGVtZXRyeSIsImludGVncmF0aW9ucyIsImJlZm9yZVNlbmQiLCJldmVudCIsImhpbnQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(instrument)/./src/instrumentation.ts\n");

/***/ }),

/***/ "async_hooks":
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "diagnostics_channel":
/*!**************************************!*\
  !*** external "diagnostics_channel" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("diagnostics_channel");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "import-in-the-middle":
/*!***************************************!*\
  !*** external "import-in-the-middle" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("import-in-the-middle");

/***/ }),

/***/ "module":
/*!*************************!*\
  !*** external "module" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("module");

/***/ }),

/***/ "node:child_process":
/*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:child_process");

/***/ }),

/***/ "node:diagnostics_channel":
/*!*******************************************!*\
  !*** external "node:diagnostics_channel" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:https":
/*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ "node:inspector":
/*!*********************************!*\
  !*** external "node:inspector" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:inspector");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:os");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:readline":
/*!********************************!*\
  !*** external "node:readline" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:readline");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:tls":
/*!***************************!*\
  !*** external "node:tls" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:tls");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:worker_threads":
/*!**************************************!*\
  !*** external "node:worker_threads" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:worker_threads");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "perf_hooks":
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("perf_hooks");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "require-in-the-middle":
/*!****************************************!*\
  !*** external "require-in-the-middle" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("require-in-the-middle");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@opentelemetry","vendor-chunks/@sentry","vendor-chunks/semver","vendor-chunks/@prisma","vendor-chunks/next","vendor-chunks/forwarded-parse","vendor-chunks/color-convert","vendor-chunks/is-core-module","vendor-chunks/function-bind","vendor-chunks/@swc","vendor-chunks/supports-color","vendor-chunks/stacktrace-parser","vendor-chunks/shimmer","vendor-chunks/path-parse","vendor-chunks/hasown","vendor-chunks/has-flag","vendor-chunks/color-name","vendor-chunks/balanced-match","vendor-chunks/ansi-styles"], () => (__webpack_exec__("(instrument)/./src/instrumentation.ts")));
module.exports = __webpack_exports__;

})();