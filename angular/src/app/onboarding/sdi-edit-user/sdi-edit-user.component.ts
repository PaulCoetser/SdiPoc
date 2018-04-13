import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SDIServiceProxy, ISDI_UserDto, SDI_UserDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";

@Component({
  selector: 'sdi-edit-user-modal',
  templateUrl: './sdi-edit-user.component.html'
})
export class SDIEditUserComponent extends AppComponentBase {

    @ViewChild('sdiEditUserModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    user: SDI_UserDto = null;
    containsApplicationIdFromSdiPlatform = false;

    constructor(
        injector: Injector,
        private _sdiAppServiceProxy: SDIServiceProxy
    ) {
        super(injector);
    }

    show(user: SDI_UserDto): void {
        this.user = user;
        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        this.saving = true;
        this._sdiAppServiceProxy.updateApiKey(this.user)
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
