import { Pool } from "pg";

export interface IPoolProvider {
  get pool(): Pool;
}

class PoolProvider implements IPoolProvider {
  private static _instance: PoolProvider;
  private _pool: Pool;

  private constructor() {
    this._pool = new Pool();
  }

  static get instance(): PoolProvider {
    if (!PoolProvider._instance) {
      PoolProvider._instance = new PoolProvider();
    }

    return PoolProvider._instance;
  }

  get pool(): Pool {
    return this._pool;
  }
}

export { PoolProvider };
