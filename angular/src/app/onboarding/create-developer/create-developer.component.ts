import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SDI_DeveloperDto, OnboardingServiceProxy, SDI_ApplicationDto } from '@shared/service-proxies/service-proxies';

import { SDISignupOutput,
         SDISignupInput,
         SDIRegistrationServiceProxy,
         Developer,
         Application } from '@shared/service-proxies/sdi-service-proxies';

import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";

@Component({
  selector: 'create-developer-modal',
  templateUrl: './create-developer.component.html'
})
export class CreateDeveloperComponent extends AppComponentBase {

    @ViewChild('createDeveloperModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    developer: SDI_DeveloperDto = null;
    application: SDI_ApplicationDto = null;
    signup: SDISignupInput;
    
    constructor(
        injector: Injector,
        private _onboardingService: OnboardingServiceProxy,
        private _sdiRegistrationService: SDIRegistrationServiceProxy,
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.modal.show();
        this.developer = new SDI_DeveloperDto();
        //this.developer.init({applications: [] }); //{isActive:true}
        this.developer.init({ applications: [], name: 'PAUL', company: 'Sage', email: 'UniqueName@mailinator.com', phone: '0434869391', country: 'AU' });

        this.application = new SDI_ApplicationDto();
        //this.application.init({sdI_DeveloperId: this.developer.id});
        this.application.init({ sdI_DeveloperId: this.developer.id, name: 'UniqueAppName 1', description: 'Application Description 1', website: 'https://www.sage.com/', domain: 'ecommerce', approvalUrl: 'https://someurlformy3rdpartyapp.com', uploadUrl: 'https://someurlformy3rdpartyapp.com' });
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        this.saving = true;

        this.signup.application =  new Application();
        this.signup.application.name = this.application.name;
        this.signup.application.description = this.application.description;
        this.signup.application.website = this.application.website;
        this.signup.application.domain = this.application.domain;
        this.signup.application.approvalUrl = this.application.approvalUrl;
        this.signup.application.uploadUrl = this.application.uploadUrl;

        this._sdiRegistrationService.registerDeveloperAndApplication(this.signup)
        .finally(() => { this.saving = false; })
        .subscribe((result: SDISignupOutput) => {
            if (result.registrationUrl !== undefined) {
                if (this.developer.applications !== undefined && this.developer.applications.length == 1) {
                    this.developer.applications[0].registrationUrl = result.registrationUrl;
                }
                
                this._onboardingService.create(this.developer)
                .finally(() => { this.saving = false; })
                .subscribe((result: SDI_DeveloperDto) => {
                    this.notify.info(this.l('SavedSuccessfullyActivateTheLink') + '</br><a href="' + result.applications[0].registrationUrl + '">Registration Confirmation</a>' );
                    this.close();
                    this.modalSave.emit(null);
                    //navigate to this URL      
                    //setTimeout(() => {
                    //    window.open(result.applications[0].registrationUrl, '_blank');    
                    //}, 100);              
                });
            }
        });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
