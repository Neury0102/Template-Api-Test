'use client';

import React from 'react';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Package } from 'lucide-react';
import ProductForm from '@/components/products/ProductForm';
import { ProductFormData } from '@/types/api.types';
import { useForm } from '@refinedev/react-hook-form';
import { BaseRecord, HttpError } from '@refinedev/core';

const NewProductPage = () => {
  const router = useRouter();
  const tProducts = useTranslations('products');
  const tCommon = useTranslations('common');

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, ProductFormData>({
    refineCoreProps: {
      resource: 'products',
      action: 'create',
      redirect: false,
      onMutationSuccess: () => {
        router.push('/dashboard/products');
      },
    },
  });

  const handleBack = () => {
    router.push('/dashboard/products');
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={tCommon('back')}
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{tProducts('newProductTitle')}</h1>
              <p className="text-sm text-gray-500">{tProducts('newProductSubtitle')}</p>
            </div>
          </div>
        </div>

        <ProductForm
          handleSubmit={handleSubmit}
          onFinish={onFinish}
          formLoading={formLoading}
          register={register}
          errors={errors}
          onCancel={handleBack}
          isEditMode={false}
          setValue={setValue}
        />
      </div>
    </div>
  );
};

export default NewProductPage;
