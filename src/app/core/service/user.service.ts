import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@app/core/class/baseAPI.class';

@Injectable()
export class UserService extends BaseAPIClass {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/user';
  }
}
