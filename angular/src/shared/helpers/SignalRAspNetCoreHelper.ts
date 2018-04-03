import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from '@abp/utils/utils.service';

export class SignalRAspNetCoreHelper {
    static initSignalR(): void {

        var encryptedAuthToken = new UtilsService().getCookieValue(AppConsts.authorization.encrptedAuthTokenName);

        abp.signalr = {
            autoConnect: true,
            connect: undefined,
            hubs: undefined,
            qs: AppConsts.authorization.encrptedAuthTokenName + "=" + encodeURIComponent(encryptedAuthToken),
            url: AppConsts.remoteServiceBaseUrl + '/signalr',
            startConnection: undefined,
            remoteServiceBaseUrl: undefined
        };

        jQuery.getScript(AppConsts.appBaseUrl + '/assets/abp/abp.signalr-client.js');
    }
}
