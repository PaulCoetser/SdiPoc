import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import {  Http, Headers, ResponseContentType, Response } from '@angular/http';

import * as moment from 'moment';

export const SDI_API_BASE_URL = new InjectionToken<string>('SDI_API_BASE_URL');


/*import {
    HttpClient,
    HttpParams,
    HttpHeaders
} from '@angular/common/http';


import 'rxjs/add/operator/retry';
import 'rxjs/Rx';
*/

@Injectable()
export class SDIRegistrationServiceProxy {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor(@Inject(Http) http: Http, @Optional() @Inject(SDI_API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '/';
    }

    /**
     * @input required)
     * @return Success
     */
    registerDeveloperAndApplication(input: SDISignupInput): Observable<SDISignupOutput> {
        let url_ = this.baseUrl + '/api/developers';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(input);

        let options_: any = {
            body: content_,
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        return this.http.request(url_, options_).flatMap((response_: any) => {
            return this.processRegisterDeveloperAndApplication(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processRegisterDeveloperAndApplication(<any>response_);
                } catch (e) {
                    return <Observable<SDISignupOutput>><any>Observable.throw(e);
                }
            } else {
                return <Observable<SDISignupOutput>><any>Observable.throw(response_);
            }
        });
    }

    protected processRegisterDeveloperAndApplication(response: Response): Observable<SDISignupOutput> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            let result200: any = null;
            let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? SDISignupOutput.fromJS(resultData200) : new SDISignupOutput();
            return Observable.of(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.text();
            return throwException('An unexpected server error occurred.', status, _responseText, _headers);
        }
        return Observable.of<SDISignupOutput>(<any>null);
    }



    /**
     * @input required)
     * @return Success
     */
    registerApplication(developerId: string, input: Application): Observable<SDISignupOutput> {
        let url_ = this.baseUrl + '/api/developers/' + developerId +'/applications';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(input);

        let options_: any = {
            body: content_,
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        return this.http.request(url_, options_).flatMap((response_: any) => {
            return this.processRegisterApplication(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processRegisterApplication(<any>response_);
                } catch (e) {
                    return <Observable<SDISignupOutput>><any>Observable.throw(e);
                }
            } else {
                return <Observable<SDISignupOutput>><any>Observable.throw(response_);
            }
        });
    }

    protected processRegisterApplication(response: Response): Observable<SDISignupOutput> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            let result200: any = null;
            let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? SDISignupOutput.fromJS(resultData200) : new SDISignupOutput();
            return Observable.of(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.text();
            return throwException('An unexpected server error occurred.', status, _responseText, _headers);
        }
        return Observable.of<SDISignupOutput>(<any>null);
    }





      /**
     * @input required)
     * @return Success
     */
    generatePasscode(developerId: string, applicationId: string, input: SDIPasscodeInput): Observable<SDIPasscodeOutput> {
        let url_ = this.baseUrl + '/api/developers/' + developerId + '/applications/' + applicationId + '/passcodes';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(input);

        let options_: any = {
            body: content_,
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        return this.http.request(url_, options_).flatMap((response_: any) => {
            return this.processGeneratePasscode(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processGeneratePasscode(<any>response_);
                } catch (e) {
                    return <Observable<SDIPasscodeOutput>><any>Observable.throw(e);
                }
            } else {
                return <Observable<SDIPasscodeOutput>><any>Observable.throw(response_);
            }
        });
    }

    protected processGeneratePasscode(response: Response): Observable<SDIPasscodeOutput> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            let result200: any = null;
            let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? SDIPasscodeOutput.fromJS(resultData200) : new SDIPasscodeOutput();
            return Observable.of(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.text();
            return throwException('An unexpected server error occurred.', status, _responseText, _headers);
        }
        return Observable.of<SDIPasscodeOutput>(<any>null);
    }


}


export interface IDeveloper {
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
}

export class Developer implements IDeveloper {
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;

    static fromJS(data: any): Developer {
        data = typeof data === 'object' ? data : {};
        const result = new Developer();
        result.init(data);
        return result;
    }

    constructor(data?: IDeveloper) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data['name'];
            this.company = data['company'];
            this.email = data['email'];
            this.phone = data['phone'];
            this.country = data['country'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['name'] = this.name;
        data['company'] = this.company;
        data['email'] = this.email;
        data['phone'] = this.phone;
        data['country'] = this.country;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Developer();
        result.init(json);
        return result;
    }
}

export interface IApplication {
    name: string;
    description: string;
    domain: string;
    approvalUrl: string;
    uploadUrl: string;
    website: string;
    registrationUrl: string;
}

export class Application implements IApplication {
    name: string;
    description: string;
    domain: string;
    approvalUrl: string;
    uploadUrl: string;
    website: string;
    registrationUrl: string;

    static fromJS(data: any): Application {
        data = typeof data === 'object' ? data : {};
        let result = new Application();
        result.init(data);
        return result;
    }

    constructor(data?: IApplication) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data['name'];
            this.description = data['description'];
            this.domain = data['domain'];
            this.approvalUrl = data['approvalUrl'];
            this.uploadUrl = data['uploadUrl'];
            this.website = data['website'];
            this.registrationUrl = data['registrationUrl'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['name'] = this.name;
        data['description'] = this.description;
        data['domain'] = this.domain;
        data['approvalUrl'] = this.approvalUrl;
        data['uploadUrl'] = this.uploadUrl;
        data['website'] = this.website;
        data['registrationUrl'] = this.registrationUrl;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Application();
        result.init(json);
        return result;
    }
}

export interface ISDISignupInput {
    developer: IDeveloper;
    application: IApplication;
}

export class SDISignupInput implements ISDISignupInput {
    developer: IDeveloper;
    application: IApplication;

    static fromJS(data: any): SDISignupInput {
        data = typeof data === 'object' ? data : {};
        let result = new SDISignupInput();
        result.init(data);
        return result;
    }

    constructor(data?: ISDISignupInput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.developer = data['developer'];
            this.application = data['application'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['developer'] = this.developer;
        data['application'] = this.application;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new SDISignupInput();
        result.init(json);
        return result;
    }
}

export class SDISignupOutput implements ISDISignupOutput {
    registrationUrl: string;

    static fromJS(data: any): ISDISignupOutput {
        data = typeof data === 'object' ? data : {};
        let result = new SDISignupOutput();
        result.init(data);
        return result;
    }

    constructor(data?: ISDISignupOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.registrationUrl = data['registrationUrl'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['registrationUrl'] = this.registrationUrl;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new SDISignupOutput();
        result.init(json);
        return result;
    }
}

export interface ISDISignupOutput {
    registrationUrl: string;
}




export class SDIPasscodeInput implements ISDIPasscodeInput {
    secret: string;

    static fromJS(data: any): ISDIPasscodeInput {
        data = typeof data === 'object' ? data : {};
        let result = new SDIPasscodeInput();
        result.init(data);
        return result;
    }

    constructor(data?: ISDIPasscodeInput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.secret = data['secret'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['secret'] = this.secret;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new SDIPasscodeInput();
        result.init(json);
        return result;
    }
}

export interface ISDIPasscodeInput {
    secret: string;
}




export class SDIPasscodeOutput implements ISDIPasscodeOutput {
    passcode: string;
    expires: string;

    static fromJS(data: any): ISDIPasscodeOutput {
        data = typeof data === 'object' ? data : {};
        let result = new SDIPasscodeOutput();
        result.init(data);
        return result;
    }

    constructor(data?: ISDIPasscodeOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.passcode = data['passcode'];
            this.expires = data['expires'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['passcode'] = this.passcode;
        data['expires'] = this.expires;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new SDIPasscodeOutput();
        result.init(json);
        return result;
    }
}

export interface ISDIPasscodeOutput {
    passcode: string;
    expires: string;
}






function throwException(message: string,
                        status: number,
                        response: string,
                        headers: { [key: string]: any; },
                        result?: any): Observable<any> {
    if (result !== null && result !== undefined) {
        return Observable.throw(result);
    } else {
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
    }
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }
}
