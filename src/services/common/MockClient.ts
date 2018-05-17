import { IClient } from "./BaseService";
import { IRestResponse, IRequestOptions } from "typed-rest-client/RestClient";
import { Cat } from "../../models/cat/Cat";

export class MockResponse<T> implements IRestResponse<T> {
  constructor(
    public result: T | null,
    public statusCode: number
  ){}
}

export class MockClient implements IClient {
  create<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "cat":
        mockObj = <T> new Cat(1, "tom", 7.42);
        status = 200;
        break;
    }
    return Promise.resolve(new MockResponse(mockObj, status));
  }

  // TODO implement when real delete is used
  del<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
    return Promise.resolve(new MockResponse(null, 500));
  }

  get<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
    let mockObj: T | null = null;
    let status: number = 500;
    switch (resource) {
      case "cat/1":
        mockObj = <T> new Cat(1, "tom", 7.42);
        status = 200;
        break;
      case "cat/2":
        mockObj = <T> new Cat(1, "tom", 7.42);
        status = 200;
        break;
    }
    return Promise.resolve(new MockResponse(mockObj, status));
  }

  getAll<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T[]>> {
    let mockObj: T[] | null = null;
    let status: number = 500;
    switch (resource) {
      case "cat":
        mockObj = <T[]> [new Cat(1, "tom", 7.42), new Cat(2, "john", 5.4)];
        status = 200;
        break;
    }
    return Promise.resolve(new MockResponse(mockObj, status));
  }

  // TODO implement when real options is used
  options<T>(requestUrl: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
    return Promise.resolve(new MockResponse(null, 500));
  }

  // TODO implement when real update is used
  update<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
    return Promise.resolve(new MockResponse(null, 500));
  }
}
