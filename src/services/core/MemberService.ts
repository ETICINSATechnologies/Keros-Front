import { IRestResponse } from 'typed-rest-client/RestClient';
import { Member } from '../../models/core/Member';
import { BaseService } from '../common/BaseService';
import { Page } from '../../models/core/Page';
import { MemberCreateRequest } from '../../models/core/MemberCreateRequest';
import * as winston from 'winston';

export class MemberService extends BaseService {
  static getMember(id: number, callback: (err: any, result: Member | null) => void): void {
    this.rest.get<Member>('core/member/' + id, this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug('Response : ' + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getConnectedMember(callback: (err: any, result: Member | null) => void): void {
    this.rest.get<Member>('core/member/me', this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug('Response : ' + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllMembers(callback: (err: any, result: Page<Member> | null) => void, queryParams?: any): void {
    let queryString = "";
    if(queryParams && Object.keys(queryParams).length !== 0) {
      let paramTuples: any[] = [];
      for (const key in queryParams) {
        const value = queryParams[key];
        paramTuples.push([key, value].join("="));
      }
      queryString = "?" + paramTuples.join("&");
    }

    this.rest.get<Page<Member>>('core/member' + queryString, this.defaultHeaders()).then(
      (res: IRestResponse<Page<Member>>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug('Response : ' + JSON.stringify(res));
        let totalPages = 1;
        if (res.result && res.result.meta && res.result.meta.totalPages) {
          totalPages = res.result.meta.totalPages;
        }
        if (totalPages !== 1) {
          let pageCount = 1;
          while (totalPages - pageCount !== 0) {
            this.rest.get<Page<Member>>("core/member?pageNumber=" + pageCount + queryString, this.defaultHeaders()).then(
              (resu: IRestResponse<Page<Member>>) => {
                if (resu.statusCode !== 200) {
                  return callback(this.defaultError(resu.statusCode), null);
                }
                winston.debug('Response for page ' + pageCount + ' : ' + JSON.stringify(resu));
                if (res.result && res.result.content &&  resu.result && resu.result.content) {
                  res.result.content = res.result.content.concat(resu.result.content);
                  callback(null, res.result);
                }
              }).catch(e => callback(e, null)
            );
            pageCount += 1;
          }
        } else {
          callback(null, res.result);
        }
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static createMember(memberRequest: MemberCreateRequest, callback: (err: any, result: Member | null) => void): void {
    this.rest.create<Member>('core/member', memberRequest, this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 201) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug('Response : ' + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  // TODO why doesn't this return member ?
  static update(memberId: number, memberRequest: MemberCreateRequest, callback: (err: any, result: Member | null) => void): void {
    this.rest.update<Member>('core/member/' + memberId, memberRequest, this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug('Response : ' + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static delete(memberId: number, callback: (err: any) => void): void {
    this.rest.del<Member>('core/member/' + memberId, this.defaultHeaders()).then(
      (res: IRestResponse<Member>) => {
        if (res.statusCode !== 204) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug('Response : ' + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }
}