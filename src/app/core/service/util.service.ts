import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  constructor() {}

  removeEmpty(obj: any): any {
    for (const propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === '' ||
        (Array.isArray(obj[propName]) && !obj[propName].length)
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }

  copyToClipboard(value: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
