import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript error checking
  },
  reactStrictMode: true, // Enable React Strict Mode for better development
  
  // Remove static export - enable API routes
  // output: 'export', // REMOVED - incompatible with API routes
  // trailingSlash: true, // REMOVED - incompatible with API routes
  
  images: {
    unoptimized: true,
  },
  
  webpack: (config, { dev }) => {
    if (dev) {
      // 禁用 webpack 的热模块替换
      config.watchOptions = {
        ignored: ['**/*'], // 忽略所有文件变化
      };
    }
    return config;
  },
  
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint during builds
  },
  
  // Suppress Sentry warnings during build
  env: {
    SENTRY_SUPPRESS_INSTRUMENTATION_FILE_WARNING: '1',
    SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING: '1',
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "dojmark",
  project: "dojmark-website",
  
  // Configure Sentry options
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
});
