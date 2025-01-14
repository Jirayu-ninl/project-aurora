// @ts-check
await import('./global/env.mjs')
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
import 'dotenv/config'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { createRequire } from 'node:module'
import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'
import plugins from 'next-compose-plugins'
import { withSentryConfig } from '@sentry/nextjs'
// import { withAxiom } from 'next-axiom'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const standaloneExport = process.env.EXPORT === 'standalone' && {
  output: 'standalone',
}

const nextConfig = {
  webpack: (config, { webpack, /*dev ,*/ isServer }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    )

    config.resolve.alias['@aurora'] = path.join(__dirname, 'aurora')
    config.resolve.alias['@app'] = path.join(__dirname, 'app')
    config.resolve.alias['@global'] = path.join(__dirname, 'global')
    config.resolve.alias['@components'] = path.join(__dirname, 'app/components')
    config.resolve.alias['@contents'] = path.join(__dirname, 'app/contents')
    config.resolve.alias['@server'] = path.join(__dirname, 'server')
    // config.resolve.alias['public'] = path.join(__dirname, 'public')

    config.resolve.alias['auroraGL'] = path.resolve(
      __dirname,
      'aurora/libs/webGL/glsl',
    )

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.mp4$/,
      use: ['file-loader'],
    })

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag|ps)$/,
      exclude: /node_modules/,
      use: ['glslify-import-loader', 'raw-loader', 'glslify-loader'],
    })
    config.module.rules.push({
      test: /\.hlsl$/i,
      exclude: /node_modules/,
      use: ['@gdgt/hlsl-loader'],
    })

    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '129.213.124.156',
      },
    ],
  },
  ...standaloneExport,
  pwa: {
    dest: 'public',
    register: true,
    runtimeCaching,
  },
  sentry: {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,
    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',
    // Hides source maps from generated client bundles
    hideSourceMaps: true,
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
}

const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: 'theiceji',
  project: 'aurora',
}

export default plugins(
  [
    // withAxiom,
    [withSentryConfig, sentryWebpackPluginOptions],
    withBundleAnalyzer,
    withPWA,
  ],
  nextConfig,
)
