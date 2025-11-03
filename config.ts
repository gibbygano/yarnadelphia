export interface AppConfig {
  StripeSecret: string;
}

export function getAppConfig(): AppConfig {
  return <AppConfig> {
    StripeSecret: Deno.env.get("STRIPE_CLIENT_SECRET"),
  };
}
