import { CheckoutForm } from "@/components/checkout-form";

export const metadata = {
  title: "Checkout"
};

export default function CheckoutPage() {
  return (
    <section className="container-shell py-10 sm:py-14">
      <CheckoutForm />
    </section>
  );
}
