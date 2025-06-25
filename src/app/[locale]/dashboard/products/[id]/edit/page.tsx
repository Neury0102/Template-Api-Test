'use client';

import React from 'react';
import { useForm } from '@refinedev/react-hook-form';
import { BaseRecord, HttpError } from '@refinedev/core';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { ArrowLeft, Package } from 'lucide-react';
import ProductForm from '@/components/products/ProductForm';
import { ProductFormData } from '@/types/api.types';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

const EditProductPage = ({ params }: EditProductPageProps) => {
  const router = useRouter();
  const tProducts = useTranslations('products');
  const tCommon = useTranslations('common');

  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, ProductFormData>({
    refineCoreProps: {
      resource: 'products',
      action: 'edit',
      id: params.id,
      redirect: false,
      onMutationSuccess: () => {
        router.push('/dashboard/products');
      },
    },
  });

  const handleBack = () => {
    router.push('/dashboard/products');
  };

  if (queryResult?.isLoading) {
    return <div>Loading...</div>;
  }

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
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{tProducts('editProductTitle')}</h1>
              <p className="text-sm text-gray-500">{queryResult?.data?.data.name || ''}</p>
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
          isEditMode={true}
          setValue={setValue}
        />
      </div>
    </div>
  );
};

export default EditProductPage;
