// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')
const path = require('path')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  modules: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [process.env.AWSContainer || ''],
  },
  // Proxy images to Strapi API
  // async rewrites() {
  //   return [
  //     {
  //       source: '/uploads/:path*',
  //       destination: 'https://alamos-be.herokuapp.com/uploads/:path*'
  //     }
  //   ]
  // }
}

module.exports = withNx(nextConfig)
