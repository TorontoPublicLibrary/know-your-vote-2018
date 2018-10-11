<template lang="pug">
  .map-container
    .map
      #map
</template>

<script>
export default {
  props: ['wardname', 'latitude', 'longitude'],

  mounted () {
    this.createMap(this.wardname, this.latitude, this.longitude)
  },

  methods: {
    createMap: (wardname, latitude, longitude) => {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

      mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

      // init the map
      let zoom = 10
      if (window.innerWidth > 400) {
        zoom = 9
      }
      if (window.innerWidth > 600) {
        zoom = 10
      }
      this.map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/masslbp/cjlwg0kac3jzh2ro2ddmqylnq', // 47 wards
        style: 'mapbox://styles/masslbp/cjkcx7b681o6a2sozzje4axku', // 25 wards
        navigation: true,
        center: [longitude, latitude],
        zoom: zoom,
        minZoom: 9,
        maxZoom: 15,
        scrollZoom: false,
        bearing: -16.9 // So top line is flat
      })

      // Add zoom and rotation controls to the map.
      this.map.addControl(new mapboxgl.NavigationControl())

      this.map.on('load', () => {
        // Add layer for hover state to activate
        this.map.addLayer({
          'id': 'ward-hover',
          'type': 'fill',
          'source': 'composite',
          'source-layer': 'Toronto-25_Wards-clse2a',
          'layout': {},
          'paint': {
            'fill-color': '#75BEE9',
            'fill-opacity': [ 'match', [ 'get', 'ENGLISH_NA' ], wardname, 0.4, 0.1 ]
          }
        })
        this.map.addLayer({
          'id': 'ward-hover-line',
          'type': 'line',
          'source': 'composite',
          'source-layer': 'Toronto-25_Wards-clse2a',
          'layout': {},
          'paint': {
            'line-color': '#D69961',
            'line-opacity': [ 'match', [ 'get', 'ENGLISH_NA' ], wardname, 1, 0 ]
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  .map {
    width: 100%;
    padding-bottom: 75%;
    position: relative;

    @include grid-media($grid-medium) {
      padding-bottom: 64.54%;
    }
  }

  #map {
    position: absolute;
    width: 100%; height: 100%;
  }
</style>
