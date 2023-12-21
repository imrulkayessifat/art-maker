/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['s3.us-east-1.wasabisys.com', 'cdn1.imagine.art', '1966211409.rsc.cdn77.org'],
    },
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work
        return config;
    },


}

module.exports = nextConfig
