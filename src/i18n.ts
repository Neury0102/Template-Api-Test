import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ['en', 'es'];
 
export default getRequestConfig(async ({locale}) => {
  // Provide a default locale if one is not provided
  const finalLocale = locale ?? 'en';

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(finalLocale)) {
    notFound();
  }
 
  return {
    locale: finalLocale,
    messages: (await import(`../public/locales/${finalLocale}/common.json`)).default
  };
});
