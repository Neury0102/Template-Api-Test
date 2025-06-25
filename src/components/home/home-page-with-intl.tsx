import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import CallToAction from '@/components/home/call-to-action';
import Features from '@/components/home/features';
import Hero from '@/components/home/hero';

export default async function HomePageWithIntl() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main>
        <Hero />
        <Features />
        <CallToAction />
      </main>
    </NextIntlClientProvider>
  );
}
