import {UserDataStore} from './UserDataStore';
import {IDataStoreOptions} from './IDataStoreOptions';

export class UserDataStoreOpts implements IDataStoreOptions<UserDataStore> {
  type = 'UserDataStore';
  path: string;
  defaults: UserDataStore;

  constructor() {
    this.defaults = new UserDataStore();
  }
}
