"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  children: React.ReactNode;
};

export const RefineProvider = ({ children }: Props) => {
  const t = useTranslations();
  const locale = useLocale();

  const i18nProvider = {
    translate: (key: string, params: Record<string, any>) => t(key, params),
    changeLocale: () => Promise.resolve(), // Locale change is handled by next-intl router
    getLocale: () => locale,
  };

  return (
    <RefineKbarProvider>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("/api")}
        i18nProvider={i18nProvider}
        resources={[
          {
            name: "products",
            list: "/dashboard/products",
            create: "/dashboard/products/new",
            edit: "/dashboard/products/edit/:id",
            show: "/dashboard/products/show/:id",
            meta: {
              canDelete: true,
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
        }}
      >
        {children}
        <RefineKbar />
      </Refine>
    </RefineKbarProvider>
  );
};
