(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('angular2-draggable'), require('@angular/flex-layout/extended'), require('@angular/common'), require('@angular/material/bottom-sheet'), require('@angular/material/list'), require('@angular/material/icon'), require('@angular/flex-layout/flex'), require('ngx-opencv'), require('@angular/material/button'), require('@angular/flex-layout')) :
    typeof define === 'function' && define.amd ? define('ngx-document-scanner', ['exports', '@angular/core', 'rxjs', 'angular2-draggable', '@angular/flex-layout/extended', '@angular/common', '@angular/material/bottom-sheet', '@angular/material/list', '@angular/material/icon', '@angular/flex-layout/flex', 'ngx-opencv', '@angular/material/button', '@angular/flex-layout'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-document-scanner'] = {}, global.ng.core, global.rxjs, global.i2, global.ng.flexLayout.extended, global.ng.common, global.ng.material.bottomSheet, global.ng.material.list, global.ng.material.icon, global.ng.flexLayout.flex, global.i1$1, global.ng.material.button, global.ng.flexLayout));
}(this, (function (exports, i0, rxjs, i2, i3, i6, i1, i2$1, i4, i4$1, i1$1, i9, flexLayout) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i4__namespace$1 = /*#__PURE__*/_interopNamespace(i4$1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i9__namespace = /*#__PURE__*/_interopNamespace(i9);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var LimitsService = /** @class */ (function () {
        function LimitsService() {
            this.limitDirections = ['left', 'right', 'top', 'bottom'];
            /**
             * stores the crop limits limits
             */
            this._limits = {
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
            };
            /**
             * stores the array of the draggable points displayed on the crop area
             */
            this._points = [];
            // *********** //
            // Observables //
            // *********** //
            this.positions = new rxjs.BehaviorSubject(Array.from(this._points));
            this.repositionEvent = new rxjs.BehaviorSubject([]);
            this.limits = new rxjs.BehaviorSubject(this._limits);
            this.paneDimensions = new rxjs.BehaviorSubject({ width: 0, height: 0 });
        }
        /**
         * set privew pane dimensions
         */
        LimitsService.prototype.setPaneDimensions = function (dimensions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._paneDimensions = dimensions;
                _this.paneDimensions.next(dimensions);
                resolve(true);
            });
        };
        /**
         * repositions points externally
         */
        LimitsService.prototype.repositionPoints = function (positions) {
            var _this = this;
            this._points = positions;
            positions.forEach(function (position) {
                _this.positionChange(position);
            });
            this.repositionEvent.next(positions);
        };
        /**
         * updates limits and point positions and calls next on the observables
         * @param positionChangeData - position change event data
         */
        LimitsService.prototype.positionChange = function (positionChangeData) {
            var _this = this;
            // update positions according to current position change
            this.updatePosition(positionChangeData);
            // for each direction:
            // 1. filter the _points that have a role as the direction's limit
            // 2. for top and left find max x | y values, and min for right and bottom
            this.limitDirections.forEach(function (direction) {
                var relevantPoints = _this._points.filter(function (point) {
                    return point.roles.includes(direction);
                })
                    .map(function (point) {
                    return point[_this.getDirectionAxis(direction)];
                });
                var limit;
                if (direction === 'top' || direction === 'left') {
                    limit = Math.max.apply(Math, __spreadArray([], __read(relevantPoints)));
                }
                if (direction === 'right' || direction === 'bottom') {
                    limit = Math.min.apply(Math, __spreadArray([], __read(relevantPoints)));
                }
                _this._limits[direction] = limit;
            });
            this.limits.next(this._limits);
            this.positions.next(Array.from(this._points));
        };
        /**
         * updates the position of the point
         * @param positionChange - position change event data
         */
        LimitsService.prototype.updatePosition = function (positionChange) {
            var _this = this;
            // finds the current position of the point by it's roles, than splices it for the new position or pushes it if it's not yet in the array
            var index = this._points.findIndex(function (point) {
                return _this.compareArray(positionChange.roles, point.roles);
            });
            if (index === -1) {
                this._points.push(positionChange);
            }
            else {
                this._points.splice(index, 1, positionChange);
            }
        };
        /**
         * check if a position change event exceeds the limits
         * @param positionChange - position change event data
         * @returns LimitException0
         */
        LimitsService.prototype.exceedsLimit = function (positionChange) {
            var _this = this;
            var pointLimits = this.limitDirections.filter(function (direction) {
                return !positionChange.roles.includes(direction);
            });
            var limitException = {
                exceeds: false,
                resetCoefficients: {
                    x: 0,
                    y: 0
                },
                resetCoordinates: {
                    x: positionChange.x,
                    y: positionChange.y
                }
            };
            // limit directions are the opposite sides of the point's roles
            pointLimits.forEach(function (direction) {
                var directionAxis = _this.getDirectionAxis(direction);
                if (direction === 'top' || direction === 'left') {
                    if (positionChange[directionAxis] < _this._limits[direction]) {
                        limitException.resetCoefficients[directionAxis] = 1;
                        limitException.resetCoordinates[directionAxis] = _this._limits[direction];
                    }
                }
                else if (direction === 'right' || direction === 'bottom') {
                    if (positionChange[directionAxis] > _this._limits[direction]) {
                        limitException.resetCoefficients[directionAxis] = -1;
                        limitException.resetCoordinates[directionAxis] = _this._limits[direction];
                    }
                }
            });
            if (limitException.resetCoefficients.x !== 0 || limitException.resetCoefficients.y !== 0) {
                limitException.exceeds = true;
            }
            return limitException;
        };
        /**
         * rotate crop tool points clockwise
         * @param resizeRatios - ratio between the new dimensions and the previous
         * @param initialPreviewDimensions - preview pane dimensions before rotation
         * @param initialPositions - current positions before rotation
         */
        LimitsService.prototype.rotateClockwise = function (resizeRatios, initialPreviewDimensions, initialPositions) {
            var _this = this;
            // convert positions to ratio between position to initial pane dimension
            initialPositions = initialPositions.map(function (point) {
                return new PositionChangeData({
                    x: point.x / initialPreviewDimensions.width,
                    y: point.y / initialPreviewDimensions.height,
                }, point.roles);
            });
            this.repositionPoints(initialPositions.map(function (point) {
                return _this.rotateCornerClockwise(point);
            }));
        };
        /**
         * returns the corner positions after a 90 degrees clockwise rotation
         */
        LimitsService.prototype.rotateCornerClockwise = function (corner) {
            var _this = this;
            var rotated = {
                x: this._paneDimensions.width * (1 - corner.y),
                y: this._paneDimensions.height * corner.x,
                roles: []
            };
            // rotates corner according to order
            var order = [
                ['bottom', 'left'],
                ['top', 'left'],
                ['top', 'right'],
                ['bottom', 'right'],
                ['bottom', 'left']
            ];
            rotated.roles = order[order.findIndex(function (roles) {
                return _this.compareArray(roles, corner.roles);
            }) + 1];
            return rotated;
        };
        /**
         * checks if two array contain the same values
         * @param array1 - array 1
         * @param array2 - array 2
         * @returns boolean
         */
        LimitsService.prototype.compareArray = function (array1, array2) {
            return array1.every(function (element) {
                return array2.includes(element);
            }) && array1.length === array2.length;
        };
        LimitsService.prototype.getDirectionAxis = function (direction) {
            return {
                left: 'x',
                right: 'x',
                top: 'y',
                bottom: 'y'
            }[direction];
        };
        return LimitsService;
    }());
    LimitsService.ɵfac = function LimitsService_Factory(t) { return new (t || LimitsService)(); };
    LimitsService.ɵprov = /*@__PURE__*/ i0__namespace.ɵɵdefineInjectable({ token: LimitsService, factory: LimitsService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(LimitsService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return []; }, null);
    })();
    var PositionChangeData = /** @class */ (function () {
        function PositionChangeData(position, roles) {
            this.x = position.x;
            this.y = position.y;
            this.roles = roles;
        }
        return PositionChangeData;
    }());

    var NgxDraggablePointComponent = /** @class */ (function () {
        function NgxDraggablePointComponent(limitsService) {
            this.limitsService = limitsService;
            this.width = 10;
            this.height = 10;
            this.color = '#3cabe2';
            this.shape = 'rect';
            this.pointOptions = 'rect';
            this.position = {
                x: 0,
                y: 0
            };
        }
        NgxDraggablePointComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            Object.keys(this.pointOptions).forEach(function (key) {
                _this[key] = _this.pointOptions[key];
            });
            // subscribe to pane dimensions changes
            this.limitsService.paneDimensions.subscribe(function (dimensions) {
                if (dimensions.width > 0 && dimensions.width > 0) {
                    _this._paneDimensions = {
                        width: dimensions.width,
                        height: dimensions.height
                    };
                    _this.position = _this.getInitialPosition(dimensions);
                    _this.limitsService.positionChange(new PositionChangeData(_this.position, _this.limitRoles));
                }
            });
            // subscribe to external reposition events
            this.limitsService.repositionEvent.subscribe(function (positions) {
                if (positions.length > 0) {
                    _this.externalReposition(positions);
                }
            });
        };
        /**
         * returns a css style object for the point
         */
        NgxDraggablePointComponent.prototype.pointStyle = function () {
            return {
                width: this.width + 'px',
                height: this.height + 'px',
                'background-color': this.color,
                'border-radius': this.shape === 'circle' ? '100%' : 0,
                position: 'absolute'
            };
        };
        /**
         * registers a position change on the limits service, and adjusts position if necessary
         * @param position - the current position of the point
         */
        NgxDraggablePointComponent.prototype.positionChange = function (position) {
            var positionChangeData = new PositionChangeData(position, this.limitRoles);
            var limitException = this.limitsService.exceedsLimit(positionChangeData);
            if (limitException.exceeds) {
                // if exceeds limits, reposition
                this.resetPosition = limitException.resetCoordinates;
            }
            else {
                this.limitsService.positionChange(positionChangeData);
                this._currentPosition = position;
            }
        };
        /**
         * adjusts the position of the point after a limit exception
         */
        NgxDraggablePointComponent.prototype.adjustPosition = function (limitException) {
            var newPosition = {
                x: 0,
                y: 0
            };
            Object.keys(this.startPosition).forEach(function (axis) {
                newPosition[axis] = limitException.resetCoordinates[axis] + limitException.resetCoefficients[axis];
            });
            this.position = newPosition;
            this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
        };
        /**
         * called on movement end, checks if last position exceeded the limits ad adjusts
         */
        NgxDraggablePointComponent.prototype.movementEnd = function (position) {
            var positionChangeData = new PositionChangeData(position, this.limitRoles);
            var limitException = this.limitsService.exceedsLimit(positionChangeData);
            if (limitException.exceeds) {
                this.resetPosition = limitException.resetCoordinates;
                if (limitException.exceeds) {
                    this.adjustPosition(limitException);
                    positionChangeData = new PositionChangeData(this.position, this.limitRoles);
                    this.limitsService.updatePosition(positionChangeData);
                }
            }
        };
        /**
         * calculates the initial positions of the point by it's roles
         * @param dimensions - dimensions of the pane in which the point is located
         */
        NgxDraggablePointComponent.prototype.getInitialPosition = function (dimensions) {
            return {
                x: this.limitRoles.includes('left') ? 0 : dimensions.width - this.width / 2,
                y: this.limitRoles.includes('top') ? 0 : dimensions.height - this.height / 2
            };
        };
        /**
         * repositions the point after an external reposition event
         * @param positions - an array of all points on the pane
         */
        NgxDraggablePointComponent.prototype.externalReposition = function (positions) {
            var _this = this;
            positions.forEach(function (position) {
                if (_this.limitsService.compareArray(_this.limitRoles, position.roles)) {
                    position = _this.enforcePaneLimits(position);
                    _this.position = {
                        x: position.x,
                        y: position.y
                    };
                }
            });
        };
        /**
         * returns a new point position if the movement exceeded the pane limit
         */
        NgxDraggablePointComponent.prototype.enforcePaneLimits = function (position) {
            if (this._paneDimensions.width === 0 || this._paneDimensions.height === 0) {
                return position;
            }
            else {
                if (position.x > this._paneDimensions.width) {
                    position.x = this._paneDimensions.width;
                }
                if (position.x < 0) {
                    position.x = 1;
                }
                if (position.y > this._paneDimensions.height) {
                    position.y = this._paneDimensions.height;
                }
                if (position.y < 0) {
                    position.y = 1;
                }
            }
            return position;
        };
        return NgxDraggablePointComponent;
    }());
    NgxDraggablePointComponent.ɵfac = function NgxDraggablePointComponent_Factory(t) { return new (t || NgxDraggablePointComponent)(i0__namespace.ɵɵdirectiveInject(LimitsService)); };
    NgxDraggablePointComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: NgxDraggablePointComponent, selectors: [["ngx-draggable-point"]], inputs: { width: "width", height: "height", color: "color", shape: "shape", pointOptions: "pointOptions", limitRoles: "limitRoles", startPosition: "startPosition", container: "container", _currentPosition: "_currentPosition" }, decls: 2, vars: 4, consts: [["ngDraggable", "draggable", 2, "z-index", "1000", 3, "ngStyle", "position", "bounds", "inBounds", "movingOffset", "endOffset"], ["point", ""]], template: function NgxDraggablePointComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "div", 0, 1);
                i0__namespace.ɵɵlistener("movingOffset", function NgxDraggablePointComponent_Template_div_movingOffset_0_listener($event) { return ctx.positionChange($event); })("endOffset", function NgxDraggablePointComponent_Template_div_endOffset_0_listener($event) { return ctx.movementEnd($event); });
                i0__namespace.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0__namespace.ɵɵproperty("ngStyle", ctx.pointStyle())("position", ctx.position)("bounds", ctx.container)("inBounds", true);
            }
        }, directives: [i2__namespace.AngularDraggableDirective, i3__namespace.DefaultStyleDirective, i6__namespace.NgStyle], encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxDraggablePointComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-draggable-point',
                        templateUrl: './ngx-draggable-point.component.html',
                    }]
            }], function () { return [{ type: LimitsService }]; }, { width: [{
                    type: i0.Input
                }], height: [{
                    type: i0.Input
                }], color: [{
                    type: i0.Input
                }], shape: [{
                    type: i0.Input
                }], pointOptions: [{
                    type: i0.Input
                }], limitRoles: [{
                    type: i0.Input
                }], startPosition: [{
                    type: i0.Input
                }], container: [{
                    type: i0.Input
                }], _currentPosition: [{
                    type: i0.Input
                }] });
    })();

    function NgxFilterMenuComponent_button_1_mat_icon_6_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "mat-icon");
            i0__namespace.ɵɵtext(1, "done");
            i0__namespace.ɵɵelementEnd();
        }
    }
    function NgxFilterMenuComponent_button_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementStart(0, "button", 1);
            i0__namespace.ɵɵlistener("click", function NgxFilterMenuComponent_button_1_Template_button_click_0_listener() { var restoredCtx = i0__namespace.ɵɵrestoreView(_r4_1); var option_r1 = restoredCtx.$implicit; var ctx_r3 = i0__namespace.ɵɵnextContext(); return ctx_r3.selectOption(option_r1.name); });
            i0__namespace.ɵɵelementStart(1, "mat-icon");
            i0__namespace.ɵɵtext(2);
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementStart(3, "span", 2);
            i0__namespace.ɵɵtext(4);
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelement(5, "span", 3);
            i0__namespace.ɵɵtemplate(6, NgxFilterMenuComponent_button_1_mat_icon_6_Template, 2, 0, "mat-icon", 4);
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var option_r1 = ctx.$implicit;
            var ctx_r0 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵtextInterpolate(option_r1.icon);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵtextInterpolate(option_r1.text);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵproperty("ngIf", option_r1.name === ctx_r0.data.filter);
        }
    }
    var NgxFilterMenuComponent = /** @class */ (function () {
        function NgxFilterMenuComponent(bottomSheetRef, data) {
            var _this = this;
            this.bottomSheetRef = bottomSheetRef;
            this.data = data;
            this.filterOptions = [
                {
                    name: 'bw2',
                    icon: 'filter_b_and_w',
                    action: function (filter) {
                        _this.filterSelected.emit(filter);
                    },
                    text: 'B&W 2'
                },
                {
                    name: 'bw3',
                    icon: 'blur_on',
                    action: function (filter) {
                        _this.filterSelected.emit(filter);
                    },
                    text: 'B&W 3'
                },
                {
                    name: 'magic_color',
                    icon: 'filter_vintage',
                    action: function (filter) {
                        _this.filterSelected.emit(filter);
                    },
                    text: 'Magic Color'
                },
                {
                    name: 'default',
                    icon: 'crop_original',
                    action: function (filter) {
                        _this.filterSelected.emit(filter);
                    },
                    text: 'Original'
                },
            ];
            this.filterSelected = new i0.EventEmitter();
        }
        NgxFilterMenuComponent.prototype.selectOption = function (optionName) {
            this.data.filter = optionName;
            this.bottomSheetRef.dismiss();
        };
        return NgxFilterMenuComponent;
    }());
    NgxFilterMenuComponent.ɵfac = function NgxFilterMenuComponent_Factory(t) { return new (t || NgxFilterMenuComponent)(i0__namespace.ɵɵdirectiveInject(i1__namespace.MatBottomSheetRef), i0__namespace.ɵɵdirectiveInject(i1.MAT_BOTTOM_SHEET_DATA)); };
    NgxFilterMenuComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: NgxFilterMenuComponent, selectors: [["ngx-filter-menu"]], outputs: { filterSelected: "filterSelected" }, decls: 2, vars: 1, consts: [["mat-list-item", "", 3, "click", 4, "ngFor", "ngForOf"], ["mat-list-item", "", 3, "click"], ["fxFlex", "100", 2, "text-align", "start", "margin", "5px"], ["fxFlex", "100"], [4, "ngIf"]], template: function NgxFilterMenuComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "mat-action-list");
                i0__namespace.ɵɵtemplate(1, NgxFilterMenuComponent_button_1_Template, 7, 3, "button", 0);
                i0__namespace.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngForOf", ctx.filterOptions);
            }
        }, directives: [i2__namespace$1.MatList, i6__namespace.NgForOf, i2__namespace$1.MatListItem, i4__namespace.MatIcon, i4__namespace$1.DefaultFlexDirective, i6__namespace.NgIf], encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxFilterMenuComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-filter-menu',
                        templateUrl: './ngx-filter-menu.component.html',
                    }]
            }], function () {
            return [{ type: i1__namespace.MatBottomSheetRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.MAT_BOTTOM_SHEET_DATA]
                        }] }];
        }, { filterSelected: [{
                    type: i0.Output
                }] });
    })();

    var _c0$1 = ["outline"];
    var _c1$1 = function (a0, a1) { return { width: a0, height: a1 }; };
    function NgxShapeOutlineComponent_canvas_0_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelement(0, "canvas", 1, 2);
        }
        if (rf & 2) {
            var ctx_r0 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵproperty("ngStyle", i0__namespace.ɵɵpureFunction2(1, _c1$1, ctx_r0.dimensions.width + "px", ctx_r0.dimensions.height + "px"));
        }
    }
    var NgxShapeOutlineComponent = /** @class */ (function () {
        function NgxShapeOutlineComponent(limitsService) {
            this.limitsService = limitsService;
            this.color = '#3cabe2';
        }
        NgxShapeOutlineComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            // init drawing canvas dimensions
            this.canvas.nativeElement.width = this.dimensions.width;
            this.canvas.nativeElement.height = this.dimensions.height;
            this.limitsService.positions.subscribe(function (positions) {
                if (positions.length === 4) {
                    _this._points = positions;
                    _this.sortPoints();
                    _this.clearCanvas();
                    _this.drawShape();
                }
            });
            // subscribe to changes in the pane's dimensions
            this.limitsService.paneDimensions.subscribe(function (dimensions) {
                _this.clearCanvas();
                _this.canvas.nativeElement.width = dimensions.width;
                _this.canvas.nativeElement.height = dimensions.height;
            });
            // subscribe to reposition events
            this.limitsService.repositionEvent.subscribe(function (positions) {
                if (positions.length === 4) {
                    setTimeout(function () {
                        _this.clearCanvas();
                        _this.sortPoints();
                        _this.drawShape();
                    }, 10);
                }
            });
        };
        /**
         * clears the shape canvas
         */
        NgxShapeOutlineComponent.prototype.clearCanvas = function () {
            var canvas = this.canvas.nativeElement;
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        };
        /**
         * sorts the array of points according to their clockwise alignment
         */
        NgxShapeOutlineComponent.prototype.sortPoints = function () {
            var _this = this;
            var _points = Array.from(this._points);
            var sortedPoints = [];
            var sortOrder = {
                vertical: ['top', 'top', 'bottom', 'bottom'],
                horizontal: ['left', 'right', 'right', 'left']
            };
            var _loop_1 = function (i) {
                var roles = Array.from([sortOrder.vertical[i], sortOrder.horizontal[i]]);
                sortedPoints.push(_points.filter(function (point) {
                    return _this.limitsService.compareArray(point.roles, roles);
                })[0]);
            };
            for (var i = 0; i < 4; i++) {
                _loop_1(i);
            }
            this._sortedPoints = sortedPoints;
        };
        /**
         * draws a line between the points according to their order
         */
        NgxShapeOutlineComponent.prototype.drawShape = function () {
            var _this = this;
            var canvas = this.canvas.nativeElement;
            var ctx = canvas.getContext('2d');
            ctx.lineWidth = this.weight;
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            this._sortedPoints.forEach(function (point, index) {
                if (index === 0) {
                    ctx.moveTo(point.x, point.y);
                }
                if (index !== _this._sortedPoints.length - 1) {
                    var nextPoint = _this._sortedPoints[index + 1];
                    ctx.lineTo(nextPoint.x, nextPoint.y);
                }
                else {
                    ctx.closePath();
                }
            });
            ctx.stroke();
        };
        return NgxShapeOutlineComponent;
    }());
    NgxShapeOutlineComponent.ɵfac = function NgxShapeOutlineComponent_Factory(t) { return new (t || NgxShapeOutlineComponent)(i0__namespace.ɵɵdirectiveInject(LimitsService)); };
    NgxShapeOutlineComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: NgxShapeOutlineComponent, selectors: [["ngx-shape-outine"]], viewQuery: function NgxShapeOutlineComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵviewQuery(_c0$1, 5);
            }
            if (rf & 2) {
                var _t = void 0;
                i0__namespace.ɵɵqueryRefresh(_t = i0__namespace.ɵɵloadQuery()) && (ctx.canvas = _t.first);
            }
        }, inputs: { color: "color", weight: "weight", dimensions: "dimensions" }, decls: 1, vars: 1, consts: [["style", "position: absolute; z-index: 1000", 3, "ngStyle", 4, "ngIf"], [2, "position", "absolute", "z-index", "1000", 3, "ngStyle"], ["outline", ""]], template: function NgxShapeOutlineComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵtemplate(0, NgxShapeOutlineComponent_canvas_0_Template, 2, 4, "canvas", 0);
            }
            if (rf & 2) {
                i0__namespace.ɵɵproperty("ngIf", ctx.dimensions);
            }
        }, directives: [i6__namespace.NgIf, i3__namespace.DefaultStyleDirective, i6__namespace.NgStyle], encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxShapeOutlineComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-shape-outine',
                        templateUrl: './ngx-shape-outline.component.html',
                    }]
            }], function () { return [{ type: LimitsService }]; }, { color: [{
                    type: i0.Input
                }], weight: [{
                    type: i0.Input
                }], dimensions: [{
                    type: i0.Input
                }], canvas: [{
                    type: i0.ViewChild,
                    args: ['outline']
                }] });
    })();

    var _c0 = ["PreviewCanvas"];
    var _c1 = function () { return { x: 0, y: 0 }; };
    var _c2 = function () { return ["top", "left"]; };
    var _c3 = function (a0) { return { x: a0, y: 0 }; };
    var _c4 = function () { return ["top", "right"]; };
    var _c5 = function (a1) { return { x: 0, y: a1 }; };
    var _c6 = function () { return ["bottom", "left"]; };
    var _c7 = function (a0, a1) { return { x: a0, y: a1 }; };
    var _c8 = function () { return ["bottom", "right"]; };
    function NgxDocScannerComponent_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementContainerStart(0);
            i0__namespace.ɵɵelement(1, "ngx-shape-outine", 8, 9);
            i0__namespace.ɵɵelement(3, "ngx-draggable-point", 10, 11);
            i0__namespace.ɵɵelement(5, "ngx-draggable-point", 10, 12);
            i0__namespace.ɵɵelement(7, "ngx-draggable-point", 10, 13);
            i0__namespace.ɵɵelement(9, "ngx-draggable-point", 10, 14);
            i0__namespace.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0__namespace.ɵɵnextContext();
            var _r0 = i0__namespace.ɵɵreference(2);
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵproperty("color", ctx_r1.options.cropToolColor)("weight", ctx_r1.options.cropToolLineWeight)("dimensions", ctx_r1.previewDimensions);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵproperty("pointOptions", ctx_r1.options.pointOptions)("startPosition", i0__namespace.ɵɵpureFunction0(19, _c1))("limitRoles", i0__namespace.ɵɵpureFunction0(20, _c2))("container", _r0);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵproperty("pointOptions", ctx_r1.options.pointOptions)("startPosition", i0__namespace.ɵɵpureFunction1(21, _c3, ctx_r1.previewDimensions.width))("limitRoles", i0__namespace.ɵɵpureFunction0(23, _c4))("container", _r0);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵproperty("pointOptions", ctx_r1.options.pointOptions)("startPosition", i0__namespace.ɵɵpureFunction1(24, _c5, ctx_r1.previewDimensions.height))("limitRoles", i0__namespace.ɵɵpureFunction0(26, _c6))("container", _r0);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵproperty("pointOptions", ctx_r1.options.pointOptions)("startPosition", i0__namespace.ɵɵpureFunction2(27, _c7, ctx_r1.previewDimensions.width, ctx_r1.previewDimensions.height))("limitRoles", i0__namespace.ɵɵpureFunction0(30, _c8))("container", _r0);
        }
    }
    function NgxDocScannerComponent_ng_container_7_button_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r14_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementStart(0, "button", 18);
            i0__namespace.ɵɵlistener("click", function NgxDocScannerComponent_ng_container_7_button_1_Template_button_click_0_listener() { i0__namespace.ɵɵrestoreView(_r14_1); var button_r9 = i0__namespace.ɵɵnextContext().$implicit; return button_r9.action(); });
            i0__namespace.ɵɵelementStart(1, "mat-icon");
            i0__namespace.ɵɵtext(2);
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var button_r9 = i0__namespace.ɵɵnextContext().$implicit;
            var ctx_r10 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵproperty("name", button_r9.name)("color", ctx_r10.options.buttonThemeColor);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵtextInterpolate(button_r9.icon);
        }
    }
    function NgxDocScannerComponent_ng_container_7_button_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r18_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementStart(0, "button", 19);
            i0__namespace.ɵɵlistener("click", function NgxDocScannerComponent_ng_container_7_button_2_Template_button_click_0_listener() { i0__namespace.ɵɵrestoreView(_r18_1); var button_r9 = i0__namespace.ɵɵnextContext().$implicit; return button_r9.action(); });
            i0__namespace.ɵɵelementStart(1, "mat-icon");
            i0__namespace.ɵɵtext(2);
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementStart(3, "span");
            i0__namespace.ɵɵtext(4);
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var button_r9 = i0__namespace.ɵɵnextContext().$implicit;
            var ctx_r11 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵproperty("name", button_r9.name)("color", ctx_r11.options.buttonThemeColor);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵtextInterpolate(button_r9.icon);
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵtextInterpolate1("", button_r9.text, "}");
        }
    }
    function NgxDocScannerComponent_ng_container_7_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementContainerStart(0, 15);
            i0__namespace.ɵɵtemplate(1, NgxDocScannerComponent_ng_container_7_button_1_Template, 3, 3, "button", 16);
            i0__namespace.ɵɵtemplate(2, NgxDocScannerComponent_ng_container_7_button_2_Template, 5, 4, "button", 17);
            i0__namespace.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var button_r9 = ctx.$implicit;
            i0__namespace.ɵɵproperty("ngSwitch", button_r9.type);
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵproperty("ngSwitchCase", "fab");
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵproperty("ngSwitchCase", "button");
        }
    }
    var _c9 = function (a0) { return { "max-width": a0 }; };
    var NgxDocScannerComponent = /** @class */ (function () {
        function NgxDocScannerComponent(ngxOpenCv, limitsService, bottomSheet) {
            var _this = this;
            this.ngxOpenCv = ngxOpenCv;
            this.limitsService = limitsService;
            this.bottomSheet = bottomSheet;
            // ************* //
            // EDITOR CONFIG //
            // ************* //
            /**
             * an array of action buttons displayed on the editor screen
             */
            this.editorButtons = [
                {
                    name: 'exit',
                    action: function () {
                        _this.exitEditor.emit('canceled');
                    },
                    icon: 'arrow_back',
                    type: 'fab',
                    mode: 'crop'
                },
                {
                    name: 'rotate',
                    action: this.rotateImage.bind(this),
                    icon: 'rotate_right',
                    type: 'fab',
                    mode: 'crop'
                },
                {
                    name: 'done_crop',
                    action: function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.mode = 'color';
                                    return [4 /*yield*/, this.transform()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, this.applyFilter(true)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); },
                    icon: 'done',
                    type: 'fab',
                    mode: 'crop'
                },
                {
                    name: 'back',
                    action: function () {
                        _this.mode = 'crop';
                        _this.loadFile(_this.originalImage);
                    },
                    icon: 'arrow_back',
                    type: 'fab',
                    mode: 'color'
                },
                {
                    name: 'filter',
                    action: function () {
                        return _this.chooseFilters();
                    },
                    icon: 'photo_filter',
                    type: 'fab',
                    mode: 'color'
                },
                {
                    name: 'upload',
                    action: this.exportImage.bind(this),
                    icon: 'cloud_upload',
                    type: 'fab',
                    mode: 'color'
                },
            ];
            /**
             * true after the image is loaded and preview is displayed
             */
            this.imageLoaded = false;
            /**
             * editor mode
             */
            this.mode = 'crop';
            /**
             * filter selected by the user, returned by the filter selector bottom sheet
             */
            this.selectedFilter = 'default';
            /**
             * image dimensions
             */
            this.imageDimensions = {
                width: 0,
                height: 0
            };
            // ************** //
            // EVENT EMITTERS //
            // ************** //
            /**
             * optional binding to the exit button of the editor
             */
            this.exitEditor = new i0.EventEmitter();
            /**
             * fires on edit completion
             */
            this.editResult = new i0.EventEmitter();
            /**
             * emits errors, can be linked to an error handler of choice
             */
            this.error = new i0.EventEmitter();
            /**
             * emits the loading status of the cv module.
             */
            this.ready = new i0.EventEmitter();
            /**
             * emits true when processing is done, false when completed
             */
            this.processing = new i0.EventEmitter();
            this.screenDimensions = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            // subscribe to status of cv module
            this.ngxOpenCv.cvState.subscribe(function (cvState) {
                _this.cvState = cvState.state;
                _this.ready.emit(cvState.ready);
                if (cvState.error) {
                    _this.error.emit(new Error('error loading cv'));
                }
                else if (cvState.loading) {
                    _this.processing.emit(true);
                }
                else if (cvState.ready) {
                    _this.processing.emit(false);
                }
            });
            // subscribe to positions of crop tool
            this.limitsService.positions.subscribe(function (points) {
                _this.points = points;
            });
        }
        Object.defineProperty(NgxDocScannerComponent.prototype, "displayedButtons", {
            /**
             * returns an array of buttons according to the editor mode
             */
            get: function () {
                var _this = this;
                return this.editorButtons.filter(function (button) {
                    return button.mode === _this.mode;
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgxDocScannerComponent.prototype, "file", {
            // ****** //
            // INPUTS //
            // ****** //
            /**
             * set image for editing
             * @param file - file from form input
             */
            set: function (file) {
                var _this = this;
                if (file) {
                    setTimeout(function () {
                        _this.processing.emit(true);
                    }, 5);
                    this.imageLoaded = false;
                    this.originalImage = file;
                    this.ngxOpenCv.cvState.subscribe(function (cvState) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!cvState.ready) return [3 /*break*/, 2];
                                    // read file to image & canvas
                                    return [4 /*yield*/, this.loadFile(file)];
                                case 1:
                                    // read file to image & canvas
                                    _a.sent();
                                    this.processing.emit(false);
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                }
            },
            enumerable: false,
            configurable: true
        });
        NgxDocScannerComponent.prototype.ngOnInit = function () {
            var _this = this;
            // set options from config object
            this.options = new ImageEditorConfig(this.config);
            // set export image icon
            this.editorButtons.forEach(function (button) {
                if (button.name === 'upload') {
                    button.icon = _this.options.exportImageIcon;
                }
            });
            this.maxPreviewWidth = this.options.maxPreviewWidth;
            this.editorStyle = this.options.editorStyle;
        };
        // ***************************** //
        // editor action buttons methods //
        // ***************************** //
        /**
         * emits the exitEditor event
         */
        NgxDocScannerComponent.prototype.exit = function () {
            this.exitEditor.emit('canceled');
        };
        /**
         * applies the selected filter, and when done emits the resulted image
         */
        NgxDocScannerComponent.prototype.exportImage = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.applyFilter(false)];
                        case 1:
                            _a.sent();
                            if (this.options.maxImageDimensions) {
                                this.resize(this.editedImage)
                                    .then(function (resizeResult) {
                                    resizeResult.toBlob(function (blob) {
                                        _this.editResult.emit(blob);
                                        _this.processing.emit(false);
                                    }, _this.originalImage.type);
                                });
                            }
                            else {
                                this.editedImage.toBlob(function (blob) {
                                    _this.editResult.emit(blob);
                                    _this.processing.emit(false);
                                }, this.originalImage.type);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * open the bottom sheet for selecting filters, and applies the selected filter in preview mode
         */
        NgxDocScannerComponent.prototype.chooseFilters = function () {
            var _this = this;
            var data = { filter: this.selectedFilter };
            var bottomSheetRef = this.bottomSheet.open(NgxFilterMenuComponent, {
                data: data
            });
            bottomSheetRef.afterDismissed().subscribe(function () {
                _this.selectedFilter = data.filter;
                _this.applyFilter(true);
            });
        };
        // *************************** //
        // File Input & Output Methods //
        // *************************** //
        /**
         * load image from input field
         */
        NgxDocScannerComponent.prototype.loadFile = function (file) {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var err_1, err_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.processing.emit(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.readImage(file)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            console.error(err_1);
                            this.error.emit(new Error(err_1));
                            return [3 /*break*/, 4];
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.showPreview()];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            err_2 = _a.sent();
                            console.error(err_2);
                            this.error.emit(new Error(err_2));
                            return [3 /*break*/, 7];
                        case 7:
                            // set pane limits
                            // show points
                            this.imageLoaded = true;
                            return [4 /*yield*/, this.limitsService.setPaneDimensions({ width: this.previewDimensions.width, height: this.previewDimensions.height })];
                        case 8:
                            _a.sent();
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.detectContours()];
                                        case 1:
                                            _a.sent();
                                            this.processing.emit(false);
                                            resolve(true);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 15);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * read image from File object
         */
        NgxDocScannerComponent.prototype.readImage = function (file) {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var imageSrc, err_3, img;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, readFile()];
                        case 1:
                            imageSrc = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            err_3 = _a.sent();
                            reject(err_3);
                            return [3 /*break*/, 3];
                        case 3:
                            img = new Image();
                            img.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                                var ctx, width, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            // set edited image canvas and dimensions
                                            this.editedImage = document.createElement('canvas');
                                            this.editedImage.width = img.width;
                                            this.editedImage.height = img.height;
                                            ctx = this.editedImage.getContext('2d');
                                            ctx.drawImage(img, 0, 0);
                                            width = img.width > img.height ? img.height : img.width;
                                            if (!(width > this.options.maxImageDimensions.width)) return [3 /*break*/, 2];
                                            _a = this;
                                            return [4 /*yield*/, this.resize(this.editedImage)];
                                        case 1:
                                            _a.editedImage = _b.sent();
                                            _b.label = 2;
                                        case 2:
                                            this.imageDimensions.width = this.editedImage.width;
                                            this.imageDimensions.height = this.editedImage.height;
                                            this.setPreviewPaneDimensions(this.editedImage);
                                            resolve(true);
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            img.src = imageSrc;
                            return [2 /*return*/];
                    }
                });
            }); });
            /**
             * read file from input field
             */
            function readFile() {
                return new Promise(function (resolve, reject) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        resolve(reader.result);
                    };
                    reader.onerror = function (err) {
                        reject(err);
                    };
                    reader.readAsDataURL(file);
                });
            }
        };
        // ************************ //
        // Image Processing Methods //
        // ************************ //
        /**
         * rotate image 90 degrees
         */
        NgxDocScannerComponent.prototype.rotateImage = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.processing.emit(true);
                setTimeout(function () {
                    var dst = cv.imread(_this.editedImage);
                    // const dst = new cv.Mat();
                    cv.transpose(dst, dst);
                    cv.flip(dst, dst, 1);
                    cv.imshow(_this.editedImage, dst);
                    // src.delete();
                    dst.delete();
                    // save current preview dimensions and positions
                    var initialPreviewDimensions = { width: 0, height: 0 };
                    Object.assign(initialPreviewDimensions, _this.previewDimensions);
                    var initialPositions = Array.from(_this.points);
                    // get new dimensions
                    // set new preview pane dimensions
                    _this.setPreviewPaneDimensions(_this.editedImage);
                    // get preview pane resize ratio
                    var previewResizeRatios = {
                        width: _this.previewDimensions.width / initialPreviewDimensions.width,
                        height: _this.previewDimensions.height / initialPreviewDimensions.height
                    };
                    // set new preview pane dimensions
                    _this.limitsService.rotateClockwise(previewResizeRatios, initialPreviewDimensions, initialPositions);
                    _this.showPreview().then(function () {
                        _this.processing.emit(false);
                        resolve(true);
                    });
                }, 30);
            });
        };
        /**
         * detects the contours of the document and
         **/
        NgxDocScannerComponent.prototype.detectContours = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.processing.emit(true);
                setTimeout(function () {
                    // load the image and compute the ratio of the old height to the new height, clone it, and resize it
                    var processingResizeRatio = 0.5;
                    var dst = cv.imread(_this.editedImage);
                    var dsize = new cv.Size(dst.rows * processingResizeRatio, dst.cols * processingResizeRatio);
                    var ksize = new cv.Size(5, 5);
                    // convert the image to grayscale, blur it, and find edges in the image
                    cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
                    cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
                    cv.Canny(dst, dst, 75, 200);
                    // find contours
                    cv.threshold(dst, dst, 120, 200, cv.THRESH_BINARY);
                    var contours = new cv.MatVector();
                    var hierarchy = new cv.Mat();
                    cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
                    var rect = cv.boundingRect(dst);
                    dst.delete();
                    hierarchy.delete();
                    contours.delete();
                    // transform the rectangle into a set of points
                    Object.keys(rect).forEach(function (key) {
                        rect[key] = rect[key] * _this.imageResizeRatio;
                    });
                    var contourCoordinates = [
                        new PositionChangeData({ x: rect.x, y: rect.y }, ['left', 'top']),
                        new PositionChangeData({ x: rect.x + rect.width, y: rect.y }, ['right', 'top']),
                        new PositionChangeData({ x: rect.x + rect.width, y: rect.y + rect.height }, ['right', 'bottom']),
                        new PositionChangeData({ x: rect.x, y: rect.y + rect.height }, ['left', 'bottom']),
                    ];
                    _this.limitsService.repositionPoints(contourCoordinates);
                    // this.processing.emit(false);
                    resolve();
                }, 30);
            });
        };
        /**
         * apply perspective transform
         */
        NgxDocScannerComponent.prototype.transform = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.processing.emit(true);
                setTimeout(function () {
                    var dst = cv.imread(_this.editedImage);
                    // create source coordinates matrix
                    var sourceCoordinates = [
                        _this.getPoint(['top', 'left']),
                        _this.getPoint(['top', 'right']),
                        _this.getPoint(['bottom', 'right']),
                        _this.getPoint(['bottom', 'left'])
                    ].map(function (point) {
                        return [point.x / _this.imageResizeRatio, point.y / _this.imageResizeRatio];
                    });
                    // get max width
                    var bottomWidth = _this.getPoint(['bottom', 'right']).x - _this.getPoint(['bottom', 'left']).x;
                    var topWidth = _this.getPoint(['top', 'right']).x - _this.getPoint(['top', 'left']).x;
                    var maxWidth = Math.max(bottomWidth, topWidth) / _this.imageResizeRatio;
                    // get max height
                    var leftHeight = _this.getPoint(['bottom', 'left']).y - _this.getPoint(['top', 'left']).y;
                    var rightHeight = _this.getPoint(['bottom', 'right']).y - _this.getPoint(['top', 'right']).y;
                    var maxHeight = Math.max(leftHeight, rightHeight) / _this.imageResizeRatio;
                    // create dest coordinates matrix
                    var destCoordinates = [
                        [0, 0],
                        [maxWidth - 1, 0],
                        [maxWidth - 1, maxHeight - 1],
                        [0, maxHeight - 1]
                    ];
                    // convert to open cv matrix objects
                    var Ms = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat.apply([], __spreadArray([], __read(sourceCoordinates))));
                    var Md = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat.apply([], __spreadArray([], __read(destCoordinates))));
                    var transformMatrix = cv.getPerspectiveTransform(Ms, Md);
                    // set new image size
                    var dsize = new cv.Size(maxWidth, maxHeight);
                    // perform warp
                    cv.warpPerspective(dst, dst, transformMatrix, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
                    cv.imshow(_this.editedImage, dst);
                    dst.delete();
                    Ms.delete();
                    Md.delete();
                    transformMatrix.delete();
                    _this.setPreviewPaneDimensions(_this.editedImage);
                    _this.showPreview().then(function () {
                        _this.processing.emit(false);
                        resolve();
                    });
                }, 30);
            });
        };
        /**
         * applies the selected filter to the image
         * @param preview - when true, will not apply the filter to the edited image but only display a preview.
         * when false, will apply to editedImage
         */
        NgxDocScannerComponent.prototype.applyFilter = function (preview) {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var options, dst;
                var _this = this;
                return __generator(this, function (_a) {
                    this.processing.emit(true);
                    options = {
                        blur: false,
                        th: true,
                        thMode: cv.ADAPTIVE_THRESH_MEAN_C,
                        thMeanCorrection: 10,
                        thBlockSize: 25,
                        thMax: 255,
                        grayScale: true,
                    };
                    dst = cv.imread(this.editedImage);
                    switch (this.selectedFilter) {
                        case 'default':
                            options.th = false;
                            options.grayScale = false;
                            options.blur = false;
                            break;
                        case 'magic_color':
                            options.grayScale = false;
                            break;
                        case 'bw2':
                            options.thMode = cv.ADAPTIVE_THRESH_GAUSSIAN_C;
                            options.thMeanCorrection = 15;
                            options.thBlockSize = 15;
                            break;
                        case 'bw3':
                            options.blur = true;
                            options.thMeanCorrection = 15;
                            break;
                    }
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var ksize;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (options.grayScale) {
                                        cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
                                    }
                                    if (options.blur) {
                                        ksize = new cv.Size(5, 5);
                                        cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
                                    }
                                    if (options.th) {
                                        if (options.grayScale) {
                                            cv.adaptiveThreshold(dst, dst, options.thMax, options.thMode, cv.THRESH_BINARY, options.thBlockSize, options.thMeanCorrection);
                                        }
                                        else {
                                            dst.convertTo(dst, -1, 1, 60);
                                            cv.threshold(dst, dst, 170, 255, cv.THRESH_BINARY);
                                        }
                                    }
                                    if (!preview) {
                                        cv.imshow(this.editedImage, dst);
                                    }
                                    return [4 /*yield*/, this.showPreview(dst)];
                                case 1:
                                    _a.sent();
                                    this.processing.emit(false);
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 30);
                    return [2 /*return*/];
                });
            }); });
        };
        /**
         * resize an image to fit constraints set in options.maxImageDimensions
         */
        NgxDocScannerComponent.prototype.resize = function (image) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.processing.emit(true);
                setTimeout(function () {
                    var src = cv.imread(image);
                    var currentDimensions = {
                        width: src.size().width,
                        height: src.size().height
                    };
                    var resizeDimensions = {
                        width: 0,
                        height: 0
                    };
                    if (currentDimensions.width > _this.options.maxImageDimensions.width) {
                        resizeDimensions.width = _this.options.maxImageDimensions.width;
                        resizeDimensions.height = _this.options.maxImageDimensions.width / currentDimensions.width * currentDimensions.height;
                        if (resizeDimensions.height > _this.options.maxImageDimensions.height) {
                            resizeDimensions.height = _this.options.maxImageDimensions.height;
                            resizeDimensions.width = _this.options.maxImageDimensions.height / currentDimensions.height * currentDimensions.width;
                        }
                        var dsize = new cv.Size(Math.floor(resizeDimensions.width), Math.floor(resizeDimensions.height));
                        cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);
                        var resizeResult = document.createElement('canvas');
                        cv.imshow(resizeResult, src);
                        src.delete();
                        _this.processing.emit(false);
                        resolve(resizeResult);
                    }
                    else {
                        _this.processing.emit(false);
                        resolve(image);
                    }
                }, 30);
            });
        };
        /**
         * display a preview of the image on the preview canvas
         */
        NgxDocScannerComponent.prototype.showPreview = function (image) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var src;
                if (image) {
                    src = image;
                }
                else {
                    src = cv.imread(_this.editedImage);
                }
                var dst = new cv.Mat();
                var dsize = new cv.Size(0, 0);
                cv.resize(src, dst, dsize, _this.imageResizeRatio, _this.imageResizeRatio, cv.INTER_AREA);
                cv.imshow(_this.previewCanvas.nativeElement, dst);
                src.delete();
                dst.delete();
                resolve(true);
            });
        };
        // *************** //
        // Utility Methods //
        // *************** //
        /**
         * set preview canvas dimensions according to the canvas element of the original image
         */
        NgxDocScannerComponent.prototype.setPreviewPaneDimensions = function (img) {
            // set preview pane dimensions
            this.previewDimensions = this.calculateDimensions(img.width, img.height);
            this.previewCanvas.nativeElement.width = this.previewDimensions.width;
            this.previewCanvas.nativeElement.height = this.previewDimensions.height;
            this.imageResizeRatio = this.previewDimensions.width / img.width;
            this.imageDivStyle = {
                width: this.previewDimensions.width + this.options.cropToolDimensions.width + 'px',
                height: this.previewDimensions.height + this.options.cropToolDimensions.height + 'px',
                'margin-left': "calc((100% - " + (this.previewDimensions.width + 10) + "px) / 2 + " + this.options.cropToolDimensions.width / 2 + "px)",
                'margin-right': "calc((100% - " + (this.previewDimensions.width + 10) + "px) / 2 - " + this.options.cropToolDimensions.width / 2 + "px)",
            };
            this.limitsService.setPaneDimensions({ width: this.previewDimensions.width, height: this.previewDimensions.height });
        };
        /**
         * calculate dimensions of the preview canvas
         */
        NgxDocScannerComponent.prototype.calculateDimensions = function (width, height) {
            var ratio = width / height;
            var maxWidth = this.screenDimensions.width > this.maxPreviewWidth ?
                this.maxPreviewWidth : this.screenDimensions.width - 40;
            var maxHeight = this.screenDimensions.height - 240;
            var calculated = {
                width: maxWidth,
                height: Math.round(maxWidth / ratio),
                ratio: ratio
            };
            if (calculated.height > maxHeight) {
                calculated.height = maxHeight;
                calculated.width = Math.round(maxHeight * ratio);
            }
            return calculated;
        };
        /**
         * returns a point by it's roles
         * @param roles - an array of roles by which the point will be fetched
         */
        NgxDocScannerComponent.prototype.getPoint = function (roles) {
            var _this = this;
            return this.points.find(function (point) {
                return _this.limitsService.compareArray(point.roles, roles);
            });
        };
        return NgxDocScannerComponent;
    }());
    NgxDocScannerComponent.ɵfac = function NgxDocScannerComponent_Factory(t) { return new (t || NgxDocScannerComponent)(i0__namespace.ɵɵdirectiveInject(i1__namespace$1.NgxOpenCVService), i0__namespace.ɵɵdirectiveInject(LimitsService), i0__namespace.ɵɵdirectiveInject(i1__namespace.MatBottomSheet)); };
    NgxDocScannerComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: NgxDocScannerComponent, selectors: [["ngx-doc-scanner"]], viewQuery: function NgxDocScannerComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵviewQuery(_c0, 5, i0.ElementRef);
            }
            if (rf & 2) {
                var _t = void 0;
                i0__namespace.ɵɵqueryRefresh(_t = i0__namespace.ɵɵloadQuery()) && (ctx.previewCanvas = _t.first);
            }
        }, inputs: { file: "file", config: "config" }, outputs: { exitEditor: "exitEditor", editResult: "editResult", error: "error", ready: "ready", processing: "processing" }, decls: 8, vars: 7, consts: [["fxLayoutAlign", "space-around", 2, "direction", "ltr !important", 3, "ngStyle"], [2, "margin", "auto", 3, "ngStyle"], ["imageContainer", ""], [4, "ngIf"], [2, "z-index", "5", 3, "ngStyle"], ["PreviewCanvas", ""], ["fxLayout", "row", "fxLayoutAlign", "space-around", 1, "editor-actions", 2, "position", "absolute", "bottom", "0", "width", "100vw"], [3, "ngSwitch", 4, "ngFor", "ngForOf"], [3, "color", "weight", "dimensions"], ["shapeOutline", ""], [3, "pointOptions", "startPosition", "limitRoles", "container"], ["topLeft", ""], ["topRight", ""], ["bottomLeft", ""], ["bottomRight", ""], [3, "ngSwitch"], ["mat-mini-fab", "", 3, "name", "color", "click", 4, "ngSwitchCase"], ["mat-raised-button", "", 3, "name", "color", "click", 4, "ngSwitchCase"], ["mat-mini-fab", "", 3, "name", "color", "click"], ["mat-raised-button", "", 3, "name", "color", "click"]], template: function NgxDocScannerComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "div", 0);
                i0__namespace.ɵɵelementStart(1, "div", 1, 2);
                i0__namespace.ɵɵtemplate(3, NgxDocScannerComponent_ng_container_3_Template, 11, 31, "ng-container", 3);
                i0__namespace.ɵɵelement(4, "canvas", 4, 5);
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵelementStart(6, "div", 6);
                i0__namespace.ɵɵtemplate(7, NgxDocScannerComponent_ng_container_7_Template, 3, 3, "ng-container", 7);
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0__namespace.ɵɵproperty("ngStyle", ctx.editorStyle);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngStyle", ctx.imageDivStyle);
                i0__namespace.ɵɵadvance(2);
                i0__namespace.ɵɵproperty("ngIf", ctx.imageLoaded && ctx.mode === "crop");
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngStyle", i0__namespace.ɵɵpureFunction1(5, _c9, ctx.options.maxPreviewWidth));
                i0__namespace.ɵɵadvance(3);
                i0__namespace.ɵɵproperty("ngForOf", ctx.displayedButtons);
            }
        }, directives: [i4__namespace$1.DefaultLayoutAlignDirective, i3__namespace.DefaultStyleDirective, i6__namespace.NgStyle, i6__namespace.NgIf, i4__namespace$1.DefaultLayoutDirective, i6__namespace.NgForOf, NgxShapeOutlineComponent, NgxDraggablePointComponent, i6__namespace.NgSwitch, i6__namespace.NgSwitchCase, i9__namespace.MatButton, i4__namespace.MatIcon], styles: [".editor-actions[_ngcontent-%COMP%]{padding:12px}.editor-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:5px}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxDocScannerComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-doc-scanner',
                        templateUrl: './ngx-doc-scanner.component.html',
                        styleUrls: ['./ngx-doc-scanner.component.scss']
                    }]
            }], function () { return [{ type: i1__namespace$1.NgxOpenCVService }, { type: LimitsService }, { type: i1__namespace.MatBottomSheet }]; }, { previewCanvas: [{
                    type: i0.ViewChild,
                    args: ['PreviewCanvas', { read: i0.ElementRef }]
                }], exitEditor: [{
                    type: i0.Output
                }], editResult: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], ready: [{
                    type: i0.Output
                }], processing: [{
                    type: i0.Output
                }], file: [{
                    type: i0.Input
                }], config: [{
                    type: i0.Input
                }] });
    })();
    /**
     * a class for generating configuration objects for the editor
     */
    var ImageEditorConfig = /** @class */ (function () {
        function ImageEditorConfig(options) {
            var _this = this;
            /**
             * max dimensions of oputput image. if set to zero
             */
            this.maxImageDimensions = {
                width: 800,
                height: 1200
            };
            /**
             * background color of the main editor div
             */
            this.editorBackgroundColor = '#fefefe';
            /**
             * css properties for the main editor div
             */
            this.editorDimensions = {
                width: '100vw',
                height: '100vh'
            };
            /**
             * css that will be added to the main div of the editor component
             */
            this.extraCss = {
                position: 'absolute',
                top: 0,
                left: 0
            };
            /**
             * material design theme color name
             */
            this.buttonThemeColor = 'accent';
            /**
             * icon for the button that completes the editing and emits the edited image
             */
            this.exportImageIcon = 'cloud_upload';
            /**
             * color of the crop tool
             */
            this.cropToolColor = '#3cabe2';
            /**
             * shape of the crop tool, can be either a rectangle or a circle
             */
            this.cropToolShape = 'rect';
            /**
             * dimensions of the crop tool
             */
            this.cropToolDimensions = {
                width: 10,
                height: 10
            };
            /**
             * crop tool outline width
             */
            this.cropToolLineWeight = 3;
            /**
             * maximum size of the preview pane
             */
            this.maxPreviewWidth = 800;
            if (options) {
                Object.keys(options).forEach(function (key) {
                    _this[key] = options[key];
                });
            }
            this.editorStyle = { 'background-color': this.editorBackgroundColor };
            Object.assign(this.editorStyle, this.editorDimensions);
            Object.assign(this.editorStyle, this.extraCss);
            this.pointOptions = {
                shape: this.cropToolShape,
                color: this.cropToolColor,
                width: 0,
                height: 0
            };
            Object.assign(this.pointOptions, this.cropToolDimensions);
        }
        return ImageEditorConfig;
    }());

    var NgxDocumentScannerModule = /** @class */ (function () {
        function NgxDocumentScannerModule() {
        }
        NgxDocumentScannerModule.forRoot = function (config) {
            return {
                ngModule: NgxDocumentScannerModule,
                providers: [
                    { provide: i1$1.OpenCvConfigToken, useValue: config },
                ],
            };
        };
        return NgxDocumentScannerModule;
    }());
    NgxDocumentScannerModule.ɵfac = function NgxDocumentScannerModule_Factory(t) { return new (t || NgxDocumentScannerModule)(); };
    NgxDocumentScannerModule.ɵmod = /*@__PURE__*/ i0__namespace.ɵɵdefineNgModule({ type: NgxDocumentScannerModule });
    NgxDocumentScannerModule.ɵinj = /*@__PURE__*/ i0__namespace.ɵɵdefineInjector({ providers: [
            i1$1.NgxOpenCVService,
            LimitsService,
        ], imports: [[
                flexLayout.FlexLayoutModule,
                i9.MatButtonModule,
                i4.MatIconModule,
                i1.MatBottomSheetModule,
                i2$1.MatListModule,
                i2.AngularDraggableModule,
                i6.CommonModule,
                i1$1.NgxOpenCVModule,
            ], flexLayout.FlexLayoutModule,
            i9.MatButtonModule,
            i4.MatIconModule,
            i1.MatBottomSheetModule,
            i2$1.MatListModule,
            i2.AngularDraggableModule] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxDocumentScannerModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgxDraggablePointComponent,
                            NgxFilterMenuComponent,
                            NgxShapeOutlineComponent,
                            NgxDocScannerComponent,
                        ],
                        imports: [
                            flexLayout.FlexLayoutModule,
                            i9.MatButtonModule,
                            i4.MatIconModule,
                            i1.MatBottomSheetModule,
                            i2$1.MatListModule,
                            i2.AngularDraggableModule,
                            i6.CommonModule,
                            i1$1.NgxOpenCVModule,
                        ],
                        exports: [
                            flexLayout.FlexLayoutModule,
                            i9.MatButtonModule,
                            i4.MatIconModule,
                            i1.MatBottomSheetModule,
                            i2$1.MatListModule,
                            i2.AngularDraggableModule,
                            NgxDocScannerComponent,
                        ],
                        entryComponents: [
                            NgxFilterMenuComponent,
                        ],
                        providers: [
                            i1$1.NgxOpenCVService,
                            LimitsService,
                        ]
                    }]
            }], null, null);
    })();
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(NgxDocumentScannerModule, { declarations: [NgxDraggablePointComponent,
                NgxFilterMenuComponent,
                NgxShapeOutlineComponent,
                NgxDocScannerComponent], imports: [flexLayout.FlexLayoutModule,
                i9.MatButtonModule,
                i4.MatIconModule,
                i1.MatBottomSheetModule,
                i2$1.MatListModule,
                i2.AngularDraggableModule,
                i6.CommonModule,
                i1$1.NgxOpenCVModule], exports: [flexLayout.FlexLayoutModule,
                i9.MatButtonModule,
                i4.MatIconModule,
                i1.MatBottomSheetModule,
                i2$1.MatListModule,
                i2.AngularDraggableModule,
                NgxDocScannerComponent] });
    })();

    /*
     * Public API Surface of ngx-document-scanner
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxDocScannerComponent = NgxDocScannerComponent;
    exports.NgxDocumentScannerModule = NgxDocumentScannerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-document-scanner.umd.js.map
