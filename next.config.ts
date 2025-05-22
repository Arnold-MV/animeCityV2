/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s4.anilist.co",
      "image.tmdb.org",
      "d14d9vp3wdof84.cloudfront.net",
      // agrega aquí todos los dominios que uses para imágenes
    ],
    // opcional: si usas remotePatterns para más control
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        pathname: "/file/anilistcdn/media/anime/cover/large/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

module.exports = nextConfig;
