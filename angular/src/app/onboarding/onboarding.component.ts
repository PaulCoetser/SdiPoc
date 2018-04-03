import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { OnboardingServiceProxy, SDI_DeveloperDto, PagedResultDtoOfSDI_DeveloperDto, SDI_ApplicationDto, ListResultDtoOfSDI_ApplicationDto } from '@shared/service-proxies/service-proxies';

import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { EditDeveloperComponent } from 'app/onboarding/edit-developer/edit-developer.component';
import { CreateDeveloperComponent } from 'app/onboarding/create-developer/create-developer.component';

import { EditApplicationComponent } from 'app/onboarding/edit-application/edit-application.component';
import { CreateApplicationComponent } from 'app/onboarding/create-application/create-application.component';

import { AppComponentBase } from '@shared/app-component-base';

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

    constructor(
        private injector: Injector,
        private _onboardingService: OnboardingServiceProxy
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
                this.developers = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    loadApplications(developer: SDI_DeveloperDto): void {
        if (this.selectedDeveloper === developer) {
            return;
        } else {
            this.selectedDeveloper = developer;
            this._onboardingService.getAllApplications(developer.id)
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
            this._onboardingService.getAllApplications(this.selectedDeveloper.id)
            .subscribe((result) => {
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
}
