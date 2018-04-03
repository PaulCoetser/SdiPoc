import { NgModule } from '@angular/core';

import * as ApiServiceProxies from './service-proxies';
import * as sdiApiServiceProxies from './sdi-service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.OnboardingServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        sdiApiServiceProxies.SDIRegistrationServiceProxy
    ]
})
export class ServiceProxyModule { }
