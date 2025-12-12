import type {
  AcceleratedPrismaClient,
  IPoolProvider,
} from "@/intrastructure/poolProvider.ts";

export class BaseRepository {
  protected pool: AcceleratedPrismaClient;

  protected constructor(poolProvider: IPoolProvider) {
    this.pool = poolProvider.pool;
  }
}
