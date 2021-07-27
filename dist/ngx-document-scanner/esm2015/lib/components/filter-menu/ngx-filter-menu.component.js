import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/bottom-sheet";
function NgxFilterMenuComponent_button_1_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "done");
    i0.ɵɵelementEnd();
} }
function NgxFilterMenuComponent_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 1);
    i0.ɵɵlistener("click", function NgxFilterMenuComponent_button_1_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r4); const option_r1 = restoredCtx.$implicit; const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.selectOption(option_r1.name); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 2);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "span", 3);
    i0.ɵɵtemplate(6, NgxFilterMenuComponent_button_1_mat_icon_6_Template, 2, 0, "mat-icon", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r1.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r1.text);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", option_r1.name === ctx_r0.data.filter);
} }
export class NgxFilterMenuComponent {
    constructor(bottomSheetRef, data) {
        this.bottomSheetRef = bottomSheetRef;
        this.data = data;
        this.filterOptions = [
            {
                name: 'bw2',
                icon: 'filter_b_and_w',
                action: (filter) => {
                    this.filterSelected.emit(filter);
                },
                text: 'B&W 2'
            },
            {
                name: 'bw3',
                icon: 'blur_on',
                action: (filter) => {
                    this.filterSelected.emit(filter);
                },
                text: 'B&W 3'
            },
            {
                name: 'magic_color',
                icon: 'filter_vintage',
                action: (filter) => {
                    this.filterSelected.emit(filter);
                },
                text: 'Magic Color'
            },
            {
                name: 'default',
                icon: 'crop_original',
                action: (filter) => {
                    this.filterSelected.emit(filter);
                },
                text: 'Original'
            },
        ];
        this.filterSelected = new EventEmitter();
    }
    selectOption(optionName) {
        this.data.filter = optionName;
        this.bottomSheetRef.dismiss();
    }
}
NgxFilterMenuComponent.ɵfac = function NgxFilterMenuComponent_Factory(t) { return new (t || NgxFilterMenuComponent)(i0.ɵɵdirectiveInject(i1.MatBottomSheetRef), i0.ɵɵdirectiveInject(MAT_BOTTOM_SHEET_DATA)); };
NgxFilterMenuComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NgxFilterMenuComponent, selectors: [["ngx-filter-menu"]], outputs: { filterSelected: "filterSelected" }, decls: 2, vars: 1, consts: [["mat-list-item", "", 3, "click", 4, "ngFor", "ngForOf"], ["mat-list-item", "", 3, "click"], ["fxFlex", "100", 2, "text-align", "start", "margin", "5px"], ["fxFlex", "100"], [4, "ngIf"]], template: function NgxFilterMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-action-list");
        i0.ɵɵtemplate(1, NgxFilterMenuComponent_button_1_Template, 7, 3, "button", 0);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.filterOptions);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxFilterMenuComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-filter-menu',
                templateUrl: './ngx-filter-menu.component.html',
            }]
    }], function () { return [{ type: i1.MatBottomSheetRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [MAT_BOTTOM_SHEET_DATA]
            }] }]; }, { filterSelected: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1kb2N1bWVudC1zY2FubmVyL3NyYy9saWIvY29tcG9uZW50cy9maWx0ZXItbWVudS9uZ3gtZmlsdGVyLW1lbnUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRvY3VtZW50LXNjYW5uZXIvc3JjL2xpYi9jb21wb25lbnRzL2ZpbHRlci1tZW51L25neC1maWx0ZXItbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBQyxxQkFBcUIsRUFBb0IsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztJQ0dwRixnQ0FBOEM7SUFBQSxvQkFBSTtJQUFBLGlCQUFXOzs7O0lBSi9ELGlDQUErRjtJQUFwQywwUUFBbUM7SUFDNUYsZ0NBQVU7SUFBQSxZQUFlO0lBQUEsaUJBQVc7SUFDcEMsK0JBQTBEO0lBQUEsWUFBZTtJQUFBLGlCQUFPO0lBQ2hGLDBCQUEwQjtJQUMxQiwwRkFBNkQ7SUFDL0QsaUJBQVM7Ozs7SUFKRyxlQUFlO0lBQWYsb0NBQWU7SUFDaUMsZUFBZTtJQUFmLG9DQUFlO0lBRTlELGVBQWlDO0lBQWpDLDREQUFpQzs7QURHaEQsTUFBTSxPQUFPLHNCQUFzQjtJQXlDakMsWUFBb0IsY0FBeUQsRUFDM0IsSUFBUztRQUR2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBMkM7UUFDM0IsU0FBSSxHQUFKLElBQUksQ0FBSztRQXpDM0Qsa0JBQWEsR0FBOEI7WUFDekM7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsU0FBUztnQkFDZixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxhQUFhO2dCQUNuQixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLGFBQWE7YUFDcEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxVQUFVO2FBQ2pCO1NBQ0YsQ0FBQztRQUNRLG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFRckQsQ0FBQztJQVBoQixZQUFZLENBQUMsVUFBVTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs0RkF2Q1Usc0JBQXNCLG1FQTBDYixxQkFBcUI7eUVBMUM5QixzQkFBc0I7UUNSbkMsdUNBQWlCO1FBQ2YsNkVBS1M7UUFDWCxpQkFBa0I7O1FBTnlCLGVBQWdCO1FBQWhCLDJDQUFnQjs7dUZETzlDLHNCQUFzQjtjQUpsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsV0FBVyxFQUFFLGtDQUFrQzthQUNoRDs7c0JBMkNjLE1BQU07dUJBQUMscUJBQXFCO3dCQVAvQixjQUFjO2tCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0VkaXRvckFjdGlvbkJ1dHRvbn0gZnJvbSAnLi4vLi4vUHJpdmF0ZU1vZGVscyc7XHJcbmltcG9ydCB7TUFUX0JPVFRPTV9TSEVFVF9EQVRBLCBNYXRCb3R0b21TaGVldFJlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYm90dG9tLXNoZWV0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWZpbHRlci1tZW51JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEZpbHRlck1lbnVDb21wb25lbnQge1xyXG4gIGZpbHRlck9wdGlvbnM6IEFycmF5PEVkaXRvckFjdGlvbkJ1dHRvbj4gPSBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdidzInLFxyXG4gICAgICBpY29uOiAnZmlsdGVyX2JfYW5kX3cnLFxyXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcclxuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcclxuICAgICAgfSxcclxuICAgICAgdGV4dDogJ0ImVyAyJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2J3MycsXHJcbiAgICAgIGljb246ICdibHVyX29uJyxcclxuICAgICAgYWN0aW9uOiAoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZC5lbWl0KGZpbHRlcik7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRleHQ6ICdCJlcgMydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdtYWdpY19jb2xvcicsXHJcbiAgICAgIGljb246ICdmaWx0ZXJfdmludGFnZScsXHJcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWQuZW1pdChmaWx0ZXIpO1xyXG4gICAgICB9LFxyXG4gICAgICB0ZXh0OiAnTWFnaWMgQ29sb3InXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnZGVmYXVsdCcsXHJcbiAgICAgIGljb246ICdjcm9wX29yaWdpbmFsJyxcclxuICAgICAgYWN0aW9uOiAoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZC5lbWl0KGZpbHRlcik7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRleHQ6ICdPcmlnaW5hbCdcclxuICAgIH0sXHJcbiAgXTtcclxuICBAT3V0cHV0KCkgZmlsdGVyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHNlbGVjdE9wdGlvbihvcHRpb25OYW1lKSB7XHJcbiAgICB0aGlzLmRhdGEuZmlsdGVyID0gb3B0aW9uTmFtZTtcclxuICAgIHRoaXMuYm90dG9tU2hlZXRSZWYuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBib3R0b21TaGVldFJlZjogTWF0Qm90dG9tU2hlZXRSZWY8Tmd4RmlsdGVyTWVudUNvbXBvbmVudD4sXHJcbiAgICAgICAgICAgICAgQEluamVjdChNQVRfQk9UVE9NX1NIRUVUX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnlcclxuICAgICAgICAgICAgICApIHt9XHJcblxyXG59XHJcbiIsIjxtYXQtYWN0aW9uLWxpc3Q+XHJcbiAgPGJ1dHRvbiBtYXQtbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyT3B0aW9uc1wiIChjbGljayk9XCJzZWxlY3RPcHRpb24ob3B0aW9uLm5hbWUpXCI+XHJcbiAgICA8bWF0LWljb24+e3tvcHRpb24uaWNvbn19PC9tYXQtaWNvbj5cclxuICAgIDxzcGFuIGZ4RmxleD1cIjEwMFwiIHN0eWxlPVwidGV4dC1hbGlnbjogc3RhcnQ7IG1hcmdpbjogNXB4XCI+e3tvcHRpb24udGV4dH19PC9zcGFuPlxyXG4gICAgPHNwYW4gZnhGbGV4PVwiMTAwXCI+PC9zcGFuPlxyXG4gICAgPG1hdC1pY29uICpuZ0lmPVwib3B0aW9uLm5hbWUgPT09IGRhdGEuZmlsdGVyXCI+ZG9uZTwvbWF0LWljb24+XHJcbiAgPC9idXR0b24+XHJcbjwvbWF0LWFjdGlvbi1saXN0PlxyXG4iXX0=