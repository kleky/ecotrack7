import {IVersionedData} from './datastore/IVersionedData';
import {IDataStoreOptions} from './datastore/IDataStoreOptions';
import { IStore } from './datastore/IStore';

const electron = require('electron');
const path = require('path');
const fs = (<any>window).require('fs');

export class FileStore<TData extends IVersionedData> implements IStore {
  private opts: IDataStoreOptions<TData>;
  private data: TData;

constructor(opts: IDataStoreOptions<TData>) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.opts = opts;
    this.opts.path = path.join(userDataPath, opts.type + '.json');
    console.log('Store output path: ' + this.opts.path);
    this.loadDataFile();
  }

  get(key: string) {
    return this.data[key];
  }

  set(key: string, val: any) {
    this.data[key] = val;
    fs.writeFileSync(this.opts.path, JSON.stringify(this.data));
  }

  private loadDataFile() {
    try {
      let data = <TData> JSON.parse(fs.readFileSync(this.opts.path));
      if (data.Version < this.opts.defaults.Version) {
        console.log('Old version [' + data.Version + '] of [' + this.opts.type + ']. New version is [' + this.data.Version + []);
        // todo - map across old data https://github.com/loedeman/AutoMapper
        data = this.opts.defaults;
      }
      this.data = data;
    } catch (error) {
      this.data = this.opts.defaults;
    }
  }
}
