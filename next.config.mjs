/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/proposals/new",
        destination: "/workspace/proposals/new",
        permanent: false,
      },
      {
        source: "/proposals/:id",
        destination: "/workspace/proposals/:id",
        permanent: false,
      },
      {
        source: "/templates/:path*",
        destination: "/workspace/templates/:path*",
        permanent: false,
      },
      {
        source: "/settings/:path*",
        destination: "/workspace/settings/:path*",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "/workspace/admin/:path*",
        permanent: false,
      },
      {
        source: "/:city/elevators",
        destination: "/:city/contracting",
        permanent: true,
      },
      {
        source: "/:city/waterproofing",
        destination: "/:city/maintenance",
        permanent: true,
      },
      {
        source: "/:city/furnishing",
        destination: "/:city/fit-out",
        permanent: true,
      },
      {
        source: "/:city/facades",
        destination: "/:city/luxury-materials",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
