'use client';

import React, { useState } from 'react';
import { useTable, useDelete } from '@refinedev/core';
import { Search, Package, AlertTriangle, TrendingUp, PlusCircle, Edit, Trash2, Eye, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import { Product } from '@/types/api.types';

const ProductsView = () => {
  const locale = useLocale();
  const t = useTranslations('products');
  const tCommon = useTranslations('common');

  const { tableQueryResult, setFilters, setCurrent, pageCount, current } = useTable<Product>({
    resource: 'products',
    syncWithLocation: true,
    pagination: { pageSize: 10 },
  });

  const { mutate: deleteProduct } = useDelete<Product>();

  const products = tableQueryResult.data?.data || [];
  const totalProducts = tableQueryResult.data?.total || 0;
  const isLoading = tableQueryResult.isLoading;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm(t('deleteConfirmation'))) {
      deleteProduct({ resource: 'products', id });
    }
  };

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) return 'outOfStock';
    if (current <= minimum) return 'critical';
    if (current <= minimum * 1.5) return 'warning';
    return 'good';
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'good': return 'text-green-600 bg-green-100';
      case 'outOfStock': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const categories = [
    'Compresores', 'Filtros', 'Gases', 'Controles', 'Válvulas'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        <ProductDetailModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{t('productsManagement')}</h1>
          <p className="text-gray-500 mt-1">{t('manageYourInventory')}</p>
        </div>

        {/* Summary Cards - Can be connected to a separate API endpoint later */}
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                onChange={(e) => setFilters([{ field: 'q', operator: 'contains', value: e.target.value }])}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select 
                onChange={(e) => setFilters([{ field: 'category', operator: 'eq', value: e.target.value || undefined }])}
                className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          <div>
            <Link href={`/${locale}/dashboard/products/new`} className="inline-flex items-center justify-center bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <PlusCircle className="h-5 w-5 mr-2" />
              {t('createProduct')}
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6 font-bold">{t('table.code')}</th>
                <th scope="col" className="py-3 px-6 font-bold">{t('table.product')}</th>
                <th scope="col" className="py-3 px-6 font-bold">{t('table.category')}</th>
                <th scope="col" className="py-3 px-6 font-bold">{t('table.brandModel')}</th>
                <th scope="col" className="py-3 px-6 text-right font-bold">{t('table.price')}</th>
                <th scope="col" className="py-3 px-6 text-center font-bold">{t('table.stock')}</th>
                <th scope="col" className="py-3 px-6 text-center font-bold">{tCommon('status')}</th>
                <th scope="col" className="py-3 px-6 text-center font-bold">{t('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={8} className="text-center py-12">Loading...</td></tr>
              ) : products.length > 0 ? (
                products.map(product => {
                  const stockStatus = getStockStatus(product.current_stock, product.minimum_stock);
                  return (
                    <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="py-4 px-6 font-mono text-gray-900">{product.code}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{product.name}</span>
                          <span className="text-sm text-gray-500">{product.description}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{product.brand}</span>
                          <span className="text-sm text-gray-500">{product.model}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-semibold">${product.sale_price.toFixed(2)}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{product.current_stock}</span>
                          <span className="text-sm text-gray-500">{tCommon('minStockShort')} {product.minimum_stock}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockColor(stockStatus)}`}>
                          {t(`stockLevels.${stockStatus}`)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleViewDetails(product)} className="p-1 text-gray-400 hover:text-blue-600 transition-colors"><Eye className="h-4 w-4" /></button>
                          <Link href={`/${locale}/dashboard/products/${product.id}/edit`} className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"><Edit className="h-4 w-4" /></Link>
                          <button onClick={() => handleDelete(product.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8}>
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">{t('noProductsFound')}</p>
                      <p className="text-gray-400">{t('tryAdjustingFilters')}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <span>{t('showingProducts', { count: products.length, total: totalProducts })}</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrent(current - 1)} 
              disabled={current === 1}
              className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span>Page {current} of {pageCount}</span>
            <button 
              onClick={() => setCurrent(current + 1)} 
              disabled={current === pageCount}
              className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
