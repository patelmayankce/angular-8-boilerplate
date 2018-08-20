import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ErrorMessageService {
  private _errors: ErrorModel.ErrorMessageObject[] = [];
  public errors$ = new EventEmitter<ErrorModel.ErrorMessageObject[]>();

  constructor() {}

  get errors(): ErrorModel.ErrorMessageObject[] {
    return this._errors;
  }

  public set(error: string, type: string, serviceUrl: string) {
    this._errors.push({
      id: Date.now(),
      error: error,
      type: type,
      serviceUrl: serviceUrl
    });
    console.log(this._errors);
    this.errors$.emit(this._errors);
  }

  public clear() {
    this._errors = [];
    this.errors$.emit(this._errors);
  }
}
