import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/li',
        destination: '/?utm_source=linkedin&utm_medium=profile&utm_campaign=launch',
        permanent: false,
      },
      {
        source: '/li-post',
        destination: '/?utm_source=linkedin&utm_medium=post&utm_campaign=launch',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
