/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatar-management--avatars.us-west-2.prod.public.atl-paas.net",
      "secure.gravatar.com",
      "api.media.atlassian.com",
      process.env.HOST,
    ],
  },
};
