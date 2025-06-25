import { NextResponse } from 'next/server';
import { Product } from '@/types/api.types';
import { readProducts, writeProducts } from '@/utils/api-helpers';

// GET a single product by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const products = await readProducts();
    const product = products.find(p => p.id === parseInt(params.id, 10));

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to read product:', error);
    return NextResponse.json({ message: 'Error reading product data' }, { status: 500 });
  }
}

// PATCH (update) a product by ID
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const products = await readProducts();
    
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Update the product data
    const updatedProduct = { 
      ...products[productIndex], 
      ...body, 
      last_updated: new Date().toISOString() 
    };
    products[productIndex] = updatedProduct;

    await writeProducts(products);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
  }
}

// DELETE a product by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const products = await readProducts();
    const filteredProducts = products.filter(p => p.id !== id);

    if (products.length === filteredProducts.length) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    await writeProducts(filteredProducts);

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
}
