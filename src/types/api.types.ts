import { FieldValues } from 'react-hook-form';

export interface ProductFormData extends FieldValues {
  code: string;
  name: string;
  description: string;
  category_id: string;
  sale_price: number;
  purchase_price: number;
  current_stock: number;
  minimum_stock: number;
  brand: string;
  model: string;
  active: boolean;
}

export type FormErrors = {
  [K in keyof ProductFormData]?: string;
};

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  category: string;
  purchase_price: number;
  sale_price: number;
  current_stock: number;
  minimum_stock: number;
  brand: string;
  model: string;
  last_updated: string;
  active: boolean;
}
