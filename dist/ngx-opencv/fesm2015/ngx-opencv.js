import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const OpenCvConfigToken = new InjectionToken('OpenCV config object token');
class NgxOpenCVService {
    constructor(options, _ngZone) {
        this._ngZone = _ngZone;
        this.cvState = new BehaviorSubject({
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
    loadOpenCv() {
        this.cvState.next(this.newState('loading'));
        // create global module variable
        window['Module'] = this.configModule;
        // create script element and set attributes
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('type', 'text/javascript');
        // listen for errors
        script.addEventListener('error', () => {
            const err = new Error('Failed to load ' + this.configModule.scriptUrl);
            this.cvState.next(this.newState('error'));
            this.cvState.error(err);
        }, { passive: true });
        // set script url
        script.src = this.configModule.scriptUrl;
        // insert script as first script tag
        const node = document.getElementsByTagName('script')[0];
        if (node) {
            node.parentNode.insertBefore(script, node);
        }
        else {
            document.head.appendChild(script);
        }
    }
    /**
     * generates a new state object
     * @param change - the new state of the module
     */
    newState(change) {
        const newStateObj = {
            ready: false,
            loading: false,
            error: false,
            state: ''
        };
        Object.keys(newStateObj).forEach(key => {
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
    }
    /**
     * generates a config module for the global Module object
     * @param options - configuration options
     */
    generateConfigModule(options) {
        return {
            scriptUrl: options.openCVDirPath ? `${options.openCVDirPath}/opencv.js` : `/assets/opencv/opencv.js`,
            wasmBinaryFile: 'opencv_js.wasm',
            usingWasm: true,
            onRuntimeInitialized: () => {
                this._ngZone.run(() => {
                    console.log('openCV Ready');
                    this.cvState.next(this.newState('ready'));
                    if (options.runOnOpenCVInit) {
                        options.runOnOpenCVInit();
                    }
                });
            }
        };
    }
}
NgxOpenCVService.ɵfac = function NgxOpenCVService_Factory(t) { return new (t || NgxOpenCVService)(i0.ɵɵinject(OpenCvConfigToken), i0.ɵɵinject(i0.NgZone)); };
NgxOpenCVService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NgxOpenCVService, factory: NgxOpenCVService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxOpenCVService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [OpenCvConfigToken]
            }] }, { type: i0.NgZone }]; }, null); })();

class NgxOpenCVModule {
    static forRoot(config) {
        return {
            ngModule: NgxOpenCVModule,
            providers: [{ provide: OpenCvConfigToken, useValue: config }]
        };
    }
}
NgxOpenCVModule.ɵfac = function NgxOpenCVModule_Factory(t) { return new (t || NgxOpenCVModule)(); };
NgxOpenCVModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgxOpenCVModule });
NgxOpenCVModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [NgxOpenCVService] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxOpenCVModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                exports: [],
                providers: [NgxOpenCVService]
            }]
    }], null, null); })();
const a = 0;

/**
 * Generated bundle index. Do not edit.
 */

export { NgxOpenCVModule, NgxOpenCVService, OpenCvConfigToken };
//# sourceMappingURL=ngx-opencv.js.map
