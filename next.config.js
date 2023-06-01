// @ts-check
const { i18n } = require('./next-i18next.config.js')
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  output: 'standalone'
}

module.exports = nextConfig
