<template lang="pug">
  .map-container
    .contents.top
      .left.overlay
        #ward-info
          p.ward-num(v-if="wardNum") Ward {{ wardNum }}
          p.ward-name(v-if="wardName") {{ wardName }}
      .right.geocoder-container
        label(for="address") Enter Your Address
        small.error(role="alert", v-if="geocodeError") Please enter a Toronto address to continue
        #geocoder
    .contents
      .map-outer
        .map
          #map
</template>

<script>
export default {
  data: function () {
    return {
      wardNum: false,
      wardName: false,
      geocodeError: false
    }
  },

  mounted () {
    this.createMap()
    // document.querySelector('.mapboxgl-ctrl-geocoder input').focus()
  },

  methods: {
    createMap: function () {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
      // const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
      const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder')

      mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN
      const dataLayer = 'WARD25_OpenData_08072018_wgs8-4d4a1z'

      // init the map
      let zoom = 8
      if (window.innerWidth > 400) {
        zoom = 9
      }
      if (window.innerWidth > 600) {
        zoom = 10
      }
      this.map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/masslbp/cjlwg0kac3jzh2ro2ddmqylnq', // 47 wards
        style: 'mapbox://styles/masslbp/cjky8l3xz4xin2snwiqw6a2a1', // 25 wards -- Official (25 Ward Model - December 2018 (WGS84 - Latitude / Longitude))
        navigation: true,
        center: [-79.361, 43.699],
        zoom: zoom,
        minZoom: 8,
        maxZoom: 15,
        scrollZoom: false,
        bearing: -16.9 // So top line is flat
      })

      // Add zoom and rotation controls to the map.
      this.map.addControl(new mapboxgl.NavigationControl())

      // this.map.fitBounds([[-79.7, 43.5], [-79.1, 43.9]], { padding: {top: 0, bottom: 0, left: 0, right: 0} })

      this.map.on('load', () => {
        // Add layer for hover state to activate
        this.map.addLayer({
          'id': 'ward-hover',
          'type': 'fill',
          'source': 'composite',
          'source-layer': dataLayer,
          'layout': {},
          'paint': {
            'fill-color': '#75BEE9',
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.8, 0.3]
          }
        })
        this.map.addLayer({
          'id': 'ward-hover-line',
          'type': 'line',
          'source': 'composite',
          'source-layer': dataLayer,
          'layout': {},
          'paint': {
            'line-color': '#D69961',
            'line-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0]
          }
        })

        // Hover popup for ward info
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        })

        // Handle hover state event
        let hoveredWardId
        this.map.on('mousemove', 'wards', (e) => {
          this.map.getCanvas().style.cursor = 'pointer'

          if (e.features.length > 0) {
            if (hoveredWardId) {
              this.map.setFeatureState({ source: 'composite', 'sourceLayer': dataLayer, id: hoveredWardId }, { hover: false })
            }
            hoveredWardId = e.features[0].id
            this.map.setFeatureState({ source: 'composite', 'sourceLayer': dataLayer, id: hoveredWardId }, { hover: true })
          }

          const moved = parseInt(e.features[0].properties.AREA_L_CD) !== this.wardNum
          this.wardNum = parseInt(e.features[0].properties.AREA_L_CD)
          this.wardName = e.features[0].properties.AREA_NAME

          // Display popup; Track mouse movement on large screen sizes
          var coordinates = e.features[0].geometry.coordinates.slice()
          if (moved || window.innerWidth > 800) {
            popup.setLngLat(e.lngLat).setHTML(`Ward ${this.wardNum}: ${this.wardName}`).addTo(this.map)
          }
        })

        this.map.on('mouseleave', 'wards', () => {
          this.map.getCanvas().style.cursor = ''
          this.map.setFeatureState({ source: 'composite', 'sourceLayer': dataLayer, id: hoveredWardId }, { hover: false })
          hoveredWardId = false
          this.wardNum = false
          this.wardName = false
          popup.remove()
        })

        const slugify = (text) => {
          return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/—/g, '-')
            .replace(/'/g, '')
            .replace(/\./g, '')
        }

        // Handle clicking on a ward
        this.map.on('click', 'wards', (e) => {
          const features = this.map.queryRenderedFeatures(e.point, { layers: ['wards'] })
          window.$nuxt.$router.push('/wards/' + slugify(features[0].properties.AREA_NAME))
        })

        //
        // Geocoding
        //
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          country: 'ca',
          placeholder: '',
          flyTo: false,
          bbox: [-79.7, 43.5, -79.1, 43.9] // This is the bounds for the shapefile
        })
        document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map))
        const geocoderInput = document.getElementById('geocoder').querySelector('input')
        geocoderInput.setAttribute('id', 'address')
        geocoderInput.addEventListener('keydown', (e) => {
          // Fix for accessibility issue caused by input's autocomplete
          if (e.shiftKey && e.keyCode === 9) {
            // manually focus prev element
            document.querySelector('nav li:last-child a').focus()
          } else if (e.keyCode === 9) {
            // manually focus next element
            document.querySelector('#map .mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-in').focus()
            // document.querySelector('#issues-container .items .item:first-child').focus()
          }
        })

        const self = this
        geocoder.on('result', (e) => {
          // Get location from geocoder and pass to above function
          const features = this.map.queryRenderedFeatures(this.map.project([e.result.center[0], e.result.center[1]]), { layers: ['wards'] })

          if (features && features[0] && features[0].properties && features[0].properties.AREA_NAME) {
            self.geocodeError = false
            window.$nuxt.$router.push('/wards/' + slugify(features[0].properties.AREA_NAME))
          } else {
            self.geocodeError = true
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
  @import "~assets/css/utils/index.scss";

  .contents.top {
    margin-bottom: 38px;
  }

  .overlay {
    display: none;
    position: relative;
    min-height: 90px;

    @include grid-media($grid-large) {
      display: block;
    }

    #ward-info {
      position: absolute;
      bottom: 0;

      .ward-num {
        font: 500 30px/37px $sans-serif;
        margin-bottom: 0;
      }

      .ward-name {
        font: 500 20px/24px $sans-serif;
        margin-bottom: 0;
      }
    }
  }

  .geocoder-container {
    #geocoder {
      position: relative;
    }

    label {
      display: block;
      font: 700 20px/24px $sans-serif;
      margin-bottom: 8px;
    }

    .error {
      display: block;
      margin-bottom: 8px;
      color: $red-1;
    }

    input {
      width: calc(100% - 34px); height: 52px;
      padding: 0 14px;
      font: 500 30px/32px $sans-serif;
    }

    ul.suggestions {
      position: absolute;
      width: 100%; height: auto;
      overflow-y: auto;
      z-index: 9;
      margin: 0;
      padding: 0;
      background-color: $white;
    }

    ul.suggestions li {
      padding: 14px;
      border-bottom: 1px solid $grey-1;
      cursor: pointer;
      overflow: hidden;

      a {
        text-decoration: none;
      }

      &:hover, &.active {
        background-color: $grey-2;
      }
    }

    ul.suggestions li a {
      display: block;
      color: $black;
      white-space: nowrap;
      max-width: 99%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .geocoder-pin-right {
      display: none;
    }
  }

  .map-outer {
    @include gridWidths(6, 6, 6);
  }

  .map {
    width: 100%;
    padding-bottom: 75%;
    position: relative;

    @include grid-media($grid-medium) {
      padding-bottom: 54%;
    }
  }

  #map {
    position: absolute;
    width: 100%; height: 100%;
  }

  #map .mapboxgl-ctrl-icon {
    @include grid-media($grid-medium) {
      width: 40px; height: 40px;
    }
  }

  #map  .mapboxgl-popup {
    font: 400 16px/22px $sans-serif;
    color: $black;
  }


</style>
