import { Component, Input } from '@angular/core';
import { PositionChangeData } from '../../services/limits.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/limits.service";
export class NgxDraggablePointComponent {
    constructor(limitsService) {
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
    ngAfterViewInit() {
        Object.keys(this.pointOptions).forEach(key => {
            this[key] = this.pointOptions[key];
        });
        // subscribe to pane dimensions changes
        this.limitsService.paneDimensions.subscribe(dimensions => {
            if (dimensions.width > 0 && dimensions.width > 0) {
                this._paneDimensions = {
                    width: dimensions.width,
                    height: dimensions.height
                };
                this.position = this.getInitialPosition(dimensions);
                this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
            }
        });
        // subscribe to external reposition events
        this.limitsService.repositionEvent.subscribe(positions => {
            if (positions.length > 0) {
                this.externalReposition(positions);
            }
        });
    }
    /**
     * returns a css style object for the point
     */
    pointStyle() {
        return {
            width: this.width + 'px',
            height: this.height + 'px',
            'background-color': this.color,
            'border-radius': this.shape === 'circle' ? '100%' : 0,
            position: 'absolute'
        };
    }
    /**
     * registers a position change on the limits service, and adjusts position if necessary
     * @param position - the current position of the point
     */
    positionChange(position) {
        const positionChangeData = new PositionChangeData(position, this.limitRoles);
        const limitException = this.limitsService.exceedsLimit(positionChangeData);
        if (limitException.exceeds) {
            // if exceeds limits, reposition
            this.resetPosition = limitException.resetCoordinates;
        }
        else {
            this.limitsService.positionChange(positionChangeData);
            this._currentPosition = position;
        }
    }
    /**
     * adjusts the position of the point after a limit exception
     */
    adjustPosition(limitException) {
        const newPosition = {
            x: 0,
            y: 0
        };
        Object.keys(this.startPosition).forEach(axis => {
            newPosition[axis] = limitException.resetCoordinates[axis] + limitException.resetCoefficients[axis];
        });
        this.position = newPosition;
        this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
    }
    /**
     * called on movement end, checks if last position exceeded the limits ad adjusts
     */
    movementEnd(position) {
        let positionChangeData = new PositionChangeData(position, this.limitRoles);
        const limitException = this.limitsService.exceedsLimit(positionChangeData);
        if (limitException.exceeds) {
            this.resetPosition = limitException.resetCoordinates;
            if (limitException.exceeds) {
                this.adjustPosition(limitException);
                positionChangeData = new PositionChangeData(this.position, this.limitRoles);
                this.limitsService.updatePosition(positionChangeData);
            }
        }
    }
    /**
     * calculates the initial positions of the point by it's roles
     * @param dimensions - dimensions of the pane in which the point is located
     */
    getInitialPosition(dimensions) {
        return {
            x: this.limitRoles.includes('left') ? 0 : dimensions.width - this.width / 2,
            y: this.limitRoles.includes('top') ? 0 : dimensions.height - this.height / 2
        };
    }
    /**
     * repositions the point after an external reposition event
     * @param positions - an array of all points on the pane
     */
    externalReposition(positions) {
        positions.forEach(position => {
            if (this.limitsService.compareArray(this.limitRoles, position.roles)) {
                position = this.enforcePaneLimits(position);
                this.position = {
                    x: position.x,
                    y: position.y
                };
            }
        });
    }
    /**
     * returns a new point position if the movement exceeded the pane limit
     */
    enforcePaneLimits(position) {
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
    }
}
NgxDraggablePointComponent.ɵfac = function NgxDraggablePointComponent_Factory(t) { return new (t || NgxDraggablePointComponent)(i0.ɵɵdirectiveInject(i1.LimitsService)); };
NgxDraggablePointComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NgxDraggablePointComponent, selectors: [["ngx-draggable-point"]], inputs: { width: "width", height: "height", color: "color", shape: "shape", pointOptions: "pointOptions", limitRoles: "limitRoles", startPosition: "startPosition", container: "container", _currentPosition: "_currentPosition" }, decls: 2, vars: 4, consts: [["ngDraggable", "draggable", 2, "z-index", "1000", 3, "ngStyle", "position", "bounds", "inBounds", "movingOffset", "endOffset"], ["point", ""]], template: function NgxDraggablePointComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵlistener("movingOffset", function NgxDraggablePointComponent_Template_div_movingOffset_0_listener($event) { return ctx.positionChange($event); })("endOffset", function NgxDraggablePointComponent_Template_div_endOffset_0_listener($event) { return ctx.movementEnd($event); });
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngStyle", ctx.pointStyle())("position", ctx.position)("bounds", ctx.container)("inBounds", true);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxDraggablePointComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-draggable-point',
                templateUrl: './ngx-draggable-point.component.html',
            }]
    }], function () { return [{ type: i1.LimitsService }]; }, { width: [{
            type: Input
        }], height: [{
            type: Input
        }], color: [{
            type: Input
        }], shape: [{
            type: Input
        }], pointOptions: [{
            type: Input
        }], limitRoles: [{
            type: Input
        }], startPosition: [{
            type: Input
        }], container: [{
            type: Input
        }], _currentPosition: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZG9jdW1lbnQtc2Nhbm5lci9zcmMvbGliL2NvbXBvbmVudHMvZHJhZ2dhYmxlLXBvaW50L25neC1kcmFnZ2FibGUtcG9pbnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRvY3VtZW50LXNjYW5uZXIvc3JjL2xpYi9jb21wb25lbnRzL2RyYWdnYWJsZS1wb2ludC9uZ3gtZHJhZ2dhYmxlLXBvaW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQXFDLGtCQUFrQixFQUFDLE1BQU0sK0JBQStCLENBQUM7OztBQVFyRyxNQUFNLE9BQU8sMEJBQTBCO0lBaUJyQyxZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWhCdkMsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xCLFVBQUssR0FBc0IsTUFBTSxDQUFDO1FBQ2xDLGlCQUFZLEdBQXNCLE1BQU0sQ0FBQztRQUtsRCxhQUFRLEdBQWU7WUFDckIsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7SUFJaUQsQ0FBQztJQUVwRCxlQUFlO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gs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LGlCQUFNOztRQU5ELDBDQUF3QiwwQkFBQSx5QkFBQSxrQkFBQTs7dUZET2hCLDBCQUEwQjtjQUp0QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsV0FBVyxFQUFFLHNDQUFzQzthQUNwRDtnRUFFVSxLQUFLO2tCQUFiLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLGFBQWE7a0JBQXJCLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ1csZ0JBQWdCO2tCQUFoQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlLCBQb2ludFBvc2l0aW9uQ2hhbmdlLCBQb3NpdGlvbkNoYW5nZURhdGF9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xpbWl0cy5zZXJ2aWNlJztcclxuaW1wb3J0IHtJbWFnZURpbWVuc2lvbnN9IGZyb20gJy4uLy4uL1B1YmxpY01vZGVscyc7XHJcbmltcG9ydCB7TGltaXRFeGNlcHRpb24sIFhZUG9zaXRpb259IGZyb20gJy4uLy4uL1ByaXZhdGVNb2RlbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtZHJhZ2dhYmxlLXBvaW50JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hEcmFnZ2FibGVQb2ludENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIHdpZHRoID0gMTA7XHJcbiAgQElucHV0KCkgaGVpZ2h0ID0gMTA7XHJcbiAgQElucHV0KCkgY29sb3IgPSAnIzNjYWJlMic7XHJcbiAgQElucHV0KCkgc2hhcGU6ICdyZWN0JyB8ICdjaXJjbGUnID0gJ3JlY3QnO1xyXG4gIEBJbnB1dCgpIHBvaW50T3B0aW9uczogJ3JlY3QnIHwgJ2NpcmNsZScgPSAncmVjdCc7XHJcbiAgQElucHV0KCkgbGltaXRSb2xlczogQXJyYXk8J2xlZnQnfCdyaWdodCd8J3RvcCd8J2JvdHRvbSc+O1xyXG4gIEBJbnB1dCgpIHN0YXJ0UG9zaXRpb246IFhZUG9zaXRpb247XHJcbiAgQElucHV0KCkgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBASW5wdXQoKSBwcml2YXRlIF9jdXJyZW50UG9zaXRpb246IFhZUG9zaXRpb247XHJcbiAgcG9zaXRpb246IFhZUG9zaXRpb24gPSB7XHJcbiAgICB4OiAwLFxyXG4gICAgeTogMFxyXG4gIH07XHJcbiAgcHJpdmF0ZSBfcGFuZURpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcclxuICByZXNldFBvc2l0aW9uOiBYWVBvc2l0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxpbWl0c1NlcnZpY2U6IExpbWl0c1NlcnZpY2UpIHt9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMucG9pbnRPcHRpb25zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIHRoaXNba2V5XSA9IHRoaXMucG9pbnRPcHRpb25zW2tleV07XHJcbiAgICB9KTtcclxuICAgIC8vIHN1YnNjcmliZSB0byBwYW5lIGRpbWVuc2lvbnMgY2hhbmdlc1xyXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBhbmVEaW1lbnNpb25zLnN1YnNjcmliZShkaW1lbnNpb25zID0+IHtcclxuICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPiAwICYmIGRpbWVuc2lvbnMud2lkdGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5fcGFuZURpbWVuc2lvbnMgPSB7XHJcbiAgICAgICAgICB3aWR0aDogZGltZW5zaW9ucy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDogZGltZW5zaW9ucy5oZWlnaHRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldEluaXRpYWxQb3NpdGlvbihkaW1lbnNpb25zKTtcclxuICAgICAgICB0aGlzLmxpbWl0c1NlcnZpY2UucG9zaXRpb25DaGFuZ2UobmV3IFBvc2l0aW9uQ2hhbmdlRGF0YSh0aGlzLnBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gZXh0ZXJuYWwgcmVwb3NpdGlvbiBldmVudHNcclxuICAgIHRoaXMubGltaXRzU2VydmljZS5yZXBvc2l0aW9uRXZlbnQuc3Vic2NyaWJlKHBvc2l0aW9ucyA9PiB7XHJcbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuZXh0ZXJuYWxSZXBvc2l0aW9uKHBvc2l0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBhIGNzcyBzdHlsZSBvYmplY3QgZm9yIHRoZSBwb2ludFxyXG4gICAqL1xyXG4gIHBvaW50U3R5bGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCArICdweCcsXHJcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQgKyAncHgnLFxyXG4gICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuY29sb3IsXHJcbiAgICAgICdib3JkZXItcmFkaXVzJzogdGhpcy5zaGFwZSA9PT0gJ2NpcmNsZScgPyAnMTAwJScgOiAwLFxyXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlZ2lzdGVycyBhIHBvc2l0aW9uIGNoYW5nZSBvbiB0aGUgbGltaXRzIHNlcnZpY2UsIGFuZCBhZGp1c3RzIHBvc2l0aW9uIGlmIG5lY2Vzc2FyeVxyXG4gICAqIEBwYXJhbSBwb3NpdGlvbiAtIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBwb2ludFxyXG4gICAqL1xyXG4gIHBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uOiBYWVBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbkNoYW5nZURhdGEgPSBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpO1xyXG4gICAgY29uc3QgbGltaXRFeGNlcHRpb24gPSB0aGlzLmxpbWl0c1NlcnZpY2UuZXhjZWVkc0xpbWl0KHBvc2l0aW9uQ2hhbmdlRGF0YSk7XHJcbiAgICBpZiAobGltaXRFeGNlcHRpb24uZXhjZWVkcykge1xyXG4gICAgICAvLyBpZiBleGNlZWRzIGxpbWl0cywgcmVwb3NpdGlvblxyXG4gICAgICB0aGlzLnJlc2V0UG9zaXRpb24gPSBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uQ2hhbmdlRGF0YSk7XHJcbiAgICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogYWRqdXN0cyB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50IGFmdGVyIGEgbGltaXQgZXhjZXB0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGp1c3RQb3NpdGlvbihsaW1pdEV4Y2VwdGlvbjogTGltaXRFeGNlcHRpb24pIHtcclxuICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0ge1xyXG4gICAgICB4OiAwLFxyXG4gICAgICB5OiAwXHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5zdGFydFBvc2l0aW9uKS5mb3JFYWNoKGF4aXMgPT4ge1xyXG4gICAgICBuZXdQb3NpdGlvbltheGlzXSA9IGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29vcmRpbmF0ZXNbYXhpc10gKyBsaW1pdEV4Y2VwdGlvbi5yZXNldENvZWZmaWNpZW50c1theGlzXTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ld1Bvc2l0aW9uO1xyXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9uQ2hhbmdlKG5ldyBQb3NpdGlvbkNoYW5nZURhdGEodGhpcy5wb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjYWxsZWQgb24gbW92ZW1lbnQgZW5kLCBjaGVja3MgaWYgbGFzdCBwb3NpdGlvbiBleGNlZWRlZCB0aGUgbGltaXRzIGFkIGFkanVzdHNcclxuICAgKi9cclxuICBtb3ZlbWVudEVuZChwb3NpdGlvbjogWFlQb3NpdGlvbikge1xyXG4gICAgbGV0IHBvc2l0aW9uQ2hhbmdlRGF0YSA9IG5ldyBQb3NpdGlvbkNoYW5nZURhdGEocG9zaXRpb24sIHRoaXMubGltaXRSb2xlcyk7XHJcbiAgICBjb25zdCBsaW1pdEV4Y2VwdGlvbiA9IHRoaXMubGltaXRzU2VydmljZS5leGNlZWRzTGltaXQocG9zaXRpb25DaGFuZ2VEYXRhKTtcclxuICAgIGlmIChsaW1pdEV4Y2VwdGlvbi5leGNlZWRzKSB7XHJcbiAgICAgIHRoaXMucmVzZXRQb3NpdGlvbiA9IGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29vcmRpbmF0ZXM7XHJcbiAgICAgIGlmIChsaW1pdEV4Y2VwdGlvbi5leGNlZWRzKSB7XHJcbiAgICAgICAgdGhpcy5hZGp1c3RQb3NpdGlvbihsaW1pdEV4Y2VwdGlvbik7XHJcbiAgICAgICAgcG9zaXRpb25DaGFuZ2VEYXRhID0gbmV3IFBvc2l0aW9uQ2hhbmdlRGF0YSh0aGlzLnBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpO1xyXG4gICAgICAgIHRoaXMubGltaXRzU2VydmljZS51cGRhdGVQb3NpdGlvbihwb3NpdGlvbkNoYW5nZURhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjYWxjdWxhdGVzIHRoZSBpbml0aWFsIHBvc2l0aW9ucyBvZiB0aGUgcG9pbnQgYnkgaXQncyByb2xlc1xyXG4gICAqIEBwYXJhbSBkaW1lbnNpb25zIC0gZGltZW5zaW9ucyBvZiB0aGUgcGFuZSBpbiB3aGljaCB0aGUgcG9pbnQgaXMgbG9jYXRlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0SW5pdGlhbFBvc2l0aW9uKGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy5saW1pdFJvbGVzLmluY2x1ZGVzKCdsZWZ0JykgPyAwIDogZGltZW5zaW9ucy53aWR0aCAtIHRoaXMud2lkdGggLyAyLFxyXG4gICAgICB5OiB0aGlzLmxpbWl0Um9sZXMuaW5jbHVkZXMoJ3RvcCcpID8gMCA6IGRpbWVuc2lvbnMuaGVpZ2h0IC0gdGhpcy5oZWlnaHQgLyAyXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVwb3NpdGlvbnMgdGhlIHBvaW50IGFmdGVyIGFuIGV4dGVybmFsIHJlcG9zaXRpb24gZXZlbnRcclxuICAgKiBAcGFyYW0gcG9zaXRpb25zIC0gYW4gYXJyYXkgb2YgYWxsIHBvaW50cyBvbiB0aGUgcGFuZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZXh0ZXJuYWxSZXBvc2l0aW9uKHBvc2l0aW9uczogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4pIHtcclxuICAgIHBvc2l0aW9ucy5mb3JFYWNoKHBvc2l0aW9uID0+IHtcclxuICAgICAgaWYgKHRoaXMubGltaXRzU2VydmljZS5jb21wYXJlQXJyYXkodGhpcy5saW1pdFJvbGVzLCBwb3NpdGlvbi5yb2xlcykpIHtcclxuICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZW5mb3JjZVBhbmVMaW1pdHMocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XHJcbiAgICAgICAgICB4OiBwb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTogcG9zaXRpb24ueVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJucyBhIG5ldyBwb2ludCBwb3NpdGlvbiBpZiB0aGUgbW92ZW1lbnQgZXhjZWVkZWQgdGhlIHBhbmUgbGltaXRcclxuICAgKi9cclxuICBwcml2YXRlIGVuZm9yY2VQYW5lTGltaXRzKHBvc2l0aW9uOiBQb2ludFBvc2l0aW9uQ2hhbmdlKTogUG9pbnRQb3NpdGlvbkNoYW5nZSB7XHJcbiAgICBpZiAodGhpcy5fcGFuZURpbWVuc2lvbnMud2lkdGggPT09IDAgfHwgdGhpcy5fcGFuZURpbWVuc2lvbnMuaGVpZ2h0ID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChwb3NpdGlvbi54ID4gdGhpcy5fcGFuZURpbWVuc2lvbnMud2lkdGgpIHsgcG9zaXRpb24ueCA9IHRoaXMuX3BhbmVEaW1lbnNpb25zLndpZHRoOyB9XHJcbiAgICAgIGlmIChwb3NpdGlvbi54IDwgMCkgeyBwb3NpdGlvbi54ID0gMTsgfVxyXG4gICAgICBpZiAocG9zaXRpb24ueSA+IHRoaXMuX3BhbmVEaW1lbnNpb25zLmhlaWdodCkgeyBwb3NpdGlvbi55ID0gdGhpcy5fcGFuZURpbWVuc2lvbnMuaGVpZ2h0OyB9XHJcbiAgICAgIGlmIChwb3NpdGlvbi55IDwgMCkgeyBwb3NpdGlvbi55ID0gMTsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuIiwiPGRpdiAjcG9pbnQgbmdEcmFnZ2FibGU9XCJkcmFnZ2FibGVcIlxyXG4gICAgIChtb3ZpbmdPZmZzZXQpPVwicG9zaXRpb25DaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgW25nU3R5bGVdPVwicG9pbnRTdHlsZSgpXCJcclxuICAgICBbcG9zaXRpb25dPVwicG9zaXRpb25cIlxyXG4gICAgIFtib3VuZHNdPVwiY29udGFpbmVyXCJcclxuICAgICBbaW5Cb3VuZHNdPVwidHJ1ZVwiXHJcbiAgICAgKGVuZE9mZnNldCk9XCJtb3ZlbWVudEVuZCgkZXZlbnQpXCJcclxuICAgICAgc3R5bGU9XCJ6LWluZGV4OiAxMDAwXCI+XHJcbjwvZGl2PlxyXG4iXX0=