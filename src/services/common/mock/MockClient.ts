import { IClient } from "../BaseService";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { CatMock } from "./cat/CatMock";
import { IMock } from "./IMock";
import { MemberMock } from "./member/MemberMock";

const MOCKS: IMock[] = [
    new MemberMock(),
    new CatMock()
];

export class MockResponse<T> implements IRestResponse<T> {
    constructor(
        public result: T | null,
        public statusCode: number
    ) {
    }
}

export class MockClient implements IClient {
    create<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
        for (let i = 0; i < MOCKS.length; i++) {
            let response: IRestResponse<T> | null = MOCKS[i].create<T>(resource, resources, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    del<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
        for (let i = 0; i < MOCKS.length; i++) {
            let response: IRestResponse<T> | null = MOCKS[i].del<T>(resource, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    get<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
        for (let i = 0; i < MOCKS.length; i++) {
            let response: IRestResponse<T> | null = MOCKS[i].get<T>(resource, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    getAll<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T[]>> {
        for (let i = 0; i < MOCKS.length; i++) {
            let response: IRestResponse<T[]> | null = MOCKS[i].getAll<T>(resource, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    options<T>(requestUrl: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
        for (let i = 0; i < MOCKS.length; i++) {
            let response: IRestResponse<T> | null = MOCKS[i].options<T>(requestUrl, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    update<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
        for (let i = 0; i < MOCKS.length; i++) {
            let response: IRestResponse<T> | null = MOCKS[i].update<T>(resource, resources, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }
}