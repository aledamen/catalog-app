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
  promoPrice?: number;
  promoLabel?: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  visible: boolean;
  salesCount: number;
  variants: ProductVariant[];
  description?: string;
  badge?: string;
  featured?: boolean;
  bannerName?: string;
  bannerColor?: string;
  bannerTextColor?: string;
  bannerPosition?: string;
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
  stock: number;
  quantity: number;
  image: string;
};
