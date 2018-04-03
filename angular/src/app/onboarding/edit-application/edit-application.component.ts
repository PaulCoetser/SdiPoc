import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SDI_ApplicationDto, SDI_DeveloperDto, OnboardingServiceProxy, ISDI_DeveloperDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";

@Component({
  selector: 'edit-application-modal',
  templateUrl: './edit-application.component.html'
})
export class EditApplicationComponent extends AppComponentBase {

    @ViewChild('editApplicationModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    application: SDI_ApplicationDto = null;
    developerName = '';
    containsApplicationIdFromSdiPlatform = false;

    constructor(
        injector: Injector,
        private _onboardingService: OnboardingServiceProxy
    ) {
        super(injector);
    }

    show(id: number, developer: SDI_DeveloperDto): void {
        this.developerName = developer.name;
        this._onboardingService.getApplication(id)
            .finally(() => {
                this.active = true;
                this.modal.show();
            })
            .subscribe((result: SDI_ApplicationDto) => {
                this.application = result;
                if (this.application.applicationIdFromSdiPlatform === undefined ||
                    this.application.applicationIdFromSdiPlatform === null ||
                    this.application.applicationIdFromSdiPlatform === '') {
                        this.containsApplicationIdFromSdiPlatform = false;
                } else {
                    this.containsApplicationIdFromSdiPlatform = true;
                }
            });
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        this.saving = true;
        this._onboardingService.updateApplication(this.application)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
