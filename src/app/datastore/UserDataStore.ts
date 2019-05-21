import {FuelLog} from '../types/FuelLog';
import {IVersionedData} from './IVersionedData';

export class UserDataStore implements IVersionedData {
  public Version = 0.3;
  public fuelLog: FuelLog;

  constructor() {
    this.fuelLog = new FuelLog();
  }
}
