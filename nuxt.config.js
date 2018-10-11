const webpack = require('webpack')
const contentful = require('contentful')

const config = require('./config.js')
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
})

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Know Your Vote T.O.',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Poppins:400,500', type: 'text/css' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Know Your Vote T.O. is a website where voters can learn about the candidates running to represent their neighbourhood at City Council, learn how candidates think Toronto should tackle big issues facing our city, and learn more about the city they call home.' },
      { property: 'og:title', content: 'Know Your Vote T.O.' },
      { property: 'og:description', content: 'Know Your Vote T.O. is a website where voters can learn about the candidates running to represent their neighbourhood at City Council, learn how candidates think Toronto should tackle big issues facing our city, and learn more about the city they call home.' },
      { property: 'og:image', content: 'https://www.knowyourvoteto.ca/img/logo-big.png' },
      { property: 'og:url', content: 'https://www.knowyourvoteto.ca' },
      { property: 'twitter:title', content: 'Know Your Vote T.O.' },
      { property: 'twitter:description', content: 'Know Your Vote T.O. is a website where voters can learn about the candidates running to represent their neighbourhood at City Council, learn how candidates think Toronto should tackle big issues facing our city, and learn more about the city they call home.' },
      { property: 'twitter:image', content: 'https://www.knowyourvoteto.ca/img/logo-big.png' },
      { property: 'twitter:card', content: 'summary_large_image' }
    ],
    script: [
      { src: '//translate.google.com/translate_a/element.js' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#EDA571' },
  css: [
    // SCSS file in the project
    '@/assets/css/index.scss'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      config.module.noParse = /(mapbox-gl)\.js$/
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (isClient) {
        config.entry.vendor.push('babel-polyfill')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash'
        // ...etc.
      })
    ]
  },
  modules: [
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: 'UA-XXXXXXXXX-1'
    }]
  ],
  plugins: [
    '~/plugins/contentful',
    { src: '~plugins/cheapparallax', ssr: false },
    { src: '~/plugins/scrollto', ssr: false },
    { src: '~/plugins/slideUpDown', ssr: false }
  ],
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_HOME_ENTRY_ID: config.CTF_HOME_ENTRY_ID,
    CTF_ABOUT_ENTRY_ID: config.CTF_ABOUT_ENTRY_ID,
    CTF_EVENTS_ENTRY_ID: config.CTF_EVENTS_ENTRY_ID,
    CTF_ABOUT_VOTING_ENTRY_ID: config.CTF_ABOUT_VOTING_ENTRY_ID,
    CTF_ISSUES_ENTRY_ID: config.CTF_ISSUES_ENTRY_ID,
    CTF_CONTACT_ENTRY_ID: config.CTF_CONTACT_ENTRY_ID,
    MAPBOX_ACCESS_TOKEN: config.MAPBOX_ACCESS_TOKEN
  },
  generate: {
    routes () {
      return Promise.all([
        // get all wards
        client.getEntries({
          'content_type': 'ward'
        }),
        // get all pages
        client.getEntries({
          'content_type': 'page'
        })
      ]).then(([wards, pages]) => {
        return [
          // Map Wards to URLs
          ...wards.items.map(ward => `/wards/${ward.fields.slug}`),
          // Map pages to URLs
          ...pages.items.map(page => `/${page.fields.slug}`)
        ]
      })
    }
  }
}
