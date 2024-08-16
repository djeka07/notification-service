/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.14.7.0 (NJsonSchema v10.5.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export class ClientBase {
  protected transformOptions(incomingOptions: AxiosRequestConfig) {
    const instanceOptionHeaders = this['instance']?.defaults?.headers || {};

    let options = <AxiosRequestConfig>{
      ...(incomingOptions || {}),
      baseUrl: incomingOptions.baseURL || '',
      headers: {
        ...instanceOptionHeaders,
        'Cache-Control': 'max-age=0, no-cache',
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...(incomingOptions.headers || {}),
      },
      transformResponse: (data: any) => data,
    };

    if (instanceOptionHeaders?.accessToken) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          'Ocp-Apim-Subscription-Key': `${instanceOptionHeaders?.accessToken}`,
        },
      };
    }

    if (instanceOptionHeaders?.authorization) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `${instanceOptionHeaders?.authorization}`,
        },
      };
    }

    return Promise.resolve(options);
  }

  protected transformResult(
    url: string,
    response: AxiosResponse,
    processor: (response: AxiosResponse) => any,
  ) {
    const { config } = response;
    try {
      return processor(response);
    } catch (error) {
      throw error;
    }
  }
}

export interface IConversationControllerClient {
    createConversation(body: CreateConversationRequest): Promise<ConversationResponse>;
    getUserConversations(page: number, take: number): Promise<ConversationsResponse>;
    getConversationFromUsers(userIds: string[]): Promise<ConversationResponse>;
    getConversation(id: string): Promise<ConversationResponse>;
    getConversationMessages(id: string, page: number, take: number): Promise<MessagesResponse>;
    createMessage(id: string, body: CreateMessageRequest): Promise<MessageReponse>;
    getConversationUsers(id: string): Promise<ConversationUserResponse>;
    readMessages(id: string, body: CreateMessageRequest): Promise<MessageReponse>;
}

export class ConversationControllerClient extends ClientBase implements IConversationControllerClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        super();
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:3000";
    }

    createConversation(body: CreateConversationRequest , cancelToken?: CancelToken | undefined): Promise<ConversationResponse> {
        let url_ = this.baseUrl + "/api/v1/conversations";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.transformResult(url_, _response, (_response: AxiosResponse) => this.processCreateConversation(_response));
        });
    }

    protected processCreateConversation(response: AxiosResponse): Promise<ConversationResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<ConversationResponse>(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ConversationResponse>(<any>null);
    }

    getUserConversations(page: number, take: number , cancelToken?: CancelToken | undefined): Promise<ConversationsResponse> {
        let url_ = this.baseUrl + "/api/v1/conversations?";
        if (page === undefined || page === null)
            throw new Error("The parameter 'page' must be defined and cannot be null.");
        else
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (take === undefined || take === null)
            throw new Error("The parameter 'take' must be defined and cannot be null.");
        else
            url_ += "take=" + encodeURIComponent("" + take) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.transformResult(url_, _response, (_response: AxiosResponse) => this.processGetUserConversations(_response));
        });
    }

    protected processGetUserConversations(response: AxiosResponse): Promise<ConversationsResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<ConversationsResponse>(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ConversationsResponse>(<any>null);
    }

    getConversationFromUsers(userIds: string[] , cancelToken?: CancelToken | undefined): Promise<ConversationResponse> {
        let url_ = this.baseUrl + "/api/v1/conversations/users?";
        if (userIds === undefined || userIds === null)
            throw new Error("The parameter 'userIds' must be defined and cannot be null.");
        else
            userIds && userIds.forEach(item => { url_ += "userIds=" + encodeURIComponent("" + item) + "&"; });
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.transformResult(url_, _response, (_response: AxiosResponse) => this.processGetConversationFromUsers(_response));
        });
    }

    protected processGetConversationFromUsers(response: AxiosResponse): Promise<ConversationResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<ConversationResponse>(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ConversationResponse>(<any>null);
    }

    getConversation(id: string , cancelToken?: CancelToken | undefined): Promise<ConversationResponse> {
        let url_ = this.baseUrl + "/api/v1/conversations/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.transformResult(url_, _response, (_response: AxiosResponse) => this.processGetConversation(_response));
        });
    }

    protected processGetConversation(response: AxiosResponse): Promise<ConversationResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<ConversationResponse>(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ConversationResponse>(<any>null);
    }

    getConversationMessages(id: string, page: number, take: number , cancelToken?: CancelToken | undefined): Promise<MessagesResponse> {
        let url_ = this.baseUrl + "/api/v1/conversations/{id}/messages?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (page === undefined || page === null)
            throw new Error("The parameter 'page' must be defined and cannot be null.");
        else
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (take === undefined || take === null)
            throw new Error("The parameter 'take' must be defined and cannot be null.");
        else
            url_ += "take=" + encodeURIComponent("" + take) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.transformResult(url_, _response, (_response: AxiosResponse) => this.processGetConversationMessages(_response));
        });
    }

    protected processGetConversationMessages(response: AxiosResponse): Promise<MessagesResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<MessagesResponse>(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<MessagesResponse>(<any>null);
    }

    createMessage(id: string, body: CreateMessageRequest , cancelToken?: CancelToken | undefined): Promise<MessageReponse> {
        let url_ = this.baseUrl + "/api/v1/conversations/{id}/messages";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.transformResult(url_, _response, (_response: AxiosResponse) => this.processCreateMessage(_response));
        });
    }

    protected processCreateMessage(response: AxiosResponse): Promise<MessageReponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<MessageReponse>(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<MessageReponse>(<any>null);
    }

    getConversationUsers(id: string , cancelToken?: CancelToken | undefined): Promise<ConversationUserResponse> {
        let url_ = this.baseUrl + "/api/v1/conversations/{id}/users";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.transformResult(url_, _response, (_response: AxiosResponse) => this.processGetConversationUsers(_response));
        });
    }

    protected processGetConversationUsers(response: AxiosResponse): Promise<ConversationUserResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<ConversationUserResponse>(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ConversationUserResponse>(<any>null);
    }

    readMessages(id: string, body: CreateMessageRequest , cancelToken?: CancelToken | undefined): Promise<MessageReponse> {
        let url_ = this.baseUrl + "/api/v1/conversations/{id}/messages/read";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "PUT",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.instance.request(transformedOptions_);
        }).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.transformResult(url_, _response, (_response: AxiosResponse) => this.processReadMessages(_response));
        });
    }

    protected processReadMessages(response: AxiosResponse): Promise<MessageReponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<MessageReponse>(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<MessageReponse>(<any>null);
    }
}

export interface ChatUserResponse {
    userId: string;
    id: string;
    username: string;
    name: string;
    issued: number;
}

export interface CreateConversationRequest {
    userIds: string[];
}

export interface ConversionMessageResponse {
    messageId: string;
    message: string;
    createdAt: string;
    from: string;
}

export interface UserResponse {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ConversationResponse {
    conversationId: string;
    name?: string;
    isGroup: boolean;
    createdAt: string;
    lastMessage?: ConversionMessageResponse;
    users: UserResponse[];
}

export interface ConversationsResponse {
    total: number;
    hasNextPage: boolean;
    page: number;
    take: number;
    items: ConversationResponse[];
}

export interface MessageUser {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserReadMessageResponse {
    user: MessageUser;
    readAt: string;
}

export interface MessageReponse {
    messageId: string;
    conversationId: string;
    from: MessageUser;
    message: string;
    createdAt: string;
    readBy: UserReadMessageResponse[];
}

export interface MessagesResponse {
    items: MessageReponse[];
    page: number;
    take: number;
    total: number;
    hasNextPage: boolean;
}

export interface ConversationUserResponse {
    users: UserResponse[];
}

export interface CreateMessageRequest {
    message: string;
}

export interface MessageCreatedEvent {
    message: MessageReponse;
    to: string[];
}

export interface MessageReadEvent {
    messages: MessageReponse[];
    to: string[];
    from: string;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}

// @ts-nocheck