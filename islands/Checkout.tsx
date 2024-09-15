import { useEffect } from "preact/hooks";
import { loadStripe } from "@stripe";

export default (
    { clientSecret, clientPublishableKey }: {
        clientSecret: string;
        clientPublishableKey: string;
    },
) => {
    useEffect(() => {
        loadStripe(clientPublishableKey)
            .then((s) => s?.initEmbeddedCheckout({ clientSecret }))
            .then((c) => c?.mount("#checkout"))
            .catch((e) => console.error(e, e.message));
    }, [clientSecret]);

    return <div class="flex flex-col items-center p-10" id="checkout"></div>;
};
