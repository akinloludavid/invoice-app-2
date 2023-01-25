/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: "Your MongoDB connection String",
  }
}

module.exports = nextConfig
