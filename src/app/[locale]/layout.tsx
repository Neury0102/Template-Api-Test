import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Sidebar from '@/components/layout/sidebar';
import { getMessages } from 'next-intl/server';
import IntlProvider from '@/components/layout/intl-provider';
import { RefineProvider } from '@/components/refine/provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Heavenly Charged',
  description: 'Inventory Management System',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>
        <IntlProvider locale={locale} messages={messages}>
          <RefineProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-4">{children}</main>
            </div>
          </RefineProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
