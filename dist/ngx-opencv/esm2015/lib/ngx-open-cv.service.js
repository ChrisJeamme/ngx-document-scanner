import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export const OpenCvConfigToken = new InjectionToken('OpenCV config object token');
export class NgxOpenCVService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9wZW4tY3Yuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1vcGVuY3Yvc3JjL2xpYi9uZ3gtb3Blbi1jdi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUdyQyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBZSw0QkFBNEIsQ0FBQyxDQUFDO0FBS2hHLE1BQU0sT0FBTyxnQkFBZ0I7SUFVM0IsWUFBdUMsT0FBcUIsRUFBVSxPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQVJyRixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQWM7WUFDekMsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBSUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdDLGdDQUFnQztRQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUVyQywyQ0FBMkM7UUFDM0MsTUFBTSxNQUFNLEdBQXVCLFFBQVEsQ0FBQyxhQUFh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QUFnQjtjQUg1QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQVdjLE1BQU07dUJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7T3BlbkNWQ29uZmlnLCBPcGVuQ1ZTdGF0ZX0gZnJvbSAnLi9tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE9wZW5DdkNvbmZpZ1Rva2VuID0gbmV3IEluamVjdGlvblRva2VuPE9wZW5DVkNvbmZpZz4oJ09wZW5DViBjb25maWcgb2JqZWN0IHRva2VuJyk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hPcGVuQ1ZTZXJ2aWNlIHtcclxuXHJcbiAgY3ZTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T3BlbkNWU3RhdGU+KHtcclxuICAgIHJlYWR5OiBmYWxzZSxcclxuICAgIGVycm9yOiBmYWxzZSxcclxuICAgIGxvYWRpbmc6IHRydWUsXHJcbiAgICBzdGF0ZTogJ2xvYWRpbmcnXHJcbiAgfSk7XHJcbiAgY29uZmlnTW9kdWxlOiBPcGVuQ3ZDb25maWdNb2R1bGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoT3BlbkN2Q29uZmlnVG9rZW4pIG9wdGlvbnM6IE9wZW5DVkNvbmZpZywgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcclxuICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICBvcHRpb25zID0ge307XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbmZpZ01vZHVsZSA9IHRoaXMuZ2VuZXJhdGVDb25maWdNb2R1bGUob3B0aW9ucyk7XHJcbiAgICB0aGlzLmxvYWRPcGVuQ3YoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxvYWQgdGhlIE9wZW5DViBzY3JpcHRcclxuICAgKi9cclxuICBsb2FkT3BlbkN2KCkge1xyXG4gICAgdGhpcy5jdlN0YXRlLm5leHQoIHRoaXMubmV3U3RhdGUoJ2xvYWRpbmcnKSk7XHJcbiAgICAvLyBjcmVhdGUgZ2xvYmFsIG1vZHVsZSB2YXJpYWJsZVxyXG4gICAgd2luZG93WydNb2R1bGUnXSA9IHRoaXMuY29uZmlnTW9kdWxlO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBzY3JpcHQgZWxlbWVudCBhbmQgc2V0IGF0dHJpYnV0ZXNcclxuICAgIGNvbnN0IHNjcmlwdCA9IDxIVE1MU2NyaXB0RWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdhc3luYycsICcnKTtcclxuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XHJcblxyXG4gICAgLy8gbGlzdGVuIGZvciBlcnJvcnNcclxuICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcclxuICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCAnICsgdGhpcy5jb25maWdNb2R1bGUuc2NyaXB0VXJsKTtcclxuICAgICAgdGhpcy5jdlN0YXRlLm5leHQodGhpcy5uZXdTdGF0ZSgnZXJyb3InKSk7XHJcbiAgICAgIHRoaXMuY3ZTdGF0ZS5lcnJvcihlcnIpO1xyXG4gICAgfSwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHJcbiAgICAvLyBzZXQgc2NyaXB0IHVybFxyXG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuY29uZmlnTW9kdWxlLnNjcmlwdFVybDtcclxuICAgIC8vIGluc2VydCBzY3JpcHQgYXMgZmlyc3Qgc2NyaXB0IHRhZ1xyXG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcclxuICAgIGlmIChub2RlKSB7XHJcbiAgICAgIG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBub2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdlbmVyYXRlcyBhIG5ldyBzdGF0ZSBvYmplY3RcclxuICAgKiBAcGFyYW0gY2hhbmdlIC0gdGhlIG5ldyBzdGF0ZSBvZiB0aGUgbW9kdWxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBuZXdTdGF0ZShjaGFuZ2U6ICdsb2FkaW5nJ3wncmVhZHknfCdlcnJvcicpOiBPcGVuQ1ZTdGF0ZSB7XHJcbiAgICBjb25zdCBuZXdTdGF0ZU9iajogT3BlbkNWU3RhdGUgPSB7XHJcbiAgICAgIHJlYWR5OiBmYWxzZSxcclxuICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgIGVycm9yOiBmYWxzZSxcclxuICAgICAgc3RhdGU6ICcnXHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmtleXMobmV3U3RhdGVPYmopLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgaWYgKGtleSAhPT0gJ3N0YXRlJykge1xyXG4gICAgICAgIGlmIChrZXkgPT09IGNoYW5nZSkge1xyXG4gICAgICAgICAgbmV3U3RhdGVPYmpba2V5XSA9IHRydWU7XHJcbiAgICAgICAgICBuZXdTdGF0ZU9iai5zdGF0ZSA9IGtleTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3U3RhdGVPYmpba2V5XSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbmV3U3RhdGVPYmo7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZW5lcmF0ZXMgYSBjb25maWcgbW9kdWxlIGZvciB0aGUgZ2xvYmFsIE1vZHVsZSBvYmplY3RcclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2VuZXJhdGVDb25maWdNb2R1bGUob3B0aW9uczogT3BlbkNWQ29uZmlnKTogT3BlbkN2Q29uZmlnTW9kdWxlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNjcmlwdFVybDogb3B0aW9ucy5vcGVuQ1ZEaXJQYXRoID8gYCR7b3B0aW9ucy5vcGVuQ1ZEaXJQYXRofS9vcGVuY3YuanNgIDogYC9hc3NldHMvb3BlbmN2L29wZW5jdi5qc2AsXHJcbiAgICAgIHdhc21CaW5hcnlGaWxlOiAnb3BlbmN2X2pzLndhc20nLFxyXG4gICAgICB1c2luZ1dhc206IHRydWUsXHJcbiAgICAgIG9uUnVudGltZUluaXRpYWxpemVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbkNWIFJlYWR5Jyk7XHJcbiAgICAgICAgICB0aGlzLmN2U3RhdGUubmV4dCh0aGlzLm5ld1N0YXRlKCdyZWFkeScpKTtcclxuICAgICAgICAgIGlmIChvcHRpb25zLnJ1bk9uT3BlbkNWSW5pdCkge1xyXG4gICAgICAgICAgICBvcHRpb25zLnJ1bk9uT3BlbkNWSW5pdCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGRlc2NyaWJlcyB0aGUgZ2xvYmFsIE1vZHVsZSBvYmplY3QgdGhhdCBpcyB1c2VkIHRvIGluaXRpYXRlIE9wZW5DVi5qc1xyXG4gKi9cclxuaW50ZXJmYWNlIE9wZW5DdkNvbmZpZ01vZHVsZSB7XHJcbiAgc2NyaXB0VXJsOiBzdHJpbmc7XHJcbiAgd2FzbUJpbmFyeUZpbGU6IHN0cmluZztcclxuICB1c2luZ1dhc206IGJvb2xlYW47XHJcbiAgb25SdW50aW1lSW5pdGlhbGl6ZWQ6IEZ1bmN0aW9uO1xyXG59XHJcblxyXG4iXX0=