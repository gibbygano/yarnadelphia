import "@std/dotenv/load";

export interface AppConfig {
  StripeSecret: string;
  PrismaConnectionString: string;
}

export function getAppConfig(): AppConfig {
  return <AppConfig> {
    StripeSecret: Deno.env.get("STRIPE_CLIENT_SECRET"),
    PrismaConnectionString: Deno.env.get("DATABASE_URL"),
  };
}
