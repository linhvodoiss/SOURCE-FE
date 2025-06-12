import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  sassOptions: { quietDeps: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  skipTrailingSlashRedirect: true,
  devIndicators: false,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: `${process.env.REDIRECT_HOME}`,
  //       permanent: true,
  //     },
  //   ]
  // },
};

export default nextConfig;
