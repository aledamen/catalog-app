export type ProductVariant = {
  sku: string;
  flavor?: string;
  size?: string;
  color?: string;
  stock: number;
  priceEffective: number;
  priceTransfer: number;
  priceList: number;
  image?: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  visible: boolean;
  variants: ProductVariant[];
};

export type CartItem = {
  productId: string;
  productName: string;
  brand: string;
  category: string;
  sku: string;
  variantLabel: string;
  priceEffective: number;
  priceTransfer: number;
  priceList: number;
  quantity: number;
  image: string;
};
