import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { MockResponse } from "../MockClient";
import { Cat } from "../../../../models/cat/Cat";
import { IMock } from "../IMock";

export class CatMock implements IMock {
    create<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
        let mockObj: T | null = null;
        let status: number = 500;
        switch (resource) {
            case "cat":
                mockObj = <T> new Cat(1, "tom", 7.42);
                status = 200;
                return new MockResponse(mockObj, status);
        }
        return null;
    }

    get<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
        let mockObj: T | null = null;
        let status: number = 500;
        switch (resource) {
            case "cat/1":
                mockObj = <T> new Cat(1, "tom", 7.42);
                status = 200;
                return new MockResponse(mockObj, status);
            case "cat/2":
                mockObj = <T> new Cat(1, "tom", 7.42);
                status = 200;
                return new MockResponse(mockObj, status);
        }
        return null;
    }

    getAll<T>(resource: string, options?: IRequestOptions): IRestResponse<T[]> | null {
        let mockObj: T[] | null = null;
        let status: number = 500;
        switch (resource) {
            case "cat":
                mockObj = <T[]> [new Cat(1, "tom", 7.42), new Cat(2, "john", 5.4)];
                status = 200;
                return new MockResponse(mockObj, status);
        }
        return null;
    }

    del<T>(resource: string, options?: IRequestOptions): IRestResponse<T> | null {
        return null;
    }

    options<T>(requestUrl: string, options?: IRequestOptions): IRestResponse<T> | null {
        return null;
    }

    update<T>(resource: string, resources: any, options?: IRequestOptions): IRestResponse<T> | null {
        return null;
    }
}