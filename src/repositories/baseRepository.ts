import type { IPoolProvider } from "@/intrastructure/poolProvider.ts";
import type { Pool } from "pg";

export class BaseRepository {
  protected pool: Pool;

  protected constructor(poolProvider: IPoolProvider) {
    this.pool = poolProvider.pool;
  }
}
