import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SDI_DeveloperDto, OnboardingServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";

@Component({
  selector: 'edit-developer-modal',
  templateUrl: './edit-developer.component.html'
})
export class EditDeveloperComponent extends AppComponentBase {

    @ViewChild('editDeveloperModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    developer: SDI_DeveloperDto = null;
    containsDeveloperIdFromSdiPlatform  = false;

    constructor(
        injector: Injector,
        private _onboardingService: OnboardingServiceProxy
    ) {
        super(injector);
    }

    show(id: number): void {
        this._onboardingService.get(id)
            .finally(() => {
                this.active = true;
                this.modal.show();
            })
            .subscribe((result: SDI_DeveloperDto) => {
                this.developer = result;
                if (this.developer.developerIdFromSdiPlatform === undefined ||
                    this.developer.developerIdFromSdiPlatform === null ||
                    this.developer.developerIdFromSdiPlatform === '') {
                        this.containsDeveloperIdFromSdiPlatform = false;
                } else {
                    this.containsDeveloperIdFromSdiPlatform = true;
                }
            });
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        this.saving = true;
        this._onboardingService.update(this.developer)
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
