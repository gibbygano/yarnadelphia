import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { signal } from "@preact/signals";

export default define.page(function Home() {
  const stripe = useStripe();
  const elements = useElements();
  const errorMsg = signal<string | null | undefined>();

  const stripePromise = loadStripe()

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <Head>
        <title>yarnadelphia</title>
      </Head>
    </div>
  );
});
