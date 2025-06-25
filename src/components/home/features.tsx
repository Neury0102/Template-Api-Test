'use client';

import { useTranslations } from 'next-intl';
import { Cpu, Users, LifeBuoy } from 'lucide-react';

const iconMap = {
  Cpu,
  Users,
  LifeBuoy
};

export default function Features() {
  const t = useTranslations('home.features');
  const features = ['feature1', 'feature2', 'feature3'] as const;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = iconMap[t(`${feature}.icon`) as keyof typeof iconMap];
            return (
              <div key={feature} className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                {Icon && <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />}
                <h3 className="text-2xl font-semibold mb-2">{t(`${feature}.title`)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t(`${feature}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
