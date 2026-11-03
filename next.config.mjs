/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build-time switch for the PRIVATE PREVIEW build only (see Dockerfile.preview). Inlined so the
  // bundler drops the draft-content module from every other build. Default: off.
  env: {
    RUWAQ_PRIVATE_PREVIEW: process.env.RUWAQ_PRIVATE_PREVIEW === "1" ? "1" : "0",
  },
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
    // Legacy URLs of the cancelled owner-advisor / contractor-matching service now land on the
    // home page instead of pages that still promise that service. (/listing, /directory -> /pro
    // and /visualization -> an external site are left as they were: they need a business decision.)
    // Ruwaq v2 («ممثّل المالك»): retire directory/tours/off-plan surfaces that
    // contradict the owner-side positioning. Temporary (302) so they can return
    // once real, vetted network members exist.
    const cities = ["jeddah", "makkah", "madinah"];
    const v2 = [
      { source: "/request-quote", destination: "/", permanent: false },
      { source: "/how-we-match", destination: "/", permanent: false },
      { source: "/categories", destination: "/", permanent: false },
      { source: "/listing/:slug*", destination: "/pro", permanent: false },
      { source: "/tours", destination: "/", permanent: false },
      { source: "/tours/:slug*", destination: "/", permanent: false },
      { source: "/developers", destination: "/", permanent: false },
      { source: "/hubs/:slug*", destination: "/", permanent: false },
      { source: "/visualization", destination: "https://3dgraphicshouse.com/?utm_source=ruwaq&utm_medium=redirect", permanent: false },
      ...cities.flatMap((city) => [
        { source: `/${city}`, destination: "/", permanent: false },
        { source: `/${city}/:category*`, destination: "/", permanent: false },
      ]),
    ];
    return [
      ...v2,
      {
        source: "/projects/al-rajhi-gardens",
        destination: "/tours/abraj-omar-makkah",
        permanent: true,
      },
      {
        source: "/projects/al-rajhi-makkah",
        destination: "/tours/abraj-omar-makkah",
        permanent: true,
      },
      {
        source: "/tours/al-rajhi-makkah",
        destination: "/tours/abraj-omar-makkah",
        permanent: true,
      },
      {
        source: "/tours/central-market-jeddah",
        destination: "/tours/al-oula-jeddah-gate",
        permanent: true,
      },
      {
        source: "/projects/central-market-jeddah",
        destination: "/tours/al-oula-jeddah-gate",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/projects/:slug",
        destination: "/tours/:slug",
        permanent: true,
      },
      {
        source: "/directory",
        destination: "/pro",
        permanent: true,
      },
      {
        source: "/directory/:path*",
        destination: "/pro",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/proposals",
        permanent: false,
      },
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
        source: "/leads",
        destination: "/workspace/leads",
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
      {
        source: "/tours/north-jeddah-villa-fitout",
        destination: "/tours/al-oula-jeddah-gate",
        permanent: true,
      },
      {
        source: "/tours/makkah-serviced-residence",
        destination: "/tours/thakher-makkah",
        permanent: true,
      },
      {
        source: "/tours/madinah-villa-garden",
        destination: "/tours/roshn-sedra",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
