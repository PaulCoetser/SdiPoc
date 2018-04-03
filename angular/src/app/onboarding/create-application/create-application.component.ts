import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { OnboardingServiceProxy, SDI_ApplicationDto, SDI_DeveloperDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import { SDISignupOutput,
    SDISignupInput,
    SDIRegistrationServiceProxy,
    Developer,
    Application } from '@shared/service-proxies/sdi-service-proxies';

import * as _ from "lodash";

@Component({
  selector: 'create-application-modal',
  templateUrl: './create-application.component.html'
})
export class CreateApplicationComponent extends AppComponentBase {

    @ViewChild('createApplicationModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    application: SDI_ApplicationDto = null;
    developerName = '';
    developerId: string;
    applicationSignup: Application;

    constructor(
        injector: Injector,
        private _onboardingService: OnboardingServiceProxy,
        private _sdiRegistrationService: SDIRegistrationServiceProxy,
    ) {
        super(injector);
    }

    show(developer: SDI_DeveloperDto): void {
        this.active = true;
        this.modal.show();
        this.application = new SDI_ApplicationDto();
        this.application.init({sdI_DeveloperId: developer.id});
        this.developerName = developer.name;
        this.developerId = developer.developerIdFromSdiPlatform;
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        this.saving = true;
        
        this.applicationSignup =  new Application();
        this.applicationSignup.name = this.application.name;
        this.applicationSignup.description = this.application.description;
        this.applicationSignup.website = this.application.website;
        this.applicationSignup.domain = this.application.domain;
        this.applicationSignup.approvalUrl = this.application.approvalUrl;
        this.applicationSignup.uploadUrl = this.application.uploadUrl;

        this._sdiRegistrationService.registerApplication(this.developerId, this.applicationSignup) 
        .finally(() => { this.saving = false; })
        .subscribe((result: SDISignupOutput) => {
            if (result.registrationUrl !== undefined) {
                this.application.registrationUrl = result.registrationUrl;
            }
            this._onboardingService.createApplication(this.application)
                .finally(() => { this.saving = false; })
                .subscribe((result: SDI_ApplicationDto) => {
                    this.notify.info(this.l('SavedSuccessfullyActivateTheLink') + '</br><a href="' + result.registrationUrl + '">Application Registration Confirmation</a>' );
                    this.close();
                    this.modalSave.emit(null);
                });
        });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
