declare namespace ErrorModel {
  export interface RootObject {
    statusCode: number;
    error: string;
    message: string;
    attributes?: any;
  }
  export interface ErrorMessageObject {
    id: number;
    error: string;
    type: string;
    serviceUrl: string;
  }
}
