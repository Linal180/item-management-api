export interface Product {
  id: string;
  name: string;
  price: number;
  type: "product";
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  type: "service";
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  type: "subscription";
}

export type Item = Product | Service | Subscription;
