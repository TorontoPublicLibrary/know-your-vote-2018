# Know Your Vote T.O.

This is the [Nuxt.js](http://nuxtjs.org/) front end for the [Know Your Vote T.O. website](https://www.knowyourvoteto.ca). The site is integrated with [Mapbox](https://www.mapbox.com/) for displaying maps and geolocating users, as well as the cloud-based CMS [Contentful](https://www.contentful.com/).

Using a CMS besides Contentful would require updates to the generate command in nuxt.config.js and in each page component's `asyncData` method. For getting started with contentful, you can import the schema file included in this repo (`contentful-schema-export.json`)

## Disclaimer

Toronto Public Library (TPL) is making this website software available as open source.  TPL assumes no responsibility or liability for the use of the software, and makes no representation or warranty that such application will be suitable for the specified use without further testing or modification.  Further development of this software by TPL is unlikely: you are encouraged to fork and develop this software as you see fit.  As of August 2021, there are known security vulnerabilities in some of the dependencies.

## Build Setup

Start by copying .contentful.example.json to .contentful.json and fixing the needed values.

The following commands will work in most environments: you may have to check and possibly change your Node/npm versions.

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Configuration

Copy .contentful.example.json to .contentful.json to use as your configuration file. You will need to update this file with information from your Contentful space. This file also includes your Mapbox access token, which is required for accessing the Mapbox API.

## License

This code is released under [the GPL2](LICENSE.txt).

