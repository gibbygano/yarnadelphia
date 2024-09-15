import Checkout from "../islands/Checkout.tsx";
import { getAppConfig } from "../config.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Stripe } from "stripe";

const appConfig = getAppConfig();

export const handler: Handlers = {
    async GET(_req, ctx) {
        try {
            const stripe = new Stripe(appConfig.StripeSecretKey);
            const session = await stripe.checkout.sessions.create(
                {
                    ui_mode: "embedded",
                    line_items: [
                        {
                            price: "price_1PzPztCfRuXoql8wlFchlhEo",
                            quantity: 1,
                        },
                    ],
                    mode: "payment",
                    return_url:
                        `http://localhost:8080`,
                },
            );

            if (
                session?.client_secret !== undefined &&
                session?.client_secret !== null
            ) {
                const clientSecret = session.client_secret;
                const clientPublishableKey = appConfig.StripePublishableKey;
                return await ctx.render({ clientSecret, clientPublishableKey });
            }
            throw new Error("Could not access client secret for session.");
        } catch (error) {
            console.error(error.message, error.stack);
            return await ctx.renderNotFound();
        }
    },
};

export default function (
    props: PageProps<{ clientSecret: string; clientPublishableKey: string }>,
) {
    return (
        <Checkout
            clientSecret={props.data.clientSecret}
            clientPublishableKey={props.data.clientPublishableKey}
        />
    );
}
