export interface Product {
  id: number;
  name: string;
  nameHi: string;
  category: string;
  categoryHi: string;
  ageGroup: string;
  ageGroupHi: string;
  price: number;
  mrp: number;
  badge: string;
  badgeColor: string;
  image: string;
  images: string[];
  specs: Record<string, string>;
  specsHi: Record<string, string>;
  description: string;
  descriptionHi: string;
  colors: string[];
  inStock: boolean;
  warranty: string;
  maxWeight: string;
  frameSize: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export type Language = 'en' | 'hi';
export type DeliveryOption = 'pickup' | 'delivery';

export interface CheckoutForm {
  name: string;
  mobile: string;
  location: string;
  paymentMethod: string;
  deliveryOption: DeliveryOption;
}
