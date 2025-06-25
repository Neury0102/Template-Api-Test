'use client';

import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

export default function IntlProvider({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
