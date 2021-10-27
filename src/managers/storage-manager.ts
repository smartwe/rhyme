import Store from 'electron-store';

export type StoreItem = object | null | string | number | object[] | string[] | number[];

class StorageManager {
  store: Store;
  constructor() {
    this.store = new Store();
  }

  get(key: string): StoreItem {
    if (!this.has(key)) return null;
    return this.store.get(key) as StoreItem;
  }

  set(key: string, value: StoreItem) {
    this.store.set(key, value);
    console.log(`${key} had been set to`, value);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }
}

export default new StorageManager();
