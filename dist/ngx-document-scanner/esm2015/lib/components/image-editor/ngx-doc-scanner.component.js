import { __awaiter } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LimitsService, PositionChangeData } from '../../services/limits.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NgxFilterMenuComponent } from '../filter-menu/ngx-filter-menu.component';
import { NgxOpenCVService } from 'ngx-opencv';
export class NgxDocScannerComponent {
    constructor(ngxOpenCv, limitsService, bottomSheet) {
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
                action: () => {
                    this.exitEditor.emit('canceled');
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
                action: () => __awaiter(this, void 0, void 0, function* () {
                    this.mode = 'color';
                    yield this.transform();
                    yield this.applyFilter(true);
                }),
                icon: 'done',
                type: 'fab',
                mode: 'crop'
            },
            {
                name: 'back',
                action: () => {
                    this.mode = 'crop';
                    this.loadFile(this.originalImage);
                },
                icon: 'arrow_back',
                type: 'fab',
                mode: 'color'
            },
            {
                name: 'filter',
                action: () => {
                    return this.chooseFilters();
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
        this.exitEditor = new EventEmitter();
        /**
         * fires on edit completion
         */
        this.editResult = new EventEmitter();
        /**
         * emits errors, can be linked to an error handler of choice
         */
        this.error = new EventEmitter();
        /**
         * emits the loading status of the cv module.
         */
        this.ready = new EventEmitter();
        /**
         * emits true when processing is done, false when completed
         */
        this.processing = new EventEmitter();
        this.screenDimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        // subscribe to status of cv module
        this.ngxOpenCv.cvState.subscribe((cvState) => {
            this.cvState = cvState.state;
            this.ready.emit(cvState.ready);
            if (cvState.error) {
                this.error.emit(new Error('error loading cv'));
            }
            else if (cvState.loading) {
                this.processing.emit(true);
            }
            else if (cvState.ready) {
                this.processing.emit(false);
            }
        });
        // subscribe to positions of crop tool
        this.limitsService.positions.subscribe(points => {
            this.points = points;
        });
    }
    /**
     * returns an array of buttons according to the editor mode
     */
    get displayedButtons() {
        return this.editorButtons.filter(button => {
            return button.mode === this.mode;
        });
    }
    // ****** //
    // INPUTS //
    // ****** //
    /**
     * set image for editing
     * @param file - file from form input
     */
    set file(file) {
        if (file) {
            setTimeout(() => {
                this.processing.emit(true);
            }, 5);
            this.imageLoaded = false;
            this.originalImage = file;
            this.ngxOpenCv.cvState.subscribe((cvState) => __awaiter(this, void 0, void 0, function* () {
                if (cvState.ready) {
                    // read file to image & canvas
                    yield this.loadFile(file);
                    this.processing.emit(false);
                }
            }));
        }
    }
    ngOnInit() {
        // set options from config object
        this.options = new ImageEditorConfig(this.config);
        // set export image icon
        this.editorButtons.forEach(button => {
            if (button.name === 'upload') {
                button.icon = this.options.exportImageIcon;
            }
        });
        this.maxPreviewWidth = this.options.maxPreviewWidth;
        this.editorStyle = this.options.editorStyle;
    }
    // ***************************** //
    // editor action buttons methods //
    // ***************************** //
    /**
     * emits the exitEditor event
     */
    exit() {
        this.exitEditor.emit('canceled');
    }
    /**
     * applies the selected filter, and when done emits the resulted image
     */
    exportImage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.applyFilter(false);
            if (this.options.maxImageDimensions) {
                this.resize(this.editedImage)
                    .then(resizeResult => {
                    resizeResult.toBlob((blob) => {
                        this.editResult.emit(blob);
                        this.processing.emit(false);
                    }, this.originalImage.type);
                });
            }
            else {
                this.editedImage.toBlob((blob) => {
                    this.editResult.emit(blob);
                    this.processing.emit(false);
                }, this.originalImage.type);
            }
        });
    }
    /**
     * open the bottom sheet for selecting filters, and applies the selected filter in preview mode
     */
    chooseFilters() {
        const data = { filter: this.selectedFilter };
        const bottomSheetRef = this.bottomSheet.open(NgxFilterMenuComponent, {
            data: data
        });
        bottomSheetRef.afterDismissed().subscribe(() => {
            this.selectedFilter = data.filter;
            this.applyFilter(true);
        });
    }
    // *************************** //
    // File Input & Output Methods //
    // *************************** //
    /**
     * load image from input field
     */
    loadFile(file) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.processing.emit(true);
            try {
                yield this.readImage(file);
            }
            catch (err) {
                console.error(err);
                this.error.emit(new Error(err));
            }
            try {
                yield this.showPreview();
            }
            catch (err) {
                console.error(err);
                this.error.emit(new Error(err));
            }
            // set pane limits
            // show points
            this.imageLoaded = true;
            yield this.limitsService.setPaneDimensions({ width: this.previewDimensions.width, height: this.previewDimensions.height });
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield this.detectContours();
                this.processing.emit(false);
                resolve(true);
            }), 15);
        }));
    }
    /**
     * read image from File object
     */
    readImage(file) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let imageSrc;
            try {
                imageSrc = yield readFile();
            }
            catch (err) {
                reject(err);
            }
            const img = new Image();
            img.onload = () => __awaiter(this, void 0, void 0, function* () {
                // set edited image canvas and dimensions
                this.editedImage = document.createElement('canvas');
                this.editedImage.width = img.width;
                this.editedImage.height = img.height;
                const ctx = this.editedImage.getContext('2d');
                ctx.drawImage(img, 0, 0);
                // resize image if larger than max image size
                const width = img.width > img.height ? img.height : img.width;
                if (width > this.options.maxImageDimensions.width) {
                    this.editedImage = yield this.resize(this.editedImage);
                }
                this.imageDimensions.width = this.editedImage.width;
                this.imageDimensions.height = this.editedImage.height;
                this.setPreviewPaneDimensions(this.editedImage);
                resolve(true);
            });
            img.src = imageSrc;
        }));
        /**
         * read file from input field
         */
        function readFile() {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve(reader.result);
                };
                reader.onerror = (err) => {
                    reject(err);
                };
                reader.readAsDataURL(file);
            });
        }
    }
    // ************************ //
    // Image Processing Methods //
    // ************************ //
    /**
     * rotate image 90 degrees
     */
    rotateImage() {
        return new Promise((resolve, reject) => {
            this.processing.emit(true);
            setTimeout(() => {
                const dst = cv.imread(this.editedImage);
                // const dst = new cv.Mat();
                cv.transpose(dst, dst);
                cv.flip(dst, dst, 1);
                cv.imshow(this.editedImage, dst);
                // src.delete();
                dst.delete();
                // save current preview dimensions and positions
                const initialPreviewDimensions = { width: 0, height: 0 };
                Object.assign(initialPreviewDimensions, this.previewDimensions);
                const initialPositions = Array.from(this.points);
                // get new dimensions
                // set new preview pane dimensions
                this.setPreviewPaneDimensions(this.editedImage);
                // get preview pane resize ratio
                const previewResizeRatios = {
                    width: this.previewDimensions.width / initialPreviewDimensions.width,
                    height: this.previewDimensions.height / initialPreviewDimensions.height
                };
                // set new preview pane dimensions
                this.limitsService.rotateClockwise(previewResizeRatios, initialPreviewDimensions, initialPositions);
                this.showPreview().then(() => {
                    this.processing.emit(false);
                    resolve(true);
                });
            }, 30);
        });
    }
    /**
     * detects the contours of the document and
     **/
    detectContours() {
        return new Promise((resolve, reject) => {
            this.processing.emit(true);
            setTimeout(() => {
                // load the image and compute the ratio of the old height to the new height, clone it, and resize it
                const processingResizeRatio = 0.5;
                const dst = cv.imread(this.editedImage);
                const dsize = new cv.Size(dst.rows * processingResizeRatio, dst.cols * processingResizeRatio);
                const ksize = new cv.Size(5, 5);
                // convert the image to grayscale, blur it, and find edges in the image
                cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
                cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
                cv.Canny(dst, dst, 75, 200);
                // find contours
                cv.threshold(dst, dst, 120, 200, cv.THRESH_BINARY);
                const contours = new cv.MatVector();
                const hierarchy = new cv.Mat();
                cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
                const rect = cv.boundingRect(dst);
                dst.delete();
                hierarchy.delete();
                contours.delete();
                // transform the rectangle into a set of points
                Object.keys(rect).forEach(key => {
                    rect[key] = rect[key] * this.imageResizeRatio;
                });
                const contourCoordinates = [
                    new PositionChangeData({ x: rect.x, y: rect.y }, ['left', 'top']),
                    new PositionChangeData({ x: rect.x + rect.width, y: rect.y }, ['right', 'top']),
                    new PositionChangeData({ x: rect.x + rect.width, y: rect.y + rect.height }, ['right', 'bottom']),
                    new PositionChangeData({ x: rect.x, y: rect.y + rect.height }, ['left', 'bottom']),
                ];
                this.limitsService.repositionPoints(contourCoordinates);
                // this.processing.emit(false);
                resolve();
            }, 30);
        });
    }
    /**
     * apply perspective transform
     */
    transform() {
        return new Promise((resolve, reject) => {
            this.processing.emit(true);
            setTimeout(() => {
                const dst = cv.imread(this.editedImage);
                // create source coordinates matrix
                const sourceCoordinates = [
                    this.getPoint(['top', 'left']),
                    this.getPoint(['top', 'right']),
                    this.getPoint(['bottom', 'right']),
                    this.getPoint(['bottom', 'left'])
                ].map(point => {
                    return [point.x / this.imageResizeRatio, point.y / this.imageResizeRatio];
                });
                // get max width
                const bottomWidth = this.getPoint(['bottom', 'right']).x - this.getPoint(['bottom', 'left']).x;
                const topWidth = this.getPoint(['top', 'right']).x - this.getPoint(['top', 'left']).x;
                const maxWidth = Math.max(bottomWidth, topWidth) / this.imageResizeRatio;
                // get max height
                const leftHeight = this.getPoint(['bottom', 'left']).y - this.getPoint(['top', 'left']).y;
                const rightHeight = this.getPoint(['bottom', 'right']).y - this.getPoint(['top', 'right']).y;
                const maxHeight = Math.max(leftHeight, rightHeight) / this.imageResizeRatio;
                // create dest coordinates matrix
                const destCoordinates = [
                    [0, 0],
                    [maxWidth - 1, 0],
                    [maxWidth - 1, maxHeight - 1],
                    [0, maxHeight - 1]
                ];
                // convert to open cv matrix objects
                const Ms = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat(...sourceCoordinates));
                const Md = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat(...destCoordinates));
                const transformMatrix = cv.getPerspectiveTransform(Ms, Md);
                // set new image size
                const dsize = new cv.Size(maxWidth, maxHeight);
                // perform warp
                cv.warpPerspective(dst, dst, transformMatrix, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
                cv.imshow(this.editedImage, dst);
                dst.delete();
                Ms.delete();
                Md.delete();
                transformMatrix.delete();
                this.setPreviewPaneDimensions(this.editedImage);
                this.showPreview().then(() => {
                    this.processing.emit(false);
                    resolve();
                });
            }, 30);
        });
    }
    /**
     * applies the selected filter to the image
     * @param preview - when true, will not apply the filter to the edited image but only display a preview.
     * when false, will apply to editedImage
     */
    applyFilter(preview) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.processing.emit(true);
            // default options
            const options = {
                blur: false,
                th: true,
                thMode: cv.ADAPTIVE_THRESH_MEAN_C,
                thMeanCorrection: 10,
                thBlockSize: 25,
                thMax: 255,
                grayScale: true,
            };
            const dst = cv.imread(this.editedImage);
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
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                if (options.grayScale) {
                    cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
                }
                if (options.blur) {
                    const ksize = new cv.Size(5, 5);
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
                yield this.showPreview(dst);
                this.processing.emit(false);
                resolve();
            }), 30);
        }));
    }
    /**
     * resize an image to fit constraints set in options.maxImageDimensions
     */
    resize(image) {
        return new Promise((resolve, reject) => {
            this.processing.emit(true);
            setTimeout(() => {
                const src = cv.imread(image);
                const currentDimensions = {
                    width: src.size().width,
                    height: src.size().height
                };
                const resizeDimensions = {
                    width: 0,
                    height: 0
                };
                if (currentDimensions.width > this.options.maxImageDimensions.width) {
                    resizeDimensions.width = this.options.maxImageDimensions.width;
                    resizeDimensions.height = this.options.maxImageDimensions.width / currentDimensions.width * currentDimensions.height;
                    if (resizeDimensions.height > this.options.maxImageDimensions.height) {
                        resizeDimensions.height = this.options.maxImageDimensions.height;
                        resizeDimensions.width = this.options.maxImageDimensions.height / currentDimensions.height * currentDimensions.width;
                    }
                    const dsize = new cv.Size(Math.floor(resizeDimensions.width), Math.floor(resizeDimensions.height));
                    cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);
                    const resizeResult = document.createElement('canvas');
                    cv.imshow(resizeResult, src);
                    src.delete();
                    this.processing.emit(false);
                    resolve(resizeResult);
                }
                else {
                    this.processing.emit(false);
                    resolve(image);
                }
            }, 30);
        });
    }
    /**
     * display a preview of the image on the preview canvas
     */
    showPreview(image) {
        return new Promise((resolve, reject) => {
            let src;
            if (image) {
                src = image;
            }
            else {
                src = cv.imread(this.editedImage);
            }
            const dst = new cv.Mat();
            const dsize = new cv.Size(0, 0);
            cv.resize(src, dst, dsize, this.imageResizeRatio, this.imageResizeRatio, cv.INTER_AREA);
            cv.imshow(this.previewCanvas.nativeElement, dst);
            src.delete();
            dst.delete();
            resolve(true);
        });
    }
    // *************** //
    // Utility Methods //
    // *************** //
    /**
     * set preview canvas dimensions according to the canvas element of the original image
     */
    setPreviewPaneDimensions(img) {
        // set preview pane dimensions
        this.previewDimensions = this.calculateDimensions(img.width, img.height);
        this.previewCanvas.nativeElement.width = this.previewDimensions.width;
        this.previewCanvas.nativeElement.height = this.previewDimensions.height;
        this.imageResizeRatio = this.previewDimensions.width / img.width;
        this.imageDivStyle = {
            width: this.previewDimensions.width + this.options.cropToolDimensions.width + 'px',
            height: this.previewDimensions.height + this.options.cropToolDimensions.height + 'px',
            'margin-left': `calc((100% - ${this.previewDimensions.width + 10}px) / 2 + ${this.options.cropToolDimensions.width / 2}px)`,
            'margin-right': `calc((100% - ${this.previewDimensions.width + 10}px) / 2 - ${this.options.cropToolDimensions.width / 2}px)`,
        };
        this.limitsService.setPaneDimensions({ width: this.previewDimensions.width, height: this.previewDimensions.height });
    }
    /**
     * calculate dimensions of the preview canvas
     */
    calculateDimensions(width, height) {
        const ratio = width / height;
        const maxWidth = this.screenDimensions.width > this.maxPreviewWidth ?
            this.maxPreviewWidth : this.screenDimensions.width - 40;
        const maxHeight = this.screenDimensions.height - 240;
        const calculated = {
            width: maxWidth,
            height: Math.round(maxWidth / ratio),
            ratio: ratio
        };
        if (calculated.height > maxHeight) {
            calculated.height = maxHeight;
            calculated.width = Math.round(maxHeight * ratio);
        }
        return calculated;
    }
    /**
     * returns a point by it's roles
     * @param roles - an array of roles by which the point will be fetched
     */
    getPoint(roles) {
        return this.points.find(point => {
            return this.limitsService.compareArray(point.roles, roles);
        });
    }
}
NgxDocScannerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-doc-scanner',
                template: "<div [ngStyle]=\"editorStyle\" fxLayoutAlign=\"space-around\" style=\"direction: ltr !important\">\r\n  <div #imageContainer [ngStyle]=\"imageDivStyle\" style=\"margin: auto;\" >\r\n    <ng-container *ngIf=\"imageLoaded && mode === 'crop'\">\r\n      <ngx-shape-outine #shapeOutline [color]=\"options.cropToolColor\" [weight]=\"options.cropToolLineWeight\" [dimensions]=\"previewDimensions\"></ngx-shape-outine>\r\n      <ngx-draggable-point #topLeft [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: 0, y: 0}\" [limitRoles]=\"['top', 'left']\" [container]=\"imageContainer\"></ngx-draggable-point>\r\n      <ngx-draggable-point #topRight [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: previewDimensions.width, y: 0}\" [limitRoles]=\"['top', 'right']\" [container]=\"imageContainer\"></ngx-draggable-point>\r\n      <ngx-draggable-point #bottomLeft [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: 0, y: previewDimensions.height}\" [limitRoles]=\"['bottom', 'left']\" [container]=\"imageContainer\"></ngx-draggable-point>\r\n      <ngx-draggable-point #bottomRight [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: previewDimensions.width, y: previewDimensions.height}\" [limitRoles]=\"['bottom', 'right']\" [container]=\"imageContainer\"></ngx-draggable-point>\r\n    </ng-container>\r\n    <canvas #PreviewCanvas [ngStyle]=\"{'max-width': options.maxPreviewWidth}\" style=\"z-index: 5\" ></canvas>\r\n  </div>\r\n  <div class=\"editor-actions\" fxLayout=\"row\" fxLayoutAlign=\"space-around\" style=\"position: absolute; bottom: 0; width: 100vw\">\r\n    <ng-container *ngFor=\"let button of displayedButtons\" [ngSwitch]=\"button.type\">\r\n      <button mat-mini-fab *ngSwitchCase=\"'fab'\" [name]=\"button.name\" (click)=\"button.action()\" [color]=\"options.buttonThemeColor\">\r\n        <mat-icon>{{button.icon}}</mat-icon>\r\n      </button>\r\n      <button mat-raised-button *ngSwitchCase=\"'button'\" [name]=\"button.name\" (click)=\"button.action()\" [color]=\"options.buttonThemeColor\">\r\n        <mat-icon>{{button.icon}}</mat-icon>\r\n        <span>{{button.text}}}</span>\r\n      </button>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n\r\n\r\n",
                styles: [".editor-actions{padding:12px}.editor-actions button{margin:5px}"]
            },] }
];
/** @nocollapse */
NgxDocScannerComponent.ctorParameters = () => [
    { type: NgxOpenCVService },
    { type: LimitsService },
    { type: MatBottomSheet }
];
NgxDocScannerComponent.propDecorators = {
    previewCanvas: [{ type: ViewChild, args: ['PreviewCanvas', { read: ElementRef },] }],
    exitEditor: [{ type: Output }],
    editResult: [{ type: Output }],
    error: [{ type: Output }],
    ready: [{ type: Output }],
    processing: [{ type: Output }],
    file: [{ type: Input }],
    config: [{ type: Input }]
};
/**
 * a class for generating configuration objects for the editor
 */
class ImageEditorConfig {
    constructor(options) {
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
            Object.keys(options).forEach(key => {
                this[key] = options[key];
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1kb2N1bWVudC1zY2FubmVyL3NyYy9saWIvY29tcG9uZW50cy9pbWFnZS1lZGl0b3Ivbmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxhQUFhLEVBQXVCLGtCQUFrQixFQUFhLE1BQU0sK0JBQStCLENBQUM7QUFDakgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBS2hGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLFlBQVksQ0FBQztBQVM1QyxNQUFNLE9BQU8sc0JBQXNCO0lBeU1qQyxZQUFvQixTQUEyQixFQUFVLGFBQTRCLEVBQVUsV0FBMkI7UUFBdEcsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQXBNMUgsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkI7O1dBRUc7UUFDSyxrQkFBYSxHQUE4QjtZQUNqRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsR0FBRyxFQUFFO29CQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxZQUFZO2dCQUNsQixJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0Us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b25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0xpbWl0c1NlcnZpY2UsIFBvaW50UG9zaXRpb25DaGFuZ2UsIFBvc2l0aW9uQ2hhbmdlRGF0YSwgUm9sZXNBcnJheX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbGltaXRzLnNlcnZpY2UnO1xyXG5pbXBvcnQge01hdEJvdHRvbVNoZWV0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9ib3R0b20tc2hlZXQnO1xyXG5pbXBvcnQge05neEZpbHRlck1lbnVDb21wb25lbnR9IGZyb20gJy4uL2ZpbHRlci1tZW51L25neC1maWx0ZXItbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQge1BvaW50U2hhcGV9IGZyb20gJy4uLy4uL1ByaXZhdGVNb2RlbHMnO1xyXG4vLyBpbXBvcnQge05neE9wZW5DVlNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25neC1vcGVuY3Yuc2VydmljZSc7XHJcbmltcG9ydCB7SW1hZ2VEaW1lbnNpb25zLCBEb2NTY2FubmVyQ29uZmlnLCBPcGVuQ1ZTdGF0ZX0gZnJvbSAnLi4vLi4vUHVibGljTW9kZWxzJztcclxuaW1wb3J0IHtFZGl0b3JBY3Rpb25CdXR0b24sIFBvaW50T3B0aW9uc30gZnJvbSAnLi4vLi4vUHJpdmF0ZU1vZGVscyc7XHJcbmltcG9ydCB7Tmd4T3BlbkNWU2VydmljZX0gZnJvbSAnbmd4LW9wZW5jdic7XHJcblxyXG5kZWNsYXJlIHZhciBjdjogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtZG9jLXNjYW5uZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZG9jLXNjYW5uZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25neC1kb2Mtc2Nhbm5lci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hEb2NTY2FubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAvKipcclxuICAgKiBlZGl0b3IgY29uZmlnIG9iamVjdFxyXG4gICAqL1xyXG4gIG9wdGlvbnM6IEltYWdlRWRpdG9yQ29uZmlnO1xyXG4gIC8vICoqKioqKioqKioqKiogLy9cclxuICAvLyBFRElUT1IgQ09ORklHIC8vXHJcbiAgLy8gKioqKioqKioqKioqKiAvL1xyXG4gIC8qKlxyXG4gICAqIGFuIGFycmF5IG9mIGFjdGlvbiBidXR0b25zIGRpc3BsYXllZCBvbiB0aGUgZWRpdG9yIHNjcmVlblxyXG4gICAqL1xyXG4gIHByaXZhdGUgZWRpdG9yQnV0dG9uczogQXJyYXk8RWRpdG9yQWN0aW9uQnV0dG9uPiA9IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2V4aXQnLFxyXG4gICAgICBhY3Rpb246ICgpID0+IHtcclxuICAgICAgICB0aGlzLmV4aXRFZGl0b3IuZW1pdCgnY2FuY2VsZWQnKTtcclxuICAgICAgfSxcclxuICAgICAgaWNvbjogJ2Fycm93X2JhY2snLFxyXG4gICAgICB0eXBlOiAnZmFiJyxcclxuICAgICAgbW9kZTogJ2Nyb3AnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAncm90YXRlJyxcclxuICAgICAgYWN0aW9uOiB0aGlzLnJvdGF0ZUltYWdlLmJpbmQodGhpcyksXHJcbiAgICAgIGljb246ICdyb3RhdGVfcmlnaHQnLFxyXG4gICAgICB0eXBlOiAnZmFiJyxcclxuICAgICAgbW9kZTogJ2Nyb3AnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnZG9uZV9jcm9wJyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gJ2NvbG9yJztcclxuICAgICAgICBhd2FpdCB0aGlzLnRyYW5zZm9ybSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYXBwbHlGaWx0ZXIodHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGljb246ICdkb25lJyxcclxuICAgICAgdHlwZTogJ2ZhYicsXHJcbiAgICAgIG1vZGU6ICdjcm9wJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2JhY2snLFxyXG4gICAgICBhY3Rpb246ICgpID0+IHtcclxuICAgICAgICB0aGlzLm1vZGUgPSAnY3JvcCc7XHJcbiAgICAgICAgdGhpcy5sb2FkRmlsZSh0aGlzLm9yaWdpbmFsSW1hZ2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBpY29uOiAnYXJyb3dfYmFjaycsXHJcbiAgICAgIHR5cGU6ICdmYWInLFxyXG4gICAgICBtb2RlOiAnY29sb3InXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnZmlsdGVyJyxcclxuICAgICAgYWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hvb3NlRmlsdGVycygpO1xyXG4gICAgICB9LFxyXG4gICAgICBpY29uOiAncGhvdG9fZmlsdGVyJyxcclxuICAgICAgdHlwZTogJ2ZhYicsXHJcbiAgICAgIG1vZGU6ICdjb2xvcidcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICd1cGxvYWQnLFxyXG4gICAgICBhY3Rpb246IHRoaXMuZXhwb3J0SW1hZ2UuYmluZCh0aGlzKSxcclxuICAgICAgaWNvbjogJ2Nsb3VkX3VwbG9hZCcsXHJcbiAgICAgIHR5cGU6ICdmYWInLFxyXG4gICAgICBtb2RlOiAnY29sb3InXHJcbiAgICB9LFxyXG4gIF07XHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBhbiBhcnJheSBvZiBidXR0b25zIGFjY29yZGluZyB0byB0aGUgZWRpdG9yIG1vZGVcclxuICAgKi9cclxuICBnZXQgZGlzcGxheWVkQnV0dG9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLmVkaXRvckJ1dHRvbnMuZmlsdGVyKGJ1dHRvbiA9PiB7XHJcbiAgICAgIHJldHVybiBidXR0b24ubW9kZSA9PT0gdGhpcy5tb2RlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIG1heCB3aWR0aCBvZiB0aGUgcHJldmlldyBhcmVhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXhQcmV2aWV3V2lkdGg6IG51bWJlcjtcclxuICAvKipcclxuICAgKiBkaW1lbnNpb25zIG9mIHRoZSBpbWFnZSBjb250YWluZXJcclxuICAgKi9cclxuICBpbWFnZURpdlN0eWxlOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcn07XHJcbiAgLyoqXHJcbiAgICogZWRpdG9yIGRpdiBzdHlsZVxyXG4gICAqL1xyXG4gIGVkaXRvclN0eWxlOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcn07XHJcblxyXG4gIC8vICoqKioqKioqKioqKiogLy9cclxuICAvLyBFRElUT1IgU1RBVEUgLy9cclxuICAvLyAqKioqKioqKioqKioqIC8vXHJcbiAgLyoqXHJcbiAgICogc3RhdGUgb2Ygb3BlbmN2IGxvYWRpbmdcclxuICAgKi9cclxuICBwcml2YXRlIGN2U3RhdGU6IHN0cmluZztcclxuICAvKipcclxuICAgKiB0cnVlIGFmdGVyIHRoZSBpbWFnZSBpcyBsb2FkZWQgYW5kIHByZXZpZXcgaXMgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgaW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAvKipcclxuICAgKiBlZGl0b3IgbW9kZVxyXG4gICAqL1xyXG4gIG1vZGU6ICdjcm9wJ3wnY29sb3InID0gJ2Nyb3AnO1xyXG4gIC8qKlxyXG4gICAqIGZpbHRlciBzZWxlY3RlZCBieSB0aGUgdXNlciwgcmV0dXJuZWQgYnkgdGhlIGZpbHRlciBzZWxlY3RvciBib3R0b20gc2hlZXRcclxuICAgKi9cclxuICBwcml2YXRlIHNlbGVjdGVkRmlsdGVyID0gJ2RlZmF1bHQnO1xyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXHJcbiAgLy8gT1BFUkFUSU9OIFZBUklBQkxFUyAvL1xyXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cclxuICAvKipcclxuICAgKiB2aWV3cG9ydCBkaW1lbnNpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzY3JlZW5EaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnM7XHJcbiAgLyoqXHJcbiAgICogaW1hZ2UgZGltZW5zaW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgaW1hZ2VEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMgPSB7XHJcbiAgICB3aWR0aDogMCxcclxuICAgIGhlaWdodDogMFxyXG4gIH07XHJcbiAgLyoqXHJcbiAgICogZGltZW5zaW9ucyBvZiB0aGUgcHJldmlldyBwYW5lXHJcbiAgICovXHJcbiAgcHJldmlld0RpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcclxuICAvKipcclxuICAgKiByYXRpb24gYmV0d2VlbiBwcmV2aWV3IGltYWdlIGFuZCBvcmlnaW5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW1hZ2VSZXNpemVSYXRpbzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyB0aGUgb3JpZ2luYWwgaW1hZ2UgZm9yIHJlc2V0IHB1cnBvc2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvcmlnaW5hbEltYWdlOiBGaWxlO1xyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyB0aGUgZWRpdGVkIGltYWdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlZGl0ZWRJbWFnZTogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIHRoZSBwcmV2aWV3IGltYWdlIGFzIGNhbnZhc1xyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoJ1ByZXZpZXdDYW52YXMnLCB7cmVhZDogRWxlbWVudFJlZn0pIHByaXZhdGUgcHJldmlld0NhbnZhczogRWxlbWVudFJlZjtcclxuICAvKipcclxuICAgKiBhbiBhcnJheSBvZiBwb2ludHMgdXNlZCBieSB0aGUgY3JvcCB0b29sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+O1xyXG5cclxuICAvLyAqKioqKioqKioqKioqKiAvL1xyXG4gIC8vIEVWRU5UIEVNSVRURVJTIC8vXHJcbiAgLy8gKioqKioqKioqKioqKiogLy9cclxuICAvKipcclxuICAgKiBvcHRpb25hbCBiaW5kaW5nIHRvIHRoZSBleGl0IGJ1dHRvbiBvZiB0aGUgZWRpdG9yXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGV4aXRFZGl0b3I6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgLyoqXHJcbiAgICogZmlyZXMgb24gZWRpdCBjb21wbGV0aW9uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGVkaXRSZXN1bHQ6IEV2ZW50RW1pdHRlcjxCbG9iPiA9IG5ldyBFdmVudEVtaXR0ZXI8QmxvYj4oKTtcclxuICAvKipcclxuICAgKiBlbWl0cyBlcnJvcnMsIGNhbiBiZSBsaW5rZWQgdG8gYW4gZXJyb3IgaGFuZGxlciBvZiBjaG9pY2VcclxuICAgKi9cclxuICBAT3V0cHV0KCkgZXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLyoqXHJcbiAgICogZW1pdHMgdGhlIGxvYWRpbmcgc3RhdHVzIG9mIHRoZSBjdiBtb2R1bGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWR5OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgLyoqXHJcbiAgICogZW1pdHMgdHJ1ZSB3aGVuIHByb2Nlc3NpbmcgaXMgZG9uZSwgZmFsc2Ugd2hlbiBjb21wbGV0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcHJvY2Vzc2luZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvLyAqKioqKiogLy9cclxuICAvLyBJTlBVVFMgLy9cclxuICAvLyAqKioqKiogLy9cclxuICAvKipcclxuICAgKiBzZXQgaW1hZ2UgZm9yIGVkaXRpbmdcclxuICAgKiBAcGFyYW0gZmlsZSAtIGZpbGUgZnJvbSBmb3JtIGlucHV0XHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IGZpbGUoZmlsZTogRmlsZSkge1xyXG4gICAgaWYgKGZpbGUpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQodHJ1ZSk7XHJcbiAgICAgIH0sIDUpO1xyXG4gICAgICB0aGlzLmltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMub3JpZ2luYWxJbWFnZSA9IGZpbGU7XHJcbiAgICAgIHRoaXMubmd4T3BlbkN2LmN2U3RhdGUuc3Vic2NyaWJlKFxyXG4gICAgICAgIGFzeW5jIChjdlN0YXRlOiBPcGVuQ1ZTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGN2U3RhdGUucmVhZHkpIHtcclxuICAgICAgICAgICAgLy8gcmVhZCBmaWxlIHRvIGltYWdlICYgY2FudmFzXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEZpbGUoZmlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGVkaXRvciBjb25maWd1cmF0aW9uIG9iamVjdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbmZpZzogRG9jU2Nhbm5lckNvbmZpZztcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmd4T3BlbkN2OiBOZ3hPcGVuQ1ZTZXJ2aWNlLCBwcml2YXRlIGxpbWl0c1NlcnZpY2U6IExpbWl0c1NlcnZpY2UsIHByaXZhdGUgYm90dG9tU2hlZXQ6IE1hdEJvdHRvbVNoZWV0KSB7XHJcbiAgICB0aGlzLnNjcmVlbkRpbWVuc2lvbnMgPSB7XHJcbiAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgIH07XHJcblxyXG4gICAgLy8gc3Vic2NyaWJlIHRvIHN0YXR1cyBvZiBjdiBtb2R1bGVcclxuICAgIHRoaXMubmd4T3BlbkN2LmN2U3RhdGUuc3Vic2NyaWJlKChjdlN0YXRlOiBPcGVuQ1ZTdGF0ZSkgPT4ge1xyXG4gICAgICB0aGlzLmN2U3RhdGUgPSBjdlN0YXRlLnN0YXRlO1xyXG4gICAgICB0aGlzLnJlYWR5LmVtaXQoY3ZTdGF0ZS5yZWFkeSk7XHJcbiAgICAgIGlmIChjdlN0YXRlLmVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvci5lbWl0KG5ldyBFcnJvcignZXJyb3IgbG9hZGluZyBjdicpKTtcclxuICAgICAgfSBlbHNlIGlmIChjdlN0YXRlLmxvYWRpbmcpIHtcclxuICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdCh0cnVlKTtcclxuICAgICAgfSBlbHNlIGlmIChjdlN0YXRlLnJlYWR5KSB7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gcG9zaXRpb25zIG9mIGNyb3AgdG9vbFxyXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9ucy5zdWJzY3JpYmUocG9pbnRzID0+IHtcclxuICAgICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gc2V0IG9wdGlvbnMgZnJvbSBjb25maWcgb2JqZWN0XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgSW1hZ2VFZGl0b3JDb25maWcodGhpcy5jb25maWcpO1xyXG4gICAgLy8gc2V0IGV4cG9ydCBpbWFnZSBpY29uXHJcbiAgICB0aGlzLmVkaXRvckJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICBpZiAoYnV0dG9uLm5hbWUgPT09ICd1cGxvYWQnKSB7XHJcbiAgICAgICAgYnV0dG9uLmljb24gPSB0aGlzLm9wdGlvbnMuZXhwb3J0SW1hZ2VJY29uO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMubWF4UHJldmlld1dpZHRoID0gdGhpcy5vcHRpb25zLm1heFByZXZpZXdXaWR0aDtcclxuICAgIHRoaXMuZWRpdG9yU3R5bGUgPSB0aGlzLm9wdGlvbnMuZWRpdG9yU3R5bGU7XHJcbiAgfVxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xyXG4gIC8vIGVkaXRvciBhY3Rpb24gYnV0dG9ucyBtZXRob2RzIC8vXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogLy9cclxuXHJcbiAgLyoqXHJcbiAgICogZW1pdHMgdGhlIGV4aXRFZGl0b3IgZXZlbnRcclxuICAgKi9cclxuICBleGl0KCkge1xyXG4gICAgdGhpcy5leGl0RWRpdG9yLmVtaXQoJ2NhbmNlbGVkJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBhcHBsaWVzIHRoZSBzZWxlY3RlZCBmaWx0ZXIsIGFuZCB3aGVuIGRvbmUgZW1pdHMgdGhlIHJlc3VsdGVkIGltYWdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyBleHBvcnRJbWFnZSgpIHtcclxuICAgIGF3YWl0IHRoaXMuYXBwbHlGaWx0ZXIoZmFsc2UpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnMpIHtcclxuICAgICAgdGhpcy5yZXNpemUodGhpcy5lZGl0ZWRJbWFnZSlcclxuICAgICAgICAudGhlbihyZXNpemVSZXN1bHQgPT4ge1xyXG4gICAgICAgICAgcmVzaXplUmVzdWx0LnRvQmxvYigoYmxvYikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRSZXN1bHQuZW1pdChibG9iKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgICAgfSwgdGhpcy5vcmlnaW5hbEltYWdlLnR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lZGl0ZWRJbWFnZS50b0Jsb2IoKGJsb2IpID0+IHtcclxuICAgICAgICB0aGlzLmVkaXRSZXN1bHQuZW1pdChibG9iKTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XHJcbiAgICAgIH0sIHRoaXMub3JpZ2luYWxJbWFnZS50eXBlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG9wZW4gdGhlIGJvdHRvbSBzaGVldCBmb3Igc2VsZWN0aW5nIGZpbHRlcnMsIGFuZCBhcHBsaWVzIHRoZSBzZWxlY3RlZCBmaWx0ZXIgaW4gcHJldmlldyBtb2RlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjaG9vc2VGaWx0ZXJzKCkge1xyXG4gICAgY29uc3QgZGF0YSA9IHsgZmlsdGVyOiB0aGlzLnNlbGVjdGVkRmlsdGVyIH07XHJcbiAgICBjb25zdCBib3R0b21TaGVldFJlZiA9IHRoaXMuYm90dG9tU2hlZXQub3BlbihOZ3hGaWx0ZXJNZW51Q29tcG9uZW50LCB7XHJcbiAgICAgIGRhdGE6IGRhdGFcclxuICAgIH0pO1xyXG4gICAgYm90dG9tU2hlZXRSZWYuYWZ0ZXJEaXNtaXNzZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRmlsdGVyID0gZGF0YS5maWx0ZXI7XHJcbiAgICAgIHRoaXMuYXBwbHlGaWx0ZXIodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKiogLy9cclxuICAvLyBGaWxlIElucHV0ICYgT3V0cHV0IE1ldGhvZHMgLy9cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKiogLy9cclxuICAvKipcclxuICAgKiBsb2FkIGltYWdlIGZyb20gaW5wdXQgZmllbGRcclxuICAgKi9cclxuICBwcml2YXRlIGxvYWRGaWxlKGZpbGU6IEZpbGUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVhZEltYWdlKGZpbGUpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgdGhpcy5lcnJvci5lbWl0KG5ldyBFcnJvcihlcnIpKTtcclxuICAgICAgfVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd1ByZXZpZXcoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIHRoaXMuZXJyb3IuZW1pdChuZXcgRXJyb3IoZXJyKSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gc2V0IHBhbmUgbGltaXRzXHJcbiAgICAgIC8vIHNob3cgcG9pbnRzXHJcbiAgICAgIHRoaXMuaW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICBhd2FpdCB0aGlzLmxpbWl0c1NlcnZpY2Uuc2V0UGFuZURpbWVuc2lvbnMoe3dpZHRoOiB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoLCBoZWlnaHQ6IHRoaXMucHJldmlld0RpbWVuc2lvbnMuaGVpZ2h0fSk7XHJcbiAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZGV0ZWN0Q29udG91cnMoKTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfSwgMTUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZWFkIGltYWdlIGZyb20gRmlsZSBvYmplY3RcclxuICAgKi9cclxuICBwcml2YXRlIHJlYWRJbWFnZShmaWxlOiBGaWxlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgaW1hZ2VTcmM7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaW1hZ2VTcmMgPSBhd2FpdCByZWFkRmlsZSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgaW1nLm9ubG9hZCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBzZXQgZWRpdGVkIGltYWdlIGNhbnZhcyBhbmQgZGltZW5zaW9uc1xyXG4gICAgICAgIHRoaXMuZWRpdGVkSW1hZ2UgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIHRoaXMuZWRpdGVkSW1hZ2Uud2lkdGggPSBpbWcud2lkdGg7XHJcbiAgICAgICAgdGhpcy5lZGl0ZWRJbWFnZS5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuZWRpdGVkSW1hZ2UuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcbiAgICAgICAgLy8gcmVzaXplIGltYWdlIGlmIGxhcmdlciB0aGFuIG1heCBpbWFnZSBzaXplXHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSBpbWcud2lkdGggPiBpbWcuaGVpZ2h0ID8gaW1nLmhlaWdodCA6IGltZy53aWR0aDtcclxuICAgICAgICBpZiAod2lkdGggPiB0aGlzLm9wdGlvbnMubWF4SW1hZ2VEaW1lbnNpb25zLndpZHRoKSB7XHJcbiAgICAgICAgICB0aGlzLmVkaXRlZEltYWdlID0gYXdhaXQgdGhpcy5yZXNpemUodGhpcy5lZGl0ZWRJbWFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW1hZ2VEaW1lbnNpb25zLndpZHRoID0gdGhpcy5lZGl0ZWRJbWFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLmltYWdlRGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLmVkaXRlZEltYWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLnNldFByZXZpZXdQYW5lRGltZW5zaW9ucyh0aGlzLmVkaXRlZEltYWdlKTtcclxuICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICB9O1xyXG4gICAgICBpbWcuc3JjID0gaW1hZ2VTcmM7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWQgZmlsZSBmcm9tIGlucHV0IGZpZWxkXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlYWRGaWxlKCkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gKGVycikgPT4ge1xyXG4gICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKiogLy9cclxuICAvLyBJbWFnZSBQcm9jZXNzaW5nIE1ldGhvZHMgLy9cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKiogLy9cclxuICAvKipcclxuICAgKiByb3RhdGUgaW1hZ2UgOTAgZGVncmVlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcm90YXRlSW1hZ2UoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdCh0cnVlKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gY3YuaW1yZWFkKHRoaXMuZWRpdGVkSW1hZ2UpO1xyXG4gICAgICAgIC8vIGNvbnN0IGRzdCA9IG5ldyBjdi5NYXQoKTtcclxuICAgICAgICBjdi50cmFuc3Bvc2UoZHN0LCBkc3QpO1xyXG4gICAgICAgIGN2LmZsaXAoZHN0LCBkc3QsIDEpO1xyXG4gICAgICAgIGN2Lmltc2hvdyh0aGlzLmVkaXRlZEltYWdlLCBkc3QpO1xyXG4gICAgICAgIC8vIHNyYy5kZWxldGUoKTtcclxuICAgICAgICBkc3QuZGVsZXRlKCk7XHJcbiAgICAgICAgLy8gc2F2ZSBjdXJyZW50IHByZXZpZXcgZGltZW5zaW9ucyBhbmQgcG9zaXRpb25zXHJcbiAgICAgICAgY29uc3QgaW5pdGlhbFByZXZpZXdEaW1lbnNpb25zID0ge3dpZHRoOiAwLCBoZWlnaHQ6IDB9O1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oaW5pdGlhbFByZXZpZXdEaW1lbnNpb25zLCB0aGlzLnByZXZpZXdEaW1lbnNpb25zKTtcclxuICAgICAgICBjb25zdCBpbml0aWFsUG9zaXRpb25zID0gQXJyYXkuZnJvbSh0aGlzLnBvaW50cyk7XHJcbiAgICAgICAgLy8gZ2V0IG5ldyBkaW1lbnNpb25zXHJcbiAgICAgICAgLy8gc2V0IG5ldyBwcmV2aWV3IHBhbmUgZGltZW5zaW9uc1xyXG4gICAgICAgIHRoaXMuc2V0UHJldmlld1BhbmVEaW1lbnNpb25zKHRoaXMuZWRpdGVkSW1hZ2UpO1xyXG4gICAgICAgIC8vIGdldCBwcmV2aWV3IHBhbmUgcmVzaXplIHJhdGlvXHJcbiAgICAgICAgY29uc3QgcHJldmlld1Jlc2l6ZVJhdGlvcyA9IHtcclxuICAgICAgICAgIHdpZHRoOiB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoIC8gaW5pdGlhbFByZXZpZXdEaW1lbnNpb25zLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLnByZXZpZXdEaW1lbnNpb25zLmhlaWdodCAvIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucy5oZWlnaHRcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIHNldCBuZXcgcHJldmlldyBwYW5lIGRpbWVuc2lvbnNcclxuXHJcbiAgICAgICAgdGhpcy5saW1pdHNTZXJ2aWNlLnJvdGF0ZUNsb2Nrd2lzZShwcmV2aWV3UmVzaXplUmF0aW9zLCBpbml0aWFsUHJldmlld0RpbWVuc2lvbnMsIGluaXRpYWxQb3NpdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2hvd1ByZXZpZXcoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcclxuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDMwKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZXRlY3RzIHRoZSBjb250b3VycyBvZiB0aGUgZG9jdW1lbnQgYW5kXHJcbiAgICoqL1xyXG4gIHByaXZhdGUgZGV0ZWN0Q29udG91cnMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdCh0cnVlKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gbG9hZCB0aGUgaW1hZ2UgYW5kIGNvbXB1dGUgdGhlIHJhdGlvIG9mIHRoZSBvbGQgaGVpZ2h0IHRvIHRoZSBuZXcgaGVpZ2h0LCBjbG9uZSBpdCwgYW5kIHJlc2l6ZSBpdFxyXG4gICAgICAgIGNvbnN0IHByb2Nlc3NpbmdSZXNpemVSYXRpbyA9IDAuNTtcclxuICAgICAgICBjb25zdCBkc3QgPSBjdi5pbXJlYWQodGhpcy5lZGl0ZWRJbWFnZSk7XHJcbiAgICAgICAgY29uc3QgZHNpemUgPSBuZXcgY3YuU2l6ZShkc3Qucm93cyAqIHByb2Nlc3NpbmdSZXNpemVSYXRpbywgZHN0LmNvbHMgKiBwcm9jZXNzaW5nUmVzaXplUmF0aW8pO1xyXG4gICAgICAgIGNvbnN0IGtzaXplID0gbmV3IGN2LlNpemUoNSwgNSk7XHJcbiAgICAgICAgLy8gY29udmVydCB0aGUgaW1hZ2UgdG8gZ3JheXNjYWxlLCBibHVyIGl0LCBhbmQgZmluZCBlZGdlcyBpbiB0aGUgaW1hZ2VcclxuICAgICAgICBjdi5jdnRDb2xvcihkc3QsIGRzdCwgY3YuQ09MT1JfUkdCQTJHUkFZLCAwKTtcclxuICAgICAgICBjdi5HYXVzc2lhbkJsdXIoZHN0LCBkc3QsIGtzaXplLCAwLCAwLCBjdi5CT1JERVJfREVGQVVMVCk7XHJcbiAgICAgICAgY3YuQ2FubnkoZHN0LCBkc3QsIDc1LCAyMDApO1xyXG4gICAgICAgIC8vIGZpbmQgY29udG91cnNcclxuICAgICAgICBjdi50aHJlc2hvbGQoZHN0LCBkc3QsIDEyMCwgMjAwLCBjdi5USFJFU0hfQklOQVJZKTtcclxuICAgICAgICBjb25zdCBjb250b3VycyA9IG5ldyBjdi5NYXRWZWN0b3IoKTtcclxuICAgICAgICBjb25zdCBoaWVyYXJjaHkgPSBuZXcgY3YuTWF0KCk7XHJcbiAgICAgICAgY3YuZmluZENvbnRvdXJzKGRzdCwgY29udG91cnMsIGhpZXJhcmNoeSwgY3YuUkVUUl9DQ09NUCwgY3YuQ0hBSU5fQVBQUk9YX1NJTVBMRSk7XHJcbiAgICAgICAgY29uc3QgcmVjdCA9IGN2LmJvdW5kaW5nUmVjdChkc3QpO1xyXG4gICAgICAgIGRzdC5kZWxldGUoKTsgaGllcmFyY2h5LmRlbGV0ZSgpOyBjb250b3Vycy5kZWxldGUoKTtcclxuICAgICAgICAvLyB0cmFuc2Zvcm0gdGhlIHJlY3RhbmdsZSBpbnRvIGEgc2V0IG9mIHBvaW50c1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHJlY3QpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIHJlY3Rba2V5XSA9IHJlY3Rba2V5XSAgKiB0aGlzLmltYWdlUmVzaXplUmF0aW87XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRvdXJDb29yZGluYXRlcyA9IFtcclxuICAgICAgICAgIG5ldyBQb3NpdGlvbkNoYW5nZURhdGEoe3g6IHJlY3QueCwgeTogcmVjdC55fSwgWydsZWZ0JywgJ3RvcCddKSxcclxuICAgICAgICAgIG5ldyBQb3NpdGlvbkNoYW5nZURhdGEoe3g6IHJlY3QueCArIHJlY3Qud2lkdGgsIHk6IHJlY3QueX0sIFsncmlnaHQnLCAndG9wJ10pLFxyXG4gICAgICAgICAgbmV3IFBvc2l0aW9uQ2hhbmdlRGF0YSh7eDogcmVjdC54ICsgcmVjdC53aWR0aCwgeTogcmVjdC55ICsgcmVjdC5oZWlnaHR9LCBbJ3JpZ2h0JywgJ2JvdHRvbSddKSxcclxuICAgICAgICAgIG5ldyBQb3NpdGlvbkNoYW5nZURhdGEoe3g6IHJlY3QueCwgeTogcmVjdC55ICsgcmVjdC5oZWlnaHR9LCBbJ2xlZnQnLCAnYm90dG9tJ10pLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMubGltaXRzU2VydmljZS5yZXBvc2l0aW9uUG9pbnRzKGNvbnRvdXJDb29yZGluYXRlcyk7XHJcbiAgICAgICAgLy8gdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSwgMzApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBhcHBseSBwZXJzcGVjdGl2ZSB0cmFuc2Zvcm1cclxuICAgKi9cclxuICBwcml2YXRlIHRyYW5zZm9ybSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBkc3QgPSBjdi5pbXJlYWQodGhpcy5lZGl0ZWRJbWFnZSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBzb3VyY2UgY29vcmRpbmF0ZXMgbWF0cml4XHJcbiAgICAgICAgY29uc3Qgc291cmNlQ29vcmRpbmF0ZXMgPSBbXHJcbiAgICAgICAgICB0aGlzLmdldFBvaW50KFsndG9wJywgJ2xlZnQnXSksXHJcbiAgICAgICAgICB0aGlzLmdldFBvaW50KFsndG9wJywgJ3JpZ2h0J10pLFxyXG4gICAgICAgICAgdGhpcy5nZXRQb2ludChbJ2JvdHRvbScsICdyaWdodCddKSxcclxuICAgICAgICAgIHRoaXMuZ2V0UG9pbnQoWydib3R0b20nLCAnbGVmdCddKVxyXG4gICAgICAgIF0ubWFwKHBvaW50ID0+IHtcclxuICAgICAgICAgIHJldHVybiBbcG9pbnQueCAvIHRoaXMuaW1hZ2VSZXNpemVSYXRpbywgcG9pbnQueSAvIHRoaXMuaW1hZ2VSZXNpemVSYXRpb107XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGdldCBtYXggd2lkdGhcclxuICAgICAgICBjb25zdCBib3R0b21XaWR0aCA9IHRoaXMuZ2V0UG9pbnQoWydib3R0b20nLCAncmlnaHQnXSkueCAtIHRoaXMuZ2V0UG9pbnQoWydib3R0b20nLCAnbGVmdCddKS54O1xyXG4gICAgICAgIGNvbnN0IHRvcFdpZHRoID0gdGhpcy5nZXRQb2ludChbJ3RvcCcsICdyaWdodCddKS54IC0gdGhpcy5nZXRQb2ludChbJ3RvcCcsICdsZWZ0J10pLng7XHJcbiAgICAgICAgY29uc3QgbWF4V2lkdGggPSBNYXRoLm1heChib3R0b21XaWR0aCwgdG9wV2lkdGgpIC8gdGhpcy5pbWFnZVJlc2l6ZVJhdGlvO1xyXG4gICAgICAgIC8vIGdldCBtYXggaGVpZ2h0XHJcbiAgICAgICAgY29uc3QgbGVmdEhlaWdodCA9IHRoaXMuZ2V0UG9pbnQoWydib3R0b20nLCAnbGVmdCddKS55IC0gdGhpcy5nZXRQb2ludChbJ3RvcCcsICdsZWZ0J10pLnk7XHJcbiAgICAgICAgY29uc3QgcmlnaHRIZWlnaHQgPSB0aGlzLmdldFBvaW50KFsnYm90dG9tJywgJ3JpZ2h0J10pLnkgLSB0aGlzLmdldFBvaW50KFsndG9wJywgJ3JpZ2h0J10pLnk7XHJcbiAgICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gTWF0aC5tYXgobGVmdEhlaWdodCwgcmlnaHRIZWlnaHQpIC8gdGhpcy5pbWFnZVJlc2l6ZVJhdGlvO1xyXG4gICAgICAgIC8vIGNyZWF0ZSBkZXN0IGNvb3JkaW5hdGVzIG1hdHJpeFxyXG4gICAgICAgIGNvbnN0IGRlc3RDb29yZGluYXRlcyA9IFtcclxuICAgICAgICAgIFswLCAwXSxcclxuICAgICAgICAgIFttYXhXaWR0aCAtIDEsIDBdLFxyXG4gICAgICAgICAgW21heFdpZHRoIC0gMSwgbWF4SGVpZ2h0IC0gMV0sXHJcbiAgICAgICAgICBbMCwgbWF4SGVpZ2h0IC0gMV1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAvLyBjb252ZXJ0IHRvIG9wZW4gY3YgbWF0cml4IG9iamVjdHNcclxuICAgICAgICBjb25zdCBNcyA9IGN2Lm1hdEZyb21BcnJheSg0LCAxLCBjdi5DVl8zMkZDMiwgW10uY29uY2F0KC4uLnNvdXJjZUNvb3JkaW5hdGVzKSk7XHJcbiAgICAgICAgY29uc3QgTWQgPSBjdi5tYXRGcm9tQXJyYXkoNCwgMSwgY3YuQ1ZfMzJGQzIsIFtdLmNvbmNhdCguLi5kZXN0Q29vcmRpbmF0ZXMpKTtcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1NYXRyaXggPSBjdi5nZXRQZXJzcGVjdGl2ZVRyYW5zZm9ybShNcywgTWQpO1xyXG4gICAgICAgIC8vIHNldCBuZXcgaW1hZ2Ugc2l6ZVxyXG4gICAgICAgIGNvbnN0IGRzaXplID0gbmV3IGN2LlNpemUobWF4V2lkdGgsIG1heEhlaWdodCk7XHJcbiAgICAgICAgLy8gcGVyZm9ybSB3YXJwXHJcbiAgICAgICAgY3Yud2FycFBlcnNwZWN0aXZlKGRzdCwgZHN0LCB0cmFuc2Zvcm1NYXRyaXgsIGRzaXplLCBjdi5JTlRFUl9MSU5FQVIsIGN2LkJPUkRFUl9DT05TVEFOVCwgbmV3IGN2LlNjYWxhcigpKTtcclxuICAgICAgICBjdi5pbXNob3codGhpcy5lZGl0ZWRJbWFnZSwgZHN0KTtcclxuXHJcbiAgICAgICAgZHN0LmRlbGV0ZSgpOyBNcy5kZWxldGUoKTsgTWQuZGVsZXRlKCk7IHRyYW5zZm9ybU1hdHJpeC5kZWxldGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRQcmV2aWV3UGFuZURpbWVuc2lvbnModGhpcy5lZGl0ZWRJbWFnZSk7XHJcbiAgICAgICAgdGhpcy5zaG93UHJldmlldygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCAzMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGFwcGxpZXMgdGhlIHNlbGVjdGVkIGZpbHRlciB0byB0aGUgaW1hZ2VcclxuICAgKiBAcGFyYW0gcHJldmlldyAtIHdoZW4gdHJ1ZSwgd2lsbCBub3QgYXBwbHkgdGhlIGZpbHRlciB0byB0aGUgZWRpdGVkIGltYWdlIGJ1dCBvbmx5IGRpc3BsYXkgYSBwcmV2aWV3LlxyXG4gICAqIHdoZW4gZmFsc2UsIHdpbGwgYXBwbHkgdG8gZWRpdGVkSW1hZ2VcclxuICAgKi9cclxuICBwcml2YXRlIGFwcGx5RmlsdGVyKHByZXZpZXc6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xyXG4gICAgICAvLyBkZWZhdWx0IG9wdGlvbnNcclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBibHVyOiBmYWxzZSxcclxuICAgICAgICB0aDogdHJ1ZSxcclxuICAgICAgICB0aE1vZGU6IGN2LkFEQVBUSVZFX1RIUkVTSF9NRUFOX0MsXHJcbiAgICAgICAgdGhNZWFuQ29ycmVjdGlvbjogMTAsXHJcbiAgICAgICAgdGhCbG9ja1NpemU6IDI1LFxyXG4gICAgICAgIHRoTWF4OiAyNTUsXHJcbiAgICAgICAgZ3JheVNjYWxlOiB0cnVlLFxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBkc3QgPSBjdi5pbXJlYWQodGhpcy5lZGl0ZWRJbWFnZSk7XHJcblxyXG4gICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRGaWx0ZXIpIHtcclxuICAgICAgICBjYXNlICdkZWZhdWx0JzpcclxuICAgICAgICAgIG9wdGlvbnMudGggPSBmYWxzZTtcclxuICAgICAgICAgIG9wdGlvbnMuZ3JheVNjYWxlID0gZmFsc2U7XHJcbiAgICAgICAgICBvcHRpb25zLmJsdXIgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ21hZ2ljX2NvbG9yJzpcclxuICAgICAgICAgIG9wdGlvbnMuZ3JheVNjYWxlID0gZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdidzInOlxyXG4gICAgICAgICAgb3B0aW9ucy50aE1vZGUgPSBjdi5BREFQVElWRV9USFJFU0hfR0FVU1NJQU5fQztcclxuICAgICAgICAgIG9wdGlvbnMudGhNZWFuQ29ycmVjdGlvbiA9IDE1O1xyXG4gICAgICAgICAgb3B0aW9ucy50aEJsb2NrU2l6ZSA9IDE1O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYnczJzpcclxuICAgICAgICAgIG9wdGlvbnMuYmx1ciA9IHRydWU7XHJcbiAgICAgICAgICBvcHRpb25zLnRoTWVhbkNvcnJlY3Rpb24gPSAxNTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgICBpZiAob3B0aW9ucy5ncmF5U2NhbGUpIHtcclxuICAgICAgICAgIGN2LmN2dENvbG9yKGRzdCwgZHN0LCBjdi5DT0xPUl9SR0JBMkdSQVksIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5ibHVyKSB7XHJcbiAgICAgICAgICBjb25zdCBrc2l6ZSA9IG5ldyBjdi5TaXplKDUsIDUpO1xyXG4gICAgICAgICAgY3YuR2F1c3NpYW5CbHVyKGRzdCwgZHN0LCBrc2l6ZSwgMCwgMCwgY3YuQk9SREVSX0RFRkFVTFQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy50aCkge1xyXG4gICAgICAgICAgaWYgKG9wdGlvbnMuZ3JheVNjYWxlKSB7XHJcbiAgICAgICAgICAgIGN2LmFkYXB0aXZlVGhyZXNob2xkKGRzdCwgZHN0LCBvcHRpb25zLnRoTWF4LCBvcHRpb25zLnRoTW9kZSwgY3YuVEhSRVNIX0JJTkFSWSwgb3B0aW9ucy50aEJsb2NrU2l6ZSwgb3B0aW9ucy50aE1lYW5Db3JyZWN0aW9uKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRzdC5jb252ZXJ0VG8oZHN0LCAtMSwgMSwgNjApO1xyXG4gICAgICAgICAgICBjdi50aHJlc2hvbGQoZHN0LCBkc3QsIDE3MCwgMjU1LCBjdi5USFJFU0hfQklOQVJZKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwcmV2aWV3KSB7XHJcbiAgICAgICAgICBjdi5pbXNob3codGhpcy5lZGl0ZWRJbWFnZSwgZHN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93UHJldmlldyhkc3QpO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0sIDMwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVzaXplIGFuIGltYWdlIHRvIGZpdCBjb25zdHJhaW50cyBzZXQgaW4gb3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnNcclxuICAgKi9cclxuICBwcml2YXRlIHJlc2l6ZShpbWFnZTogSFRNTENhbnZhc0VsZW1lbnQpOiBQcm9taXNlPEhUTUxDYW52YXNFbGVtZW50PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdCh0cnVlKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3JjID0gY3YuaW1yZWFkKGltYWdlKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50RGltZW5zaW9ucyA9IHtcclxuICAgICAgICAgIHdpZHRoOiBzcmMuc2l6ZSgpLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OiBzcmMuc2l6ZSgpLmhlaWdodFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVzaXplRGltZW5zaW9ucyA9IHtcclxuICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoY3VycmVudERpbWVuc2lvbnMud2lkdGggPiB0aGlzLm9wdGlvbnMubWF4SW1hZ2VEaW1lbnNpb25zLndpZHRoKSB7XHJcbiAgICAgICAgICByZXNpemVEaW1lbnNpb25zLndpZHRoID0gdGhpcy5vcHRpb25zLm1heEltYWdlRGltZW5zaW9ucy53aWR0aDtcclxuICAgICAgICAgIHJlc2l6ZURpbWVuc2lvbnMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLm1heEltYWdlRGltZW5zaW9ucy53aWR0aCAvIGN1cnJlbnREaW1lbnNpb25zLndpZHRoICogY3VycmVudERpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICAgICAgaWYgKHJlc2l6ZURpbWVuc2lvbnMuaGVpZ2h0ID4gdGhpcy5vcHRpb25zLm1heEltYWdlRGltZW5zaW9ucy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgcmVzaXplRGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLm9wdGlvbnMubWF4SW1hZ2VEaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgICAgICAgcmVzaXplRGltZW5zaW9ucy53aWR0aCA9IHRoaXMub3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnMuaGVpZ2h0IC8gY3VycmVudERpbWVuc2lvbnMuaGVpZ2h0ICogY3VycmVudERpbWVuc2lvbnMud2lkdGg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBkc2l6ZSA9IG5ldyBjdi5TaXplKE1hdGguZmxvb3IocmVzaXplRGltZW5zaW9ucy53aWR0aCksIE1hdGguZmxvb3IocmVzaXplRGltZW5zaW9ucy5oZWlnaHQpKTtcclxuICAgICAgICAgIGN2LnJlc2l6ZShzcmMsIHNyYywgZHNpemUsIDAsIDAsIGN2LklOVEVSX0FSRUEpO1xyXG4gICAgICAgICAgY29uc3QgcmVzaXplUmVzdWx0ID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgIGN2Lmltc2hvdyhyZXNpemVSZXN1bHQsIHNyYyk7XHJcbiAgICAgICAgICBzcmMuZGVsZXRlKCk7XHJcbiAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgICByZXNvbHZlKHJlc2l6ZVJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcclxuICAgICAgICAgIHJlc29sdmUoaW1hZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMzApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkaXNwbGF5IGEgcHJldmlldyBvZiB0aGUgaW1hZ2Ugb24gdGhlIHByZXZpZXcgY2FudmFzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzaG93UHJldmlldyhpbWFnZT86IGFueSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IHNyYztcclxuICAgICAgaWYgKGltYWdlKSB7XHJcbiAgICAgICAgc3JjID0gaW1hZ2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3JjID0gY3YuaW1yZWFkKHRoaXMuZWRpdGVkSW1hZ2UpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGRzdCA9IG5ldyBjdi5NYXQoKTtcclxuICAgICAgY29uc3QgZHNpemUgPSBuZXcgY3YuU2l6ZSgwLCAwKTtcclxuICAgICAgY3YucmVzaXplKHNyYywgZHN0LCBkc2l6ZSwgdGhpcy5pbWFnZVJlc2l6ZVJhdGlvLCB0aGlzLmltYWdlUmVzaXplUmF0aW8sIGN2LklOVEVSX0FSRUEpO1xyXG4gICAgICBjdi5pbXNob3codGhpcy5wcmV2aWV3Q2FudmFzLm5hdGl2ZUVsZW1lbnQsIGRzdCk7XHJcbiAgICAgIHNyYy5kZWxldGUoKTtcclxuICAgICAgZHN0LmRlbGV0ZSgpO1xyXG4gICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyAqKioqKioqKioqKioqKiogLy9cclxuICAvLyBVdGlsaXR5IE1ldGhvZHMgLy9cclxuICAvLyAqKioqKioqKioqKioqKiogLy9cclxuICAvKipcclxuICAgKiBzZXQgcHJldmlldyBjYW52YXMgZGltZW5zaW9ucyBhY2NvcmRpbmcgdG8gdGhlIGNhbnZhcyBlbGVtZW50IG9mIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0UHJldmlld1BhbmVEaW1lbnNpb25zKGltZzogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgIC8vIHNldCBwcmV2aWV3IHBhbmUgZGltZW5zaW9uc1xyXG4gICAgdGhpcy5wcmV2aWV3RGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucyhpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xyXG4gICAgdGhpcy5wcmV2aWV3Q2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoO1xyXG4gICAgdGhpcy5wcmV2aWV3Q2FudmFzLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gdGhpcy5wcmV2aWV3RGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICB0aGlzLmltYWdlUmVzaXplUmF0aW8gPSB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoIC8gaW1nLndpZHRoO1xyXG4gICAgdGhpcy5pbWFnZURpdlN0eWxlID0ge1xyXG4gICAgICB3aWR0aDogdGhpcy5wcmV2aWV3RGltZW5zaW9ucy53aWR0aCArIHRoaXMub3B0aW9ucy5jcm9wVG9vbERpbWVuc2lvbnMud2lkdGggKyAncHgnLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMucHJldmlld0RpbWVuc2lvbnMuaGVpZ2h0ICsgdGhpcy5vcHRpb25zLmNyb3BUb29sRGltZW5zaW9ucy5oZWlnaHQgKyAncHgnLFxyXG4gICAgICAnbWFyZ2luLWxlZnQnOiBgY2FsYygoMTAwJSAtICR7dGhpcy5wcmV2aWV3RGltZW5zaW9ucy53aWR0aCArIDEwfXB4KSAvIDIgKyAke3RoaXMub3B0aW9ucy5jcm9wVG9vbERpbWVuc2lvbnMud2lkdGggLyAyfXB4KWAsXHJcbiAgICAgICdtYXJnaW4tcmlnaHQnOiBgY2FsYygoMTAwJSAtICR7dGhpcy5wcmV2aWV3RGltZW5zaW9ucy53aWR0aCArIDEwfXB4KSAvIDIgLSAke3RoaXMub3B0aW9ucy5jcm9wVG9vbERpbWVuc2lvbnMud2lkdGggLyAyfXB4KWAsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnNldFBhbmVEaW1lbnNpb25zKHt3aWR0aDogdGhpcy5wcmV2aWV3RGltZW5zaW9ucy53aWR0aCwgaGVpZ2h0OiB0aGlzLnByZXZpZXdEaW1lbnNpb25zLmhlaWdodH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FsY3VsYXRlIGRpbWVuc2lvbnMgb2YgdGhlIHByZXZpZXcgY2FudmFzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYWxjdWxhdGVEaW1lbnNpb25zKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlcjsgcmF0aW86IG51bWJlcn0ge1xyXG4gICAgY29uc3QgcmF0aW8gPSB3aWR0aCAvIGhlaWdodDtcclxuXHJcbiAgICBjb25zdCBtYXhXaWR0aCA9IHRoaXMuc2NyZWVuRGltZW5zaW9ucy53aWR0aCA+IHRoaXMubWF4UHJldmlld1dpZHRoID9cclxuICAgICAgdGhpcy5tYXhQcmV2aWV3V2lkdGggOiB0aGlzLnNjcmVlbkRpbWVuc2lvbnMud2lkdGggLSA0MDtcclxuICAgIGNvbnN0IG1heEhlaWdodCA9IHRoaXMuc2NyZWVuRGltZW5zaW9ucy5oZWlnaHQgLSAyNDA7XHJcbiAgICBjb25zdCBjYWxjdWxhdGVkID0ge1xyXG4gICAgICB3aWR0aDogbWF4V2lkdGgsXHJcbiAgICAgIGhlaWdodDogTWF0aC5yb3VuZChtYXhXaWR0aCAvIHJhdGlvKSxcclxuICAgICAgcmF0aW86IHJhdGlvXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChjYWxjdWxhdGVkLmhlaWdodCA+IG1heEhlaWdodCkge1xyXG4gICAgICBjYWxjdWxhdGVkLmhlaWdodCA9IG1heEhlaWdodDtcclxuICAgICAgY2FsY3VsYXRlZC53aWR0aCA9IE1hdGgucm91bmQobWF4SGVpZ2h0ICogcmF0aW8pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhbGN1bGF0ZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm5zIGEgcG9pbnQgYnkgaXQncyByb2xlc1xyXG4gICAqIEBwYXJhbSByb2xlcyAtIGFuIGFycmF5IG9mIHJvbGVzIGJ5IHdoaWNoIHRoZSBwb2ludCB3aWxsIGJlIGZldGNoZWRcclxuICAgKi9cclxuICBwcml2YXRlIGdldFBvaW50KHJvbGVzOiBSb2xlc0FycmF5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5wb2ludHMuZmluZChwb2ludCA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpbWl0c1NlcnZpY2UuY29tcGFyZUFycmF5KHBvaW50LnJvbGVzLCByb2xlcyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhIGNsYXNzIGZvciBnZW5lcmF0aW5nIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyBmb3IgdGhlIGVkaXRvclxyXG4gKi9cclxuY2xhc3MgSW1hZ2VFZGl0b3JDb25maWcgaW1wbGVtZW50cyBEb2NTY2FubmVyQ29uZmlnIHtcclxuICAvKipcclxuICAgKiBtYXggZGltZW5zaW9ucyBvZiBvcHV0cHV0IGltYWdlLiBpZiBzZXQgdG8gemVyb1xyXG4gICAqL1xyXG4gIG1heEltYWdlRGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zID0ge1xyXG4gICAgd2lkdGg6IDgwMCxcclxuICAgIGhlaWdodDogMTIwMFxyXG4gIH07XHJcbiAgLyoqXHJcbiAgICogYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbWFpbiBlZGl0b3IgZGl2XHJcbiAgICovXHJcbiAgZWRpdG9yQmFja2dyb3VuZENvbG9yID0gJyNmZWZlZmUnO1xyXG4gIC8qKlxyXG4gICAqIGNzcyBwcm9wZXJ0aWVzIGZvciB0aGUgbWFpbiBlZGl0b3IgZGl2XHJcbiAgICovXHJcbiAgZWRpdG9yRGltZW5zaW9uczogeyB3aWR0aDogc3RyaW5nOyBoZWlnaHQ6IHN0cmluZzsgfSA9IHtcclxuICAgIHdpZHRoOiAnMTAwdncnLFxyXG4gICAgaGVpZ2h0OiAnMTAwdmgnXHJcbiAgfTtcclxuICAvKipcclxuICAgKiBjc3MgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBtYWluIGRpdiBvZiB0aGUgZWRpdG9yIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIGV4dHJhQ3NzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcn0gPSB7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgIHRvcDogMCxcclxuICAgIGxlZnQ6IDBcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBtYXRlcmlhbCBkZXNpZ24gdGhlbWUgY29sb3IgbmFtZVxyXG4gICAqL1xyXG4gIGJ1dHRvblRoZW1lQ29sb3I6ICdwcmltYXJ5J3wnd2Fybid8J2FjY2VudCcgPSAnYWNjZW50JztcclxuICAvKipcclxuICAgKiBpY29uIGZvciB0aGUgYnV0dG9uIHRoYXQgY29tcGxldGVzIHRoZSBlZGl0aW5nIGFuZCBlbWl0cyB0aGUgZWRpdGVkIGltYWdlXHJcbiAgICovXHJcbiAgZXhwb3J0SW1hZ2VJY29uID0gJ2Nsb3VkX3VwbG9hZCc7XHJcbiAgLyoqXHJcbiAgICogY29sb3Igb2YgdGhlIGNyb3AgdG9vbFxyXG4gICAqL1xyXG4gIGNyb3BUb29sQ29sb3IgPSAnIzNjYWJlMic7XHJcbiAgLyoqXHJcbiAgICogc2hhcGUgb2YgdGhlIGNyb3AgdG9vbCwgY2FuIGJlIGVpdGhlciBhIHJlY3RhbmdsZSBvciBhIGNpcmNsZVxyXG4gICAqL1xyXG4gIGNyb3BUb29sU2hhcGU6IFBvaW50U2hhcGUgPSAncmVjdCc7XHJcbiAgLyoqXHJcbiAgICogZGltZW5zaW9ucyBvZiB0aGUgY3JvcCB0b29sXHJcbiAgICovXHJcbiAgY3JvcFRvb2xEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMgPSB7XHJcbiAgICB3aWR0aDogMTAsXHJcbiAgICBoZWlnaHQ6IDEwXHJcbiAgfTtcclxuICAvKipcclxuICAgKiBhZ2dyZWdhdGlvbiBvZiB0aGUgcHJvcGVydGllcyByZWdhcmRpbmcgcG9pbnQgYXR0cmlidXRlcyBnZW5lcmF0ZWQgYnkgdGhlIGNsYXNzIGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgcG9pbnRPcHRpb25zOiBQb2ludE9wdGlvbnM7XHJcbiAgLyoqXHJcbiAgICogYWdncmVnYXRpb24gb2YgdGhlIHByb3BlcnRpZXMgcmVnYXJkaW5nIHRoZSBlZGl0b3Igc3R5bGUgZ2VuZXJhdGVkIGJ5IHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGVkaXRvclN0eWxlPzoge1trZXk6IHN0cmluZ106IHN0cmluZ3xudW1iZXJ9O1xyXG4gIC8qKlxyXG4gICAqIGNyb3AgdG9vbCBvdXRsaW5lIHdpZHRoXHJcbiAgICovXHJcbiAgY3JvcFRvb2xMaW5lV2VpZ2h0ID0gMztcclxuICAvKipcclxuICAgKiBtYXhpbXVtIHNpemUgb2YgdGhlIHByZXZpZXcgcGFuZVxyXG4gICAqL1xyXG4gIG1heFByZXZpZXdXaWR0aCA9IDgwMDtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogRG9jU2Nhbm5lckNvbmZpZykge1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lZGl0b3JTdHlsZSA9IHsnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuZWRpdG9yQmFja2dyb3VuZENvbG9yIH07XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZWRpdG9yU3R5bGUsIHRoaXMuZWRpdG9yRGltZW5zaW9ucyk7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZWRpdG9yU3R5bGUsIHRoaXMuZXh0cmFDc3MpO1xyXG5cclxuICAgIHRoaXMucG9pbnRPcHRpb25zID0ge1xyXG4gICAgICBzaGFwZTogdGhpcy5jcm9wVG9vbFNoYXBlLFxyXG4gICAgICBjb2xvcjogdGhpcy5jcm9wVG9vbENvbG9yLFxyXG4gICAgICB3aWR0aDogMCxcclxuICAgICAgaGVpZ2h0OiAwXHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnBvaW50T3B0aW9ucywgdGhpcy5jcm9wVG9vbERpbWVuc2lvbnMpO1xyXG4gIH1cclxufVxyXG5cclxuIl19