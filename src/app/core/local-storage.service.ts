import { Injectable } from '@angular/core';

function createCookie(name: any, value: any, days: any) {
  let date: any, expires;

  if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name: any) {
  const nameEQ = name + '=',
    ca = document.cookie.split(';');
  let i, c;

  for (i = 0; i < ca.length; i++) {
    c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}
function setData(type: any, data: any) {
  // Convert data into JSON and encode to accommodate for special characters.
  data = encodeURIComponent(JSON.stringify(data));
  // Create cookie.
  if (type === 'session') {
    createCookie(getSessionName(), data, 365);
  } else {
    createCookie('localStorage', data, 365);
  }
}

function clearData(type: any) {
  if (type === 'session') {
    createCookie(getSessionName(), '', 365);
  } else {
    createCookie('localStorage', '', 365);
  }
}

function getData(type: any) {
  // Get cookie data.
  const data =
    type === 'session'
      ? readCookie(getSessionName())
      : readCookie('localStorage');
  // If we have some data decode, parse and return it.
  return data ? JSON.parse(decodeURIComponent(data)) : {};
}

function getSessionName() {
  // If there is no name for this window, set one.
  // To ensure it's unquie use the current timestamp.
  if (!window.name) {
    window.name = new Date().getTime().toString();
  }
  return 'sessionStorage' + window.name;
}

@Injectable()
export class LocalStorageService {
  localStorage: any;
  sessionStorage: any;
  constructor() {
    try {
      // Test webstorage existence.
      if (!window.localStorage || !window.sessionStorage) {
        throw new Error('exception');
      }
      // Test webstorage accessibility - Needed for Safari private browsing.
      window.localStorage.setItem('storage_test', '1');
      window.localStorage.removeItem('storage_test');
      this.localStorage = window.localStorage;
    } catch (e) {
      class CustomStorage {
        type: any;
        data: any;
        length = 0;
        constructor(type: any) {
          this.type = type;
          // Init data, if already present
          this.data = getData(type);
        }
        public clear() {
          this.data = {};
          this.length = 0;
          clearData(this.type);
        }
        public getItem(key: any) {
          return this.data[key] === undefined ? null : this.data[key];
        }
        public key(i: any) {
          // not perfect, but works
          let ctr = 0;
          for (const k in this.data) {
            if (ctr === i) {
              return k;
            } else {
              ctr++;
            }
          }
          return null;
        }
        public removeItem(key: any) {
          delete this.data[key];
          this.length--;
          setData(this.type, this.data);
        }
        public setItem(key: any, value: any) {
          this.data[key] = value + ''; // forces the value to a string
          this.length++;
          setData(this.type, this.data);
        }
      }

      // Replace window.localStorage and window.sessionStorage with out custom
      // implementation.

      const localStorage = new CustomStorage('local');
      const sessionStorage = new CustomStorage('session');
      Object.defineProperty(window, 'localStorage', {
        get: () => localStorage
      });
      this.localStorage = localStorage;
      this.sessionStorage = sessionStorage;
    }
  }
  public setItem(key: string, value: any) {
    return this.localStorage.setItem(key, value);
  }
  public getItem(key: string) {
    return this.localStorage.getItem(key);
  }
  public clearItem(key: string) {
    return this.localStorage.removeItem(key);
  }
  public clearAll() {
    return this.localStorage.clear();
  }
}
