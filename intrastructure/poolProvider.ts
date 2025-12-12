import { getAppConfig } from "@/config.ts";
import { PrismaClient } from "@/src/generated/prisma/client.ts";
import { withAccelerate } from "@prisma/extension-accelerate";

export type AcceleratedPrismaClient = typeof PoolProvider.prototype.pool;

export interface IPoolProvider {
  get pool(): AcceleratedPrismaClient;
}

export class PoolProvider implements IPoolProvider {
  private static _instance: PoolProvider;
  private _pool: ReturnType<typeof this.createPrismaClient>;

  private constructor() {
    const { PrismaConnectionString } = getAppConfig();

    this._pool = this.createPrismaClient(PrismaConnectionString);
  }

  private createPrismaClient(accelerateUrl: string) {
    return new PrismaClient({ accelerateUrl }).$extends(withAccelerate());
  }

  static get instance(): PoolProvider {
    if (!PoolProvider._instance) {
      PoolProvider._instance = new PoolProvider();
    }

    return PoolProvider._instance;
  }

  get pool(): ReturnType<typeof this.createPrismaClient> {
    return this._pool;
  }
}
