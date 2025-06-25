import React from 'react';
import { X, Edit, Trash2, Package, DollarSign, Boxes, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Product } from '@/types/api.types';
import { useTranslations } from 'next-intl';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, product }) => {
  const t = useTranslations('products');

  if (!isOpen || !product) {
    return null;
  }

  const handleEdit = () => {
    onClose();
    // Lógica para editar
  };

  const handleDelete = () => {
    if (window.confirm(t('deleteConfirmation'))) {
      onClose();
      // Lógica para eliminar
    }
  };

  const getStockStatus = () => {
    if (product.current_stock <= product.minimum_stock) return 'critical';
    if (product.current_stock <= product.minimum_stock * 1.5) return 'warning';
    return 'good';
  };

  const getStockStatusColor = () => {
    const status = getStockStatus();
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStockStatusText = () => {
    const status = getStockStatus();
    switch (status) {
      case 'critical': return t('stockLevels.critical');
      case 'warning': return t('stockLevels.warning');
      case 'good': return t('stockLevels.good');
      default: return t('stockLevels.outOfStock');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const profitMargin = ((product.sale_price - product.purchase_price) / product.purchase_price * 100).toFixed(1);
  const stockValue = product.current_stock * product.sale_price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-500">{t('code')}: {product.code}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleEdit} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
              <Edit className="h-4 w-4" />
              {t('edit')}
            </button>
            <button onClick={handleDelete} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm">
              <Trash2 className="h-4 w-4" />
              {t('delete')}
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    {t('productInfo')}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{t('category')}</label>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{t('status')}</label>
                      <div className="flex items-center gap-1">
                        {product.active ? (
                          <><CheckCircle className="h-3 w-3 text-green-600" /><span className="text-green-600 text-sm font-medium">{t('active')}</span></>
                        ) : (
                          <><X className="h-3 w-3 text-gray-400" /><span className="text-gray-400 text-sm font-medium">{t('inactive')}</span></>
                        )}
                      </div>
                    </div>
                  </div>
                  {product.description && (
                    <div className="mt-4">
                      <label className="block text-xs font-medium text-gray-500 mb-1">{t('description')}</label>
                      <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                    </div>
                  )}
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{t('brand')}</label>
                      <p className="text-sm font-medium text-gray-900">{product.brand}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{t('model')}</label>
                      <p className="text-sm font-mono text-gray-900">{product.model}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    {t('pricingInfo')}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <label className="block text-xs font-medium text-gray-500 mb-1">{t('purchasePrice')}</label>
                      <p className="text-lg font-bold text-gray-900">${product.purchase_price.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <label className="block text-xs font-medium text-gray-500 mb-1">{t('salePrice')}</label>
                      <p className="text-lg font-bold text-green-600">${product.sale_price.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <label className="block text-xs font-medium text-gray-500 mb-1">{t('margin')}</label>
                      <p className="text-lg font-bold text-blue-600">{profitMargin}%</p>
                      <p className="text-xs text-gray-500">${(product.sale_price - product.purchase_price).toFixed(2)}/{t('unitAbbreviation')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Boxes className="h-4 w-4 text-orange-600" />
                    {t('inventory')}
                  </h3>
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold text-gray-900">{product.current_stock}</p>
                    <p className="text-sm text-gray-500">{t('availableUnits')}</p>
                  </div>
                  <div className={`p-2 rounded-lg border text-center ${getStockStatusColor()}`}>
                    <div className="flex items-center justify-center gap-1">
                      {getStockStatus() === 'critical' && <AlertTriangle className="h-3 w-3" />}
                      {getStockStatus() === 'warning' && <AlertTriangle className="h-3 w-3" />}
                      {getStockStatus() === 'good' && <CheckCircle className="h-3 w-3" />}
                      <span className="text-sm font-medium">{getStockStatusText()}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">{t('minimumStock')}:</span>
                      <span className="text-sm font-medium text-gray-900">{product.minimum_stock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">{t('totalValue')}:</span>
                      <span className="text-sm font-medium text-gray-900">${stockValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-gray-600" />
                    {t('systemInfo')}
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-gray-500">{t('lastUpdated')}:</span>
                      <p className="text-xs font-medium text-gray-900">{formatDate(product.last_updated)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
