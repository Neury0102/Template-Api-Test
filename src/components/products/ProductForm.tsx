'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Package, DollarSign, BarChart2, AlertCircle, Save, X, Wand2 } from 'lucide-react';
import { ProductFormData } from '@/types/api.types';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';

const categories = [
  { id: '1', name: 'Compresores' },
  { id: '2', name: 'Filtros' },
  { id: '3', name: 'Gases Refrigerantes' },
  { id: '4', name: 'Controles y Termostatos' },
  { id: '5', name: 'Válvulas' },
  { id: '6', name: 'Evaporadores' },
  { id: '7', name: 'Condensadores' },
  { id: '8', name: 'Tuberías y Accesorios' },
  { id: '9', name: 'Herramientas' },
  { id: '10', name: 'Repuestos Electrónicos' }
];

interface ProductFormProps {
    handleSubmit: UseFormHandleSubmit<ProductFormData>;
    onFinish: (values: ProductFormData) => void;
  formLoading: boolean;
    register: UseFormRegister<ProductFormData>;
    errors: FieldErrors<ProductFormData>;
  onCancel: () => void;
  isEditMode: boolean;
      setValue: UseFormSetValue<ProductFormData>;
}

const ProductForm = ({
  handleSubmit,
  onFinish,
  formLoading,
  register,
  errors,
  onCancel,
  isEditMode,
  setValue,
}: ProductFormProps) => {
  const tForm = useTranslations('productForm');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('validations');

  const handleGenerateCode = () => {
    const newCode = `SKU-${Date.now()}`;
    setValue('code', newCode);
  };

  return (
    <form onSubmit={handleSubmit(onFinish)} noValidate>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-12">
          {/* Product Info Section */}
          <div id="product-info">
            <div className="flex items-center gap-4 border-b pb-4 border-gray-200">
              <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center"><Package className="h-4 w-4 text-blue-600" /></div>
              <h2 className="text-xl font-semibold text-gray-900">{tForm('productInfo')}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="lg:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldName')}</label>
                <input type="text" id="name" {...register('name', { required: tValidation('productNameRequired') })} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} placeholder={tForm('fieldNamePlaceholder')} />
                {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldProductCode')}</label>
                <div className="flex gap-2">
                  <input type="text" id="code" {...register('code', { required: tValidation('productCodeRequired') })} className={`flex-grow px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.code ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} placeholder={tForm('fieldProductCodePlaceholder')} />
                  <button type="button" onClick={handleGenerateCode} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-semibold"><Wand2 className="h-4 w-4"/> {tForm('generateCode')}</button>
                </div>
                {errors.code && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.code.message}</p>}
              </div>
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldBrand')}</label>
                <input type="text" id="brand" {...register('brand')} className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder={tForm('fieldBrandPlaceholder')} />
              </div>
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldModel')}</label>
                <input type="text" id="model" {...register('model')} className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder={tForm('fieldModelPlaceholder')} />
              </div>
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldCategory')}</label>
                <select id="category_id" {...register('category_id', { required: tValidation('categoryRequired') })} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white ${errors.category_id ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
                  <option value="" disabled>{tForm('fieldCategoryPlaceholder')}</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                {errors.category_id && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.category_id.message}</p>}
              </div>
              <div className="lg:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldDescription')}</label>
                <textarea id="description" {...register('description')} rows={4} className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder={tForm('fieldDescriptionPlaceholder')}></textarea>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div id="pricing">
            <div className="flex items-center gap-4 border-b pb-4 border-gray-200">
              <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center"><DollarSign className="h-4 w-4 text-green-600" /></div>
              <h2 className="text-xl font-semibold text-gray-900">{tForm('pricing')}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="purchase_price" className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldPurchasePrice')}</label>
                <input type="number" id="purchase_price" {...register('purchase_price')} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.purchase_price ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} placeholder="0.00" step="0.01" />
                {errors.purchase_price && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.purchase_price.message}</p>}
              </div>
              <div>
                <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldSalePrice')}</label>
                <input type="number" id="sale_price" {...register('sale_price', { required: tValidation('salePriceInvalid'), valueAsNumber: true })} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.sale_price ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} placeholder="0.00" step="0.01" />
                {errors.sale_price && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.sale_price.message}</p>}
              </div>
            </div>
          </div>

          {/* Inventory Section */}
          <div id="inventory">
            <div className="flex items-center gap-4 border-b pb-4 border-gray-200">
              <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center"><BarChart2 className="h-4 w-4 text-yellow-600" /></div>
              <h2 className="text-xl font-semibold text-gray-900">{tForm('inventory')}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldStock')}</label>
                <input type="number" {...register('current_stock', { valueAsNumber: true })} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.current_stock ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} placeholder="0" />
                {errors.current_stock && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.current_stock.message}</p>}
                <p className="text-xs text-gray-500 mt-1">{tForm('stockHelpText')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{tForm('fieldMinStock')}</label>
                <input type="number" {...register('minimum_stock', { valueAsNumber: true })} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.minimum_stock ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} placeholder="0" />
                {errors.minimum_stock && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.minimum_stock.message}</p>}
                <p className="text-xs text-gray-500 mt-1">{tForm('minStockHelpText')}</p>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="active" {...register('active')} defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="active" className="text-sm font-medium text-gray-700">{tForm('fieldActive')}</label>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-8">{tForm('activeHelpText')}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button type="button" onClick={onCancel} className="px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2">
          <X className="h-5 w-5" />
          {tCommon('cancel')}
        </button>
        <button type="submit" disabled={formLoading} className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {formLoading ? (
            <><div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>{tCommon('saving')}</>
          ) : (
            <><Save className="h-5 w-5" />{tCommon('save')}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
