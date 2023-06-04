const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://mypath-life.oss-cn-hongkong.aliyuncs.com' : '',
  reactStrictMode: true,
  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

module.exports = nextConfig;
