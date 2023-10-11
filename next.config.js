/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  images: {
    domains: ['t4.ftcdn.net',"t3.ftcdn.net", "www.woods.ca","www.letenkyzababku.sk", "v8v7e2w9.stackpathcdn.com", "www.stadtfriseure-regensburg.de", "partypleasersservices.com", "jenningstrace.com", "cdn.bandsforhire.net", "vinesoftheyarravalley.com.au"], // Add the hostname you want to allow
  },
};

module.exports = nextConfig;
