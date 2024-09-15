export interface AppConfig {
    StripeSecretKey: string;
    StripePublishableKey: string;
}

export function getAppConfig(): AppConfig {
    return <AppConfig> {
        StripeSecretKey: Deno.env.get("STRIPE_SK"),
        StripePublishableKey: Deno.env.get("STRIPE_PK"),
    };
}
