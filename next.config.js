const withNextIntl = require('next-intl/plugin');

const withNextIntlConfig = withNextIntl('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

module.exports = withNextIntlConfig(nextConfig);
