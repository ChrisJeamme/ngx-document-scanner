import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
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
NgxFilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-filter-menu',
                template: "<mat-action-list>\r\n  <button mat-list-item *ngFor=\"let option of filterOptions\" (click)=\"selectOption(option.name)\">\r\n    <mat-icon>{{option.icon}}</mat-icon>\r\n    <span fxFlex=\"100\" style=\"text-align: start; margin: 5px\">{{option.text}}</span>\r\n    <span fxFlex=\"100\"></span>\r\n    <mat-icon *ngIf=\"option.name === data.filter\">done</mat-icon>\r\n  </button>\r\n</mat-action-list>\r\n"
            },] }
];
/** @nocollapse */
NgxFilterMenuComponent.ctorParameters = () => [
    { type: MatBottomSheetRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_BOTTOM_SHEET_DATA,] }] }
];
NgxFilterMenuComponent.propDecorators = {
    filterSelected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1kb2N1bWVudC1zY2FubmVyL3NyYy9saWIvY29tcG9uZW50cy9maWx0ZXItbWVudS9uZ3gtZmlsdGVyLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFNeEYsTUFBTSxPQUFPLHNCQUFzQjtJQXlDakMsWUFBb0IsY0FBeUQsRUFDM0IsSUFBUztRQUR2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBMkM7UUFDM0IsU0FBSSxHQUFKLElBQUksQ0FBSztRQXpDM0Qsa0JBQWEsR0FBOEI7WUFDekM7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsU0FBUztnQkFDZixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxhQUFhO2dCQUNuQixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLGFBQWE7YUFDcEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxVQUFVO2FBQ2pCO1NBQ0YsQ0FBQztRQUNRLG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFRckQsQ0FBQztJQVBoQixZQUFZLENBQUMsVUFBVTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7WUEzQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLGthQUErQzthQUNoRDs7OztZQUw4QixpQkFBaUI7NENBZ0RqQyxNQUFNLFNBQUMscUJBQXFCOzs7NkJBUHhDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RWRpdG9yQWN0aW9uQnV0dG9ufSBmcm9tICcuLi8uLi9Qcml2YXRlTW9kZWxzJztcclxuaW1wb3J0IHtNQVRfQk9UVE9NX1NIRUVUX0RBVEEsIE1hdEJvdHRvbVNoZWV0UmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9ib3R0b20tc2hlZXQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtZmlsdGVyLW1lbnUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZmlsdGVyLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RmlsdGVyTWVudUNvbXBvbmVudCB7XHJcbiAgZmlsdGVyT3B0aW9uczogQXJyYXk8RWRpdG9yQWN0aW9uQnV0dG9uPiA9IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2J3MicsXHJcbiAgICAgIGljb246ICdmaWx0ZXJfYl9hbmRfdycsXHJcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWQuZW1pdChmaWx0ZXIpO1xyXG4gICAgICB9LFxyXG4gICAgICB0ZXh0OiAnQiZXIDInXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnYnczJyxcclxuICAgICAgaWNvbjogJ2JsdXJfb24nLFxyXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcclxuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcclxuICAgICAgfSxcclxuICAgICAgdGV4dDogJ0ImVyAzJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ21hZ2ljX2NvbG9yJyxcclxuICAgICAgaWNvbjogJ2ZpbHRlcl92aW50YWdlJyxcclxuICAgICAgYWN0aW9uOiAoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZC5lbWl0KGZpbHRlcik7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRleHQ6ICdNYWdpYyBDb2xvcidcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdkZWZhdWx0JyxcclxuICAgICAgaWNvbjogJ2Nyb3Bfb3JpZ2luYWwnLFxyXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcclxuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcclxuICAgICAgfSxcclxuICAgICAgdGV4dDogJ09yaWdpbmFsJ1xyXG4gICAgfSxcclxuICBdO1xyXG4gIEBPdXRwdXQoKSBmaWx0ZXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgc2VsZWN0T3B0aW9uKG9wdGlvbk5hbWUpIHtcclxuICAgIHRoaXMuZGF0YS5maWx0ZXIgPSBvcHRpb25OYW1lO1xyXG4gICAgdGhpcy5ib3R0b21TaGVldFJlZi5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJvdHRvbVNoZWV0UmVmOiBNYXRCb3R0b21TaGVldFJlZjxOZ3hGaWx0ZXJNZW51Q29tcG9uZW50PixcclxuICAgICAgICAgICAgICBASW5qZWN0KE1BVF9CT1RUT01fU0hFRVRfREFUQSkgcHVibGljIGRhdGE6IGFueVxyXG4gICAgICAgICAgICAgICkge31cclxuXHJcbn1cclxuIl19