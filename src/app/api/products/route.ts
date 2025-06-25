import { NextResponse } from 'next/server';
import { Product, ProductFormData } from '@/types/api.types';
import { readProducts, writeProducts } from '@/utils/api-helpers';

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to read products:', error);
    return NextResponse.json({ message: 'Error reading products data' }, { status: 500 });
  }
}

const categories = [
  { id: '1', name: 'Compresores' },
  { id: '2', name: 'Filtros' },
  { id: '3', name: 'Gases' },
  { id: '4', name: 'Controles' },
  { id: '5', name: 'Válvulas' },
  { id: '6', name: 'Refrigeración' },
  { id: '7', name: 'Electricidad' },
  { id: '8', name: 'Herramientas' },
  { id: '9', name: 'Tuberías' },
];

export async function POST(request: Request) {
  try {
    const newProductData: ProductFormData = await request.json();

    if (!newProductData || !newProductData.name || !newProductData.code) {
        return NextResponse.json({ message: 'Invalid product data' }, { status: 400 });
    }

    const products = await readProducts();
    
    const category = categories.find(c => c.id === newProductData.category_id);

    const newProduct: Product = {
      ...newProductData,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      last_updated: new Date().toISOString(),
      category: category ? category.name : 'Unknown',
    };

    products.push(newProduct);
    await writeProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
  }
}
