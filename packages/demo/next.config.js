const withTM = require('next-transpile-modules')([
  'next-then-image',
])

module.exports = withTM({
  images: {
    domains: ['picsum.photos', 'i.picsum.photos'],
  },
})
