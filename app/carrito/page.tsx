import { CartPageContent } from "@/components/cart-page-content";

export const metadata = {
  title: "Carrito"
};

export default function CartPage() {
  return (
    <section className="container-shell py-10 sm:py-14">
      <CartPageContent />
    </section>
  );
}
