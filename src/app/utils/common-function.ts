import { Observable } from 'rxjs';

export const CommonFunction = {

  transObjectKeysPipe (pattern: {[key: string]: string}) {
    let transObjectKeys = this.transObjectKeys;
    return (source: Observable<any>) =>
      new Observable(observer => {
        return source.subscribe({
          next(x) {
            observer.next(
              transObjectKeys(x, pattern)
            );
          },
          error(err) { observer.error(err); },
          complete() { observer.complete(); }
        });
      });
  },

  transObjectKeys (json: Object, pattern: {[key: string]: string}) {
    if (Array.isArray(json)) {
      return json.map(obj => {
        for (let key in obj) {
          if (key in Object(pattern)) {

            obj[pattern[key]] = obj[key];
            delete obj[key];
          }
        }
        return obj;
      })
    }

    if (json !== null && typeof json === 'object') {
      for (let key in json) {
        if (key in Object(pattern)) {

          json[pattern[key]] = json[key];
          delete json[key];
        }
      }
      return json;
    }
  },

  filterObjectKeys (object: Object, ...keyArray: Array <string>) {
    let opObject = {};
    for (let key in object) {
      if (keyArray.includes(key)) {
        opObject[key] = object[key];
      }
    }
    return opObject;
  }
}
