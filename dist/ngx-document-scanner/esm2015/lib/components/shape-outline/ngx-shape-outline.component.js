import { Component, Input, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/limits.service";
const _c0 = ["outline"];
const _c1 = function (a0, a1) { return { width: a0, height: a1 }; };
function NgxShapeOutlineComponent_canvas_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "canvas", 1, 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(1, _c1, ctx_r0.dimensions.width + "px", ctx_r0.dimensions.height + "px"));
} }
export class NgxShapeOutlineComponent {
    constructor(limitsService) {
        this.limitsService = limitsService;
        this.color = '#3cabe2';
    }
    ngAfterViewInit() {
        // init drawing canvas dimensions
        this.canvas.nativeElement.width = this.dimensions.width;
        this.canvas.nativeElement.height = this.dimensions.height;
        this.limitsService.positions.subscribe(positions => {
            if (positions.length === 4) {
                this._points = positions;
                this.sortPoints();
                this.clearCanvas();
                this.drawShape();
            }
        });
        // subscribe to changes in the pane's dimensions
        this.limitsService.paneDimensions.subscribe(dimensions => {
            this.clearCanvas();
            this.canvas.nativeElement.width = dimensions.width;
            this.canvas.nativeElement.height = dimensions.height;
        });
        // subscribe to reposition events
        this.limitsService.repositionEvent.subscribe(positions => {
            if (positions.length === 4) {
                setTimeout(() => {
                    this.clearCanvas();
                    this.sortPoints();
                    this.drawShape();
                }, 10);
            }
        });
    }
    /**
     * clears the shape canvas
     */
    clearCanvas() {
        const canvas = this.canvas.nativeElement;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    }
    /**
     * sorts the array of points according to their clockwise alignment
     */
    sortPoints() {
        const _points = Array.from(this._points);
        const sortedPoints = [];
        const sortOrder = {
            vertical: ['top', 'top', 'bottom', 'bottom'],
            horizontal: ['left', 'right', 'right', 'left']
        };
        for (let i = 0; i < 4; i++) {
            const roles = Array.from([sortOrder.vertical[i], sortOrder.horizontal[i]]);
            sortedPoints.push(_points.filter((point) => {
                return this.limitsService.compareArray(point.roles, roles);
            })[0]);
        }
        this._sortedPoints = sortedPoints;
    }
    /**
     * draws a line between the points according to their order
     */
    drawShape() {
        const canvas = this.canvas.nativeElement;
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = this.weight;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        this._sortedPoints.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            }
            if (index !== this._sortedPoints.length - 1) {
                const nextPoint = this._sortedPoints[index + 1];
                ctx.lineTo(nextPoint.x, nextPoint.y);
            }
            else {
                ctx.closePath();
            }
        });
        ctx.stroke();
    }
}
NgxShapeOutlineComponent.ɵfac = function NgxShapeOutlineComponent_Factory(t) { return new (t || NgxShapeOutlineComponent)(i0.ɵɵdirectiveInject(i1.LimitsService)); };
NgxShapeOutlineComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NgxShapeOutlineComponent, selectors: [["ngx-shape-outine"]], viewQuery: function NgxShapeOutlineComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvas = _t.first);
    } }, inputs: { color: "color", weight: "weight", dimensions: "dimensions" }, decls: 1, vars: 1, consts: [["style", "position: absolute; z-index: 1000", 3, "ngStyle", 4, "ngIf"], [2, "position", "absolute", "z-index", "1000", 3, "ngStyle"], ["outline", ""]], template: function NgxShapeOutlineComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NgxShapeOutlineComponent_canvas_0_Template, 2, 4, "canvas", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.dimensions);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxShapeOutlineComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-shape-outine',
                templateUrl: './ngx-shape-outline.component.html',
            }]
    }], function () { return [{ type: i1.LimitsService }]; }, { color: [{
            type: Input
        }], weight: [{
            type: Input
        }], dimensions: [{
            type: Input
        }], canvas: [{
            type: ViewChild,
            args: ['outline']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRvY3VtZW50LXNjYW5uZXIvc3JjL2xpYi9jb21wb25lbnRzL3NoYXBlLW91dGxpbmUvbmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRvY3VtZW50LXNjYW5uZXIvc3JjL2xpYi9jb21wb25lbnRzL3NoYXBlLW91dGxpbmUvbmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDQXpFLCtCQUlTOzs7SUFGRCxxSEFBOEU7O0FETXRGLE1BQU0sT0FBTyx3QkFBd0I7SUFTbkMsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFQdkMsVUFBSyxHQUFHLFNBQVMsQ0FBQztJQU93QixDQUFDO0lBRXBELGVBQWU7UUFDYixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDakQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFdBQVcs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UUFDN0IsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzFDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDakI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNmLENBQUM7O2dHQTdGVSx3QkFBd0I7MkVBQXhCLHdCQUF3Qjs7Ozs7O1FDUnJDLCtFQUlTOztRQURBLHFDQUFnQjs7dUZES1osd0JBQXdCO2NBSnBDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsb0NBQW9DO2FBQ2xEO2dFQUdVLEtBQUs7a0JBQWIsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUs7WUFDZ0IsTUFBTTtrQkFBM0IsU0FBUzttQkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0xpbWl0c1NlcnZpY2UsIFBvaW50UG9zaXRpb25DaGFuZ2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xpbWl0cy5zZXJ2aWNlJztcclxuaW1wb3J0IHtJbWFnZURpbWVuc2lvbnN9IGZyb20gJy4uLy4uL1B1YmxpY01vZGVscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1zaGFwZS1vdXRpbmUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtc2hhcGUtb3V0bGluZS5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hTaGFwZU91dGxpbmVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgQElucHV0KCkgY29sb3IgPSAnIzNjYWJlMic7XHJcbiAgQElucHV0KCkgd2VpZ2h0OiBudW1iZXI7XHJcbiAgQElucHV0KCkgZGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zO1xyXG4gIEBWaWV3Q2hpbGQoJ291dGxpbmUnKSBjYW52YXM7XHJcblxyXG4gIHByaXZhdGUgX3BvaW50czogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT47XHJcbiAgcHJpdmF0ZSBfc29ydGVkUG9pbnRzOiBBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPjtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxpbWl0c1NlcnZpY2U6IExpbWl0c1NlcnZpY2UpIHt9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIC8vIGluaXQgZHJhd2luZyBjYW52YXMgZGltZW5zaW9uc1xyXG4gICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aDtcclxuICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodDtcclxuICAgIHRoaXMubGltaXRzU2VydmljZS5wb3NpdGlvbnMuc3Vic2NyaWJlKHBvc2l0aW9ucyA9PiB7XHJcbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gcG9zaXRpb25zO1xyXG4gICAgICAgIHRoaXMuc29ydFBvaW50cygpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcclxuICAgICAgICB0aGlzLmRyYXdTaGFwZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIHN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBwYW5lJ3MgZGltZW5zaW9uc1xyXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBhbmVEaW1lbnNpb25zLnN1YnNjcmliZShkaW1lbnNpb25zID0+IHtcclxuICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LndpZHRoID0gZGltZW5zaW9ucy53aWR0aDtcclxuICAgICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodDtcclxuICAgIH0pO1xyXG4gICAgLy8gc3Vic2NyaWJlIHRvIHJlcG9zaXRpb24gZXZlbnRzXHJcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucmVwb3NpdGlvbkV2ZW50LnN1YnNjcmliZSggcG9zaXRpb25zID0+IHtcclxuICAgICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggPT09IDQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XHJcbiAgICAgICAgICB0aGlzLnNvcnRQb2ludHMoKTtcclxuICAgICAgICAgIHRoaXMuZHJhd1NoYXBlKCk7XHJcbiAgICAgICAgfSwgMTApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNsZWFycyB0aGUgc2hhcGUgY2FudmFzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhckNhbnZhcygpIHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5kaW1lbnNpb25zLndpZHRoLCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNvcnRzIHRoZSBhcnJheSBvZiBwb2ludHMgYWNjb3JkaW5nIHRvIHRoZWlyIGNsb2Nrd2lzZSBhbGlnbm1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRQb2ludHMoKSB7XHJcbiAgICBjb25zdCBfcG9pbnRzID0gQXJyYXkuZnJvbSh0aGlzLl9wb2ludHMpO1xyXG4gICAgY29uc3Qgc29ydGVkUG9pbnRzID0gW107XHJcblxyXG4gICAgY29uc3Qgc29ydE9yZGVyID0ge1xyXG4gICAgICB2ZXJ0aWNhbDogWyd0b3AnLCAndG9wJywgJ2JvdHRvbScsICdib3R0b20nXSxcclxuICAgICAgaG9yaXpvbnRhbDogWydsZWZ0JywgJ3JpZ2h0JywgJ3JpZ2h0JywgJ2xlZnQnXVxyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICBjb25zdCByb2xlcyA9IEFycmF5LmZyb20oW3NvcnRPcmRlci52ZXJ0aWNhbFtpXSwgc29ydE9yZGVyLmhvcml6b250YWxbaV1dKTtcclxuICAgICAgc29ydGVkUG9pbnRzLnB1c2goX3BvaW50cy5maWx0ZXIoKHBvaW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGltaXRzU2VydmljZS5jb21wYXJlQXJyYXkocG9pbnQucm9sZXMsIHJvbGVzKTtcclxuICAgICAgfSlbMF0pO1xyXG5cclxuICAgIH1cclxuICAgIHRoaXMuX3NvcnRlZFBvaW50cyA9IHNvcnRlZFBvaW50cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRyYXdzIGEgbGluZSBiZXR3ZWVuIHRoZSBwb2ludHMgYWNjb3JkaW5nIHRvIHRoZWlyIG9yZGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkcmF3U2hhcGUoKSB7XHJcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBjdHgubGluZVdpZHRoID0gdGhpcy53ZWlnaHQ7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgdGhpcy5fc29ydGVkUG9pbnRzLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICBjdHgubW92ZVRvKHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5fc29ydGVkUG9pbnRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICBjb25zdCBuZXh0UG9pbnQgPSB0aGlzLl9zb3J0ZWRQb2ludHNbaW5kZXggKyAxXTtcclxuICAgICAgICBjdHgubGluZVRvKG5leHRQb2ludC54LCBuZXh0UG9pbnQueSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4iLCI8Y2FudmFzICNvdXRsaW5lXHJcbiAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHotaW5kZXg6IDEwMDBcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInt3aWR0aDogZGltZW5zaW9ucy53aWR0aCArICdweCcsIGhlaWdodDogZGltZW5zaW9ucy5oZWlnaHQgKyAncHgnfVwiXHJcbiAgICAgICAgKm5nSWY9XCJkaW1lbnNpb25zXCI+XHJcbjwvY2FudmFzPlxyXG4iXX0=