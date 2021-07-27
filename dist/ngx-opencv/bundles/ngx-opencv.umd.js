(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ngx-opencv', ['exports', '@angular/core', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-opencv'] = {}, global.ng.core, global.rxjs));
}(this, (function (exports, i0, rxjs) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    var OpenCvConfigToken = new i0.InjectionToken('OpenCV config object token');
    var NgxOpenCVService = /** @class */ (function () {
        function NgxOpenCVService(options, _ngZone) {
            this._ngZone = _ngZone;
            this.cvState = new rxjs.BehaviorSubject({
                ready: false,
                error: false,
                loading: true,
                state: 'loading'
            });
            if (!options) {
                options = {};
            }
            this.configModule = this.generateConfigModule(options);
            this.loadOpenCv();
        }
        /**
         * load the OpenCV script
         */
        NgxOpenCVService.prototype.loadOpenCv = function () {
            var _this = this;
            this.cvState.next(this.newState('loading'));
            // create global module variable
            window['Module'] = this.configModule;
            // create script element and set attributes
            var script = document.createElement('script');
            script.setAttribute('async', '');
            script.setAttribute('type', 'text/javascript');
            // listen for errors
            script.addEventListener('error', function () {
                var err = new Error('Failed to load ' + _this.configModule.scriptUrl);
                _this.cvState.next(_this.newState('error'));
                _this.cvState.error(err);
            }, { passive: true });
            // set script url
            script.src = this.configModule.scriptUrl;
            // insert script as first script tag
            var node = document.getElementsByTagName('script')[0];
            if (node) {
                node.parentNode.insertBefore(script, node);
            }
            else {
                document.head.appendChild(script);
            }
        };
        /**
         * generates a new state object
         * @param change - the new state of the module
         */
        NgxOpenCVService.prototype.newState = function (change) {
            var newStateObj = {
                ready: false,
                loading: false,
                error: false,
                state: ''
            };
            Object.keys(newStateObj).forEach(function (key) {
                if (key !== 'state') {
                    if (key === change) {
                        newStateObj[key] = true;
                        newStateObj.state = key;
                    }
                    else {
                        newStateObj[key] = false;
                    }
                }
            });
            return newStateObj;
        };
        /**
         * generates a config module for the global Module object
         * @param options - configuration options
         */
        NgxOpenCVService.prototype.generateConfigModule = function (options) {
            var _this = this;
            return {
                scriptUrl: options.openCVDirPath ? options.openCVDirPath + "/opencv.js" : "/assets/opencv/opencv.js",
                wasmBinaryFile: 'opencv_js.wasm',
                usingWasm: true,
                onRuntimeInitialized: function () {
                    _this._ngZone.run(function () {
                        console.log('openCV Ready');
                        _this.cvState.next(_this.newState('ready'));
                        if (options.runOnOpenCVInit) {
                            options.runOnOpenCVInit();
                        }
                    });
                }
            };
        };
        return NgxOpenCVService;
    }());
    NgxOpenCVService.ɵfac = function NgxOpenCVService_Factory(t) { return new (t || NgxOpenCVService)(i0__namespace.ɵɵinject(OpenCvConfigToken), i0__namespace.ɵɵinject(i0__namespace.NgZone)); };
    NgxOpenCVService.ɵprov = /*@__PURE__*/ i0__namespace.ɵɵdefineInjectable({ token: NgxOpenCVService, factory: NgxOpenCVService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxOpenCVService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [OpenCvConfigToken]
                        }] }, { type: i0__namespace.NgZone }];
        }, null);
    })();

    var NgxOpenCVModule = /** @class */ (function () {
        function NgxOpenCVModule() {
        }
        NgxOpenCVModule.forRoot = function (config) {
            return {
                ngModule: NgxOpenCVModule,
                providers: [{ provide: OpenCvConfigToken, useValue: config }]
            };
        };
        return NgxOpenCVModule;
    }());
    NgxOpenCVModule.ɵfac = function NgxOpenCVModule_Factory(t) { return new (t || NgxOpenCVModule)(); };
    NgxOpenCVModule.ɵmod = /*@__PURE__*/ i0__namespace.ɵɵdefineNgModule({ type: NgxOpenCVModule });
    NgxOpenCVModule.ɵinj = /*@__PURE__*/ i0__namespace.ɵɵdefineInjector({ providers: [NgxOpenCVService] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxOpenCVModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [],
                        exports: [],
                        providers: [NgxOpenCVService]
                    }]
            }], null, null);
    })();
    var a = 0;

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxOpenCVModule = NgxOpenCVModule;
    exports.NgxOpenCVService = NgxOpenCVService;
    exports.OpenCvConfigToken = OpenCvConfigToken;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-opencv.umd.js.map
