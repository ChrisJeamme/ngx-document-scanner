import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/bottom-sheet";
import * as i2 from "@angular/material/list";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/flex-layout/flex";
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
    } }, directives: [i2.MatList, i3.NgForOf, i2.MatListItem, i4.MatIcon, i5.DefaultFlexDirective, i3.NgIf], encapsulation: 2 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1kb2N1bWVudC1zY2FubmVyL3NyYy9saWIvY29tcG9uZW50cy9maWx0ZXItbWVudS9uZ3gtZmlsdGVyLW1lbnUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRvY3VtZW50LXNjYW5uZXIvc3JjL2xpYi9jb21wb25lbnRzL2ZpbHRlci1tZW51L25neC1maWx0ZXItbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBQyxxQkFBcUIsRUFBb0IsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7SUNHcEYsZ0NBQThDO0lBQUEsb0JBQUk7SUFBQSxpQkFBVzs7OztJQUovRCxpQ0FBK0Y7SUFBcEMsMFFBQW1DO0lBQzVGLGdDQUFVO0lBQUEsWUFBZTtJQUFBLGlCQUFXO0lBQ3BDLCtCQUEwRDtJQUFBLFlBQWU7SUFBQSxpQkFBTztJQUNoRiwwQkFBMEI7SUFDMUIsMEZBQTZEO0lBQy9ELGlCQUFTOzs7O0lBSkcsZUFBZTtJQUFmLG9DQUFlO0lBQ2lDLGVBQWU7SUFBZixvQ0FBZTtJQUU5RCxlQUFpQztJQUFqQyw0REFBaUM7O0FER2hELE1BQU0sT0FBTyxzQkFBc0I7SUF5Q2pDLFlBQW9CLGNBQXlELEVBQzNCLElBQVM7UUFEdkMsbUJBQWMsR0FBZCxjQUFjLENBQTJDO1FBQzNCLFNBQUksR0FBSixJQUFJLENBQUs7UUF6QzNELGtCQUFhLEdBQThCO1lBQ3pDO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsYUFBYTtnQkFDbkIsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxhQUFhO2FBQ3BCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxJQUFJLEVBQUUsVUFBVTthQUNqQjtTQUNGLENBQUM7UUFDUSxtQkFBYyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBUXJELENBQUM7SUFQaEIsWUFBWSxDQUFDLFVBQVU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7NEZBdkNVLHNCQUFzQixtRUEwQ2IscUJBQXFCO3lFQTFDOUIsc0JBQXNCO1FDUm5DLHVDQUFpQjtRQUNmLDZFQUtTO1FBQ1gsaUJBQWtCOztRQU55QixlQUFnQjtRQUFoQiwyQ0FBZ0I7O3VGRE85QyxzQkFBc0I7Y0FKbEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFdBQVcsRUFBRSxrQ0FBa0M7YUFDaEQ7O3NCQTJDYyxNQUFNO3VCQUFDLHFCQUFxQjt3QkFQL0IsY0FBYztrQkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtFZGl0b3JBY3Rpb25CdXR0b259IGZyb20gJy4uLy4uL1ByaXZhdGVNb2RlbHMnO1xyXG5pbXBvcnQge01BVF9CT1RUT01fU0hFRVRfREFUQSwgTWF0Qm90dG9tU2hlZXRSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2JvdHRvbS1zaGVldCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1maWx0ZXItbWVudScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1maWx0ZXItbWVudS5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hGaWx0ZXJNZW51Q29tcG9uZW50IHtcclxuICBmaWx0ZXJPcHRpb25zOiBBcnJheTxFZGl0b3JBY3Rpb25CdXR0b24+ID0gW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnYncyJyxcclxuICAgICAgaWNvbjogJ2ZpbHRlcl9iX2FuZF93JyxcclxuICAgICAgYWN0aW9uOiAoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZC5lbWl0KGZpbHRlcik7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRleHQ6ICdCJlcgMidcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdidzMnLFxyXG4gICAgICBpY29uOiAnYmx1cl9vbicsXHJcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWQuZW1pdChmaWx0ZXIpO1xyXG4gICAgICB9LFxyXG4gICAgICB0ZXh0OiAnQiZXIDMnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnbWFnaWNfY29sb3InLFxyXG4gICAgICBpY29uOiAnZmlsdGVyX3ZpbnRhZ2UnLFxyXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcclxuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcclxuICAgICAgfSxcclxuICAgICAgdGV4dDogJ01hZ2ljIENvbG9yJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2RlZmF1bHQnLFxyXG4gICAgICBpY29uOiAnY3JvcF9vcmlnaW5hbCcsXHJcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWQuZW1pdChmaWx0ZXIpO1xyXG4gICAgICB9LFxyXG4gICAgICB0ZXh0OiAnT3JpZ2luYWwnXHJcbiAgICB9LFxyXG4gIF07XHJcbiAgQE91dHB1dCgpIGZpbHRlclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBzZWxlY3RPcHRpb24ob3B0aW9uTmFtZSkge1xyXG4gICAgdGhpcy5kYXRhLmZpbHRlciA9IG9wdGlvbk5hbWU7XHJcbiAgICB0aGlzLmJvdHRvbVNoZWV0UmVmLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYm90dG9tU2hlZXRSZWY6IE1hdEJvdHRvbVNoZWV0UmVmPE5neEZpbHRlck1lbnVDb21wb25lbnQ+LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoTUFUX0JPVFRPTV9TSEVFVF9EQVRBKSBwdWJsaWMgZGF0YTogYW55XHJcbiAgICAgICAgICAgICAgKSB7fVxyXG5cclxufVxyXG4iLCI8bWF0LWFjdGlvbi1saXN0PlxyXG4gIDxidXR0b24gbWF0LWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlck9wdGlvbnNcIiAoY2xpY2spPVwic2VsZWN0T3B0aW9uKG9wdGlvbi5uYW1lKVwiPlxyXG4gICAgPG1hdC1pY29uPnt7b3B0aW9uLmljb259fTwvbWF0LWljb24+XHJcbiAgICA8c3BhbiBmeEZsZXg9XCIxMDBcIiBzdHlsZT1cInRleHQtYWxpZ246IHN0YXJ0OyBtYXJnaW46IDVweFwiPnt7b3B0aW9uLnRleHR9fTwvc3Bhbj5cclxuICAgIDxzcGFuIGZ4RmxleD1cIjEwMFwiPjwvc3Bhbj5cclxuICAgIDxtYXQtaWNvbiAqbmdJZj1cIm9wdGlvbi5uYW1lID09PSBkYXRhLmZpbHRlclwiPmRvbmU8L21hdC1pY29uPlxyXG4gIDwvYnV0dG9uPlxyXG48L21hdC1hY3Rpb24tbGlzdD5cclxuIl19