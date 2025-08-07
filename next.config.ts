const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fsc-projects-static.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "d4lgxe9bm8juw.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;