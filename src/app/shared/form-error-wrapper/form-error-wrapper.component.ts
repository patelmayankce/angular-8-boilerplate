import {
  Component,
  Input,
  OnChanges,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { ERROR_OBJECTS, ErrorMessageService } from '@app/core';

@Component({
  selector: 'app-form-error-wrapper',
  templateUrl: './form-error-wrapper.component.html'
})
export class FormErrorWrapperComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public control: any;
  @Input()
  public controlName: string;
  @Input()
  public apiErrorType?: string;
  // TODO : How to pass apiServiceUrl
  @Input()
  public apiServiceUrl?: string;

  public errorObject: Object = ERROR_OBJECTS;
  public errorKeys: string[];
  public apiErrorMessage: string;

  constructor(private errorMessageService: ErrorMessageService) {
    errorMessageService.errors$.subscribe(
      (errors: ErrorModel.ErrorMessageObject[]) => {
        errors
          .filter(
            e => e.type === this.apiErrorType
            //  && e.serviceUrl == this.apiServiceUrl
          )
          .map(e => {
            this.apiErrorMessage = e.error;
          });
      }
    );
  }

  ngOnInit() {}

  ngOnChanges() {
    this.errorKeys = Object.keys(this.errorObject);
  }

  ngAfterViewInit() {
    this.control.valueChanges.subscribe(() => {
      this.apiErrorMessage = '';
    });
  }

  formateError(errorMessage: string, errorObj: any): string {
    const types = ['min', 'max', 'requiredLength'];

    types.forEach(type => {
      if (!!errorObj[type]) {
        errorMessage = errorMessage.replace(/{{value}}/g, errorObj[type]);
      }
    });
    return errorMessage.replace(/{{field}}/g, this.controlName);
  }

  hasError() {
    return (
      (this.control.errors && this.control.touched) || this.apiErrorMessage
    );
  }
}
