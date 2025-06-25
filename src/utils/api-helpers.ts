import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/types/api.types';

const getProductsFilePath = () => {
  return path.join(process.cwd(), 'src', 'data', 'products.json');
};

export const readProducts = async (): Promise<Product[]> => {
  try {
    const filePath = getProductsFilePath();
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // Si el archivo no existe, crearlo con un array vacío
      await writeProducts([]);
      return [];
    }
    throw error;
  }
};

export const writeProducts = async (products: Product[]) => {
  const filePath = getProductsFilePath();
  // Asegurarse de que el directorio exista
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
};
