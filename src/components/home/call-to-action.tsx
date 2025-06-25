'use client';

import { useTranslations } from 'next-intl';

export default function CallToAction() {
  const t = useTranslations('home.cta');

  return (
    <section className="text-center py-20 bg-blue-600 text-white">
      <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">{t('subtitle')}</p>
      <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">
        {t('button')}
      </button>
    </section>
  );
}
