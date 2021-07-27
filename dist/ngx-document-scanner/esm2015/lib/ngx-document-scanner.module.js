import { NgModule } from '@angular/core';
import { NgxDraggablePointComponent } from './components/draggable-point/ngx-draggable-point.component';
import { NgxFilterMenuComponent } from './components/filter-menu/ngx-filter-menu.component';
import { NgxShapeOutlineComponent } from './components/shape-outline/ngx-shape-outline.component';
import { NgxDocScannerComponent } from './components/image-editor/ngx-doc-scanner.component';
import { LimitsService } from './services/limits.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularDraggableModule } from 'angular2-draggable';
import { CommonModule } from '@angular/common';
import { NgxOpenCVModule } from 'ngx-opencv';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { NgxOpenCVService, OpenCvConfigToken } from 'ngx-opencv';
import * as i0 from "@angular/core";
export class NgxDocumentScannerModule {
    static forRoot(config) {
        return {
            ngModule: NgxDocumentScannerModule,
            providers: [
                { provide: OpenCvConfigToken, useValue: config },
            ],
        };
    }
}
NgxDocumentScannerModule.ɵfac = function NgxDocumentScannerModule_Factory(t) { return new (t || NgxDocumentScannerModule)(); };
NgxDocumentScannerModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgxDocumentScannerModule });
NgxDocumentScannerModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        NgxOpenCVService,
        LimitsService,
    ], imports: [[
            FlexLayoutModule,
            MatButtonModule,
            MatIconModule,
            MatBottomSheetModule,
            MatListModule,
            AngularDraggableModule,
            CommonModule,
            NgxOpenCVModule,
        ], FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatBottomSheetModule,
        MatListModule,
        AngularDraggableModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxDocumentScannerModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NgxDraggablePointComponent,
                    NgxFilterMenuComponent,
                    NgxShapeOutlineComponent,
                    NgxDocScannerComponent,
                ],
                imports: [
                    FlexLayoutModule,
                    MatButtonModule,
                    MatIconModule,
                    MatBottomSheetModule,
                    MatListModule,
                    AngularDraggableModule,
                    CommonModule,
                    NgxOpenCVModule,
                ],
                exports: [
                    FlexLayoutModule,
                    MatButtonModule,
                    MatIconModule,
                    MatBottomSheetModule,
                    MatListModule,
                    AngularDraggableModule,
                    NgxDocScannerComponent,
                ],
                entryComponents: [
                    NgxFilterMenuComponent,
                ],
                providers: [
                    NgxOpenCVService,
                    LimitsService,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxDocumentScannerModule, { declarations: [NgxDraggablePointComponent,
        NgxFilterMenuComponent,
        NgxShapeOutlineComponent,
        NgxDocScannerComponent], imports: [FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatBottomSheetModule,
        MatListModule,
        AngularDraggableModule,
        CommonModule,
        NgxOpenCVModule], exports: [FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatBottomSheetModule,
        MatListModule,
        AngularDraggableModule,
        NgxDocScannerComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRvY3VtZW50LXNjYW5uZXIvc3JjL2xpYi9uZ3gtZG9jdW1lbnQtc2Nhbm5lci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNERBQTRELENBQUM7QUFDdEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDMUYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0RBQXdELENBQUM7QUFDaEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scURBQXFELENBQUM7QUFDM0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLFlBQVksQ0FBQzs7QUFvQy9ELE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFvQjtRQUNqQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUNqRDtTQUNGLENBQUM7SUFDSixDQUFDOztnR0FSVSx3QkFBd0I7MEVBQXhCLHdCQUF3QjsrRUFMeEI7UUFDVCxnQkFBZ0I7UUFDaEIsYUFBYTtLQUNkLFlBekJRO1lBQ1AsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZixhQUFhO1lBQ2Isb0JBQW9CO1lBQ3BCLGFBQWE7WUFDYixzQkFBc0I7WUFDdEIsWUFBWTtZQUNaLGVBQWU7U0FDaEIsRUFFQyxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGFBQWE7UUFDYixvQkFBb0I7UUFDcEIsYUFBYTtRQUNiLHNCQUFzQjt1RkFXYix3QkFBd0I7Y0FsQ3BDLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osMEJBQTBCO29CQUMxQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsc0JBQXNCO2lCQUN2QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixhQUFhO29CQUNiLHNCQUFzQjtvQkFDdEIsWUFBWTtvQkFDWixlQUFlO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixhQUFhO29CQUNiLHNCQUFzQjtvQkFDdEIsc0JBQXNCO2lCQUN2QjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2Ysc0JBQXNCO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsZ0JBQWdCO29CQUNoQixhQUFhO2lCQUNkO2FBQ0Y7O3dGQUNZLHdCQUF3QixtQkFoQ2pDLDBCQUEwQjtRQUMxQixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLHNCQUFzQixhQUd0QixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGFBQWE7UUFDYixvQkFBb0I7UUFDcEIsYUFBYTtRQUNiLHNCQUFzQjtRQUN0QixZQUFZO1FBQ1osZUFBZSxhQUdmLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsYUFBYTtRQUNiLG9CQUFvQjtRQUNwQixhQUFhO1FBQ2Isc0JBQXNCO1FBQ3RCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05neERyYWdnYWJsZVBvaW50Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZHJhZ2dhYmxlLXBvaW50L25neC1kcmFnZ2FibGUtcG9pbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3hGaWx0ZXJNZW51Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmlsdGVyLW1lbnUvbmd4LWZpbHRlci1tZW51LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd4U2hhcGVPdXRsaW5lQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcGUtb3V0bGluZS9uZ3gtc2hhcGUtb3V0bGluZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge05neERvY1NjYW5uZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9pbWFnZS1lZGl0b3Ivbmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7TGltaXRzU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XHJcbmltcG9ydCB7RmxleExheW91dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xyXG5pbXBvcnQge0FuZ3VsYXJEcmFnZ2FibGVNb2R1bGV9IGZyb20gJ2FuZ3VsYXIyLWRyYWdnYWJsZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge09wZW5DVkNvbmZpZ30gZnJvbSAnLi9QdWJsaWNNb2RlbHMnO1xyXG5pbXBvcnQge05neE9wZW5DVk1vZHVsZX0gZnJvbSAnbmd4LW9wZW5jdic7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuaW1wb3J0IHsgTWF0Qm90dG9tU2hlZXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9ib3R0b20tc2hlZXQnO1xyXG5pbXBvcnQgeyBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XHJcbmltcG9ydCB7Tmd4T3BlbkNWU2VydmljZSwgT3BlbkN2Q29uZmlnVG9rZW59IGZyb20gJ25neC1vcGVuY3YnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5neERyYWdnYWJsZVBvaW50Q29tcG9uZW50LFxyXG4gICAgTmd4RmlsdGVyTWVudUNvbXBvbmVudCxcclxuICAgIE5neFNoYXBlT3V0bGluZUNvbXBvbmVudCxcclxuICAgIE5neERvY1NjYW5uZXJDb21wb25lbnQsXHJcbiAgXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIEFuZ3VsYXJEcmFnZ2FibGVNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBOZ3hPcGVuQ1ZNb2R1bGUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIEFuZ3VsYXJEcmFnZ2FibGVNb2R1bGUsXHJcbiAgICBOZ3hEb2NTY2FubmVyQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBOZ3hGaWx0ZXJNZW51Q29tcG9uZW50LFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOZ3hPcGVuQ1ZTZXJ2aWNlLFxyXG4gICAgTGltaXRzU2VydmljZSxcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hEb2N1bWVudFNjYW5uZXJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogT3BlbkNWQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxhbnk+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ3hEb2N1bWVudFNjYW5uZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHsgcHJvdmlkZTogT3BlbkN2Q29uZmlnVG9rZW4sIHVzZVZhbHVlOiBjb25maWcgfSxcclxuICAgICAgXSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==