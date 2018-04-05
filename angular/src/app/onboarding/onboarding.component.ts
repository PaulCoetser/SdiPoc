import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { OnboardingServiceProxy,
         SDIServiceProxy,
         SDI_DeveloperDto,
         PagedResultDtoOfSDI_DeveloperDto,
         SDI_ApplicationDto,
         ListResultDtoOfSDI_ApplicationDto,
         SDI_UserDto, } from '@shared/service-proxies/service-proxies';

import { AppConsts } from '@shared/AppConsts';

import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { EditDeveloperComponent } from 'app/onboarding/edit-developer/edit-developer.component';
import { CreateDeveloperComponent } from 'app/onboarding/create-developer/create-developer.component';

import { EditApplicationComponent } from 'app/onboarding/edit-application/edit-application.component';
import { CreateApplicationComponent } from 'app/onboarding/create-application/create-application.component';

import { AppComponentBase } from '@shared/app-component-base';
import { UtilsService } from '@abp/utils/utils.service';

import { SDIRegistrationServiceProxy,
         SDIPasscodeInput,
         SDIPasscodeOutput } from '@shared/service-proxies/sdi-service-proxies';

import * as moment from 'moment';

@Component({
    templateUrl: './onboarding.component.html',
    animations: [appModuleAnimation()]
})
export class OnboardingComponent extends PagedListingComponentBase<SDI_DeveloperDto> {

    @ViewChild('createDeveloperModal') createDeveloperModal: CreateDeveloperComponent;
    @ViewChild('editDeveloperModal') editDeveloperModal: EditDeveloperComponent;

    @ViewChild('createApplicationModal') createApplicationModal: CreateApplicationComponent;
    @ViewChild('editApplicationModal') editApplicationModal: EditApplicationComponent;

    developers: SDI_DeveloperDto[] = [];
    selectedDeveloper: SDI_DeveloperDto = undefined;
    applications: SDI_ApplicationDto[] = [];
    selectedApplication: SDI_ApplicationDto = undefined;
    selectedUser: SDI_UserDto = undefined;
    isApplicationTableLoading = false;
    isUserPasscodeTableLoading = false;
    refreshLoading = false;
    
    constructor(
        private injector: Injector,
        private _onboardingService: OnboardingServiceProxy,
        private _sdiRegistrationService: SDIRegistrationServiceProxy,
        private _sDIServiceProxy: SDIServiceProxy,
        private _utilsService: UtilsService,
    ) {
        super(injector);
    }

    delete(developer: SDI_DeveloperDto): void {
        abp.message.confirm(
            'Remove Developer and Applications \'' + developer.name + '\'?',
            'Permanently delete this Developer',
            (result: boolean) => {
                if ( result ) {
                    this._onboardingService.delete(developer.id)
                        .finally(() => {
                            abp.notify.info('Deleted Developer: ' + developer.name );
                            this.selectedDeveloper = undefined;
                            this.selectedApplication = undefined;
                            this.selectedUser = undefined;
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }

    deleteApplication(application: SDI_ApplicationDto): void {
        abp.message.confirm(
            'Remove Application \'' + application.name + '\'?',
            'Permanently delete this Application',
            (result: boolean) => {
                if ( result ) {
                    this._onboardingService.deleteApplication(application.id)
                        .finally(() => {
                            abp.notify.info('Deleted Application: ' + application.name );
                            this.refreshApplications();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }

    list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._onboardingService.getAll(request.skipCount, request.maxResultCount)
            .finally( () => {
                finishedCallback();
            })
            .subscribe((result: PagedResultDtoOfSDI_DeveloperDto) => {
                this.selectedDeveloper = undefined;
                this.selectedApplication = undefined;
                this.selectedUser = undefined;
                this.developers = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    loadApplications(developer: SDI_DeveloperDto): void {
        if (this.selectedDeveloper === developer) {
            return;
        } else {
            this.isApplicationTableLoading = true;
            this.selectedDeveloper = developer;
            this.selectedApplication = undefined;
            this.selectedUser = undefined;
            this._onboardingService.getAllApplications(developer.id)
            .finally( () => {
                this.isApplicationTableLoading = false;
            })
            .subscribe((result) => {
                this.selectedDeveloper.applications = result.items;
                this.applications = this.selectedDeveloper.applications;
            });
        }
    }

    refreshApplications(): void {
        if (this.selectedDeveloper === undefined) {
            return;
        } else  {
            this.isApplicationTableLoading = true;
            this._onboardingService.getAllApplications(this.selectedDeveloper.id)
            .finally( () => {
                this.isApplicationTableLoading = false;
            })
            .subscribe((result) => {
                this.selectedApplication = undefined;
                this.selectedUser = undefined;
                this.selectedDeveloper.applications = result.items;
                this.applications = this.selectedDeveloper.applications;
            });
        }
    }

    // Show Modals
    createDeveloper(): void {
        this.createDeveloperModal.show();
    }

    editDeveloper(developer: SDI_DeveloperDto): void {
        this.editDeveloperModal.show(developer.id);
    }

    createApplication(): void {
        this.createApplicationModal.show(this.selectedDeveloper);
    }

    editApplication(application: SDI_ApplicationDto): void {
        this.editApplicationModal.show(application.id, this.selectedDeveloper);
    }

    containsDeveloperIdFromSdiPlatform(developer: SDI_DeveloperDto): boolean {
        if (developer.developerIdFromSdiPlatform === undefined ||
            developer.developerIdFromSdiPlatform === null ||
            developer.developerIdFromSdiPlatform === '') {
                return false;
        } else {
            return true;
        }
    }

    containsApplicationIdFromSdiPlatform(application: SDI_ApplicationDto): boolean {
        if (application.applicationIdFromSdiPlatform === undefined ||
            application.applicationIdFromSdiPlatform === null ||
            application.applicationIdFromSdiPlatform === '') {
                return false;
        } else {
            return true;
        }
    }

    loadPasscodeForApplicationFromDatabase(application: SDI_ApplicationDto): void {
        // this.saving = false;
        this.isUserPasscodeTableLoading = true;
        this.selectedApplication = application;
        const userId = this._utilsService.getCookieValue(AppConsts.userId.userIdName);
        const userIdNumber = Number(userId);
        this._sDIServiceProxy.getLatestPasscodeByUserId(userIdNumber, this.selectedApplication.id)
        .finally( () => {
            this.isUserPasscodeTableLoading = false;
        })
        .subscribe((result: SDI_UserDto) => {
            if (this.isEmptyObject(result)) {
                this.selectedUser = undefined;
            } else {
                this.selectedUser = result;
            }
        });
    }

    isEmptyObject(obj) {
        return (obj && (Object.keys(obj).length === 0));
    }

    refreshPasscode(): void {
        // this.saving = false;
        this.refreshLoading = true;
        const userId = this._utilsService.getCookieValue(AppConsts.userId.userIdName);
        const userIdNumber = Number(userId);
        this._sDIServiceProxy.getLatestPasscodeByUserId(userIdNumber, this.selectedApplication.id)
        .subscribe((result: SDI_UserDto) => {
            //if (this.isEmptyObject(result)) {
                // Create / refresh the passcode from the SDI Platform
                let input = new SDIPasscodeInput();
                input.init( { secret: AppConsts.sdiSecret });
                
                this._sdiRegistrationService.generatePasscode(this.selectedDeveloper.developerIdFromSdiPlatform,
                                                              this.selectedApplication.applicationIdFromSdiPlatform, input)
                .subscribe((resultPassCode: SDIPasscodeOutput) => {
                    // no record on the 3rd Party Applicaiton, we create a new record otherwise we just update
                    let sdiuser = new SDI_UserDto();
                    if (!this.isEmptyObject(result) && this.selectedUser !== undefined) {
                        sdiuser = this.selectedUser;
                    } else {
                        sdiuser.userId = userIdNumber;
                        sdiuser.sdI_ApplicationId = this.selectedApplication.id;
                        sdiuser.applicationIdFromSdiPlatform = this.selectedApplication.applicationIdFromSdiPlatform;
                    }

                    sdiuser.passcode = resultPassCode.passcode;
                    sdiuser.expires = moment(resultPassCode.expires);
                    
                    // save the user / passcode in the 3rd party application
                    this._sDIServiceProxy.updatePasscode(sdiuser)
                    .finally( () => {
                        this.refreshLoading = false;
                    })
                    .subscribe((resultUser: SDI_UserDto) => {
                        this.selectedUser = resultUser;
                    });
                });
            //}
        });
    }
}
