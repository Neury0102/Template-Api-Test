'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{t('subtitle')}</p>
      <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        {t('cta')}
      </button>
    </section>
  );
}
