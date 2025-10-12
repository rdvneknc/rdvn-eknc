'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { getVisitorLocation, getCountryFlag } from '@/services/geolocation'

// Dynamic imports for react-map-gl
const Map = dynamic(() => import('react-map-gl').then(mod => mod.default), { ssr: false })
const Marker = dynamic(() => import('react-map-gl').then(mod => mod.Marker), { ssr: false })
const Source = dynamic(() => import('react-map-gl').then(mod => mod.Source), { ssr: false })
const Layer = dynamic(() => import('react-map-gl').then(mod => mod.Layer), { ssr: false })


interface LocationData {
  city: string
  country: string
  latitude: number
  longitude: number
  countryCode: string
}

interface DistanceResult {
  distance: number
  location: LocationData
}

// Tallinn coordinates
const TALLINN_COORDS = [24.7536, 59.4370] // [lng, lat]

const MapboxMap = () => {
  const [locationData, setLocationData] = useState<DistanceResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true)
        const data = await getVisitorLocation()
        setLocationData(data)
      } catch (err) {
        console.error('Failed to fetch location:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLocation()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading map...</p>
        </div>
      </div>
    )
  }

  if (error || !locationData) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <p className="text-gray-300">Unable to load map</p>
          <p className="text-sm text-gray-400 mt-2">Tallinn, Estonia 🇪🇪</p>
        </div>
      </div>
    )
  }

  const { distance, location } = locationData
  const visitorCoords = [location.longitude, location.latitude]
  const flag = getCountryFlag(location.countryCode)

  // Create line geometry between Tallinn and visitor location
  const lineData = {
    type: 'Feature' as const,
    geometry: {
      type: 'LineString' as const,
      coordinates: [TALLINN_COORDS, visitorCoords]
    },
    properties: {}
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full h-96 rounded-lg overflow-hidden border border-gray-700"
    >
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: (TALLINN_COORDS[0] + visitorCoords[0]) / 2,
          latitude: (TALLINN_COORDS[1] + visitorCoords[1]) / 2,
          zoom: 2
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        interactive={false}
        scrollZoom={false}
        boxZoom={false}
        dragRotate={false}
        dragPan={false}
        keyboard={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
        attributionControl={false}
        logoPosition="bottom-left"
      >
        {/* Tallinn Marker */}
        <Marker longitude={TALLINN_COORDS[0]} latitude={TALLINN_COORDS[1]}>
          <motion.div
            className="bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Navigation className="w-4 h-4" />
          </motion.div>
        </Marker>

        {/* Visitor Marker */}
        <Marker longitude={visitorCoords[0]} latitude={visitorCoords[1]}>
          <motion.div
            className="bg-purple-500 text-white p-2 rounded-full shadow-lg border-2 border-white"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <MapPin className="w-4 h-4" />
          </motion.div>
        </Marker>

        {/* Connection Line */}
        <Source id="line" type="geojson" data={lineData}>
          <Layer
            id="line-layer"
            type="line"
            paint={{
              'line-color': '#ef4444',
              'line-width': 3,
              'line-dasharray': [2, 2]
            }}
          />
        </Source>
      </Map>

      {/* Map Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">
                I&apos;m from Tallinn, Estonia 🇪🇪
              </p>
              <p className="text-sm text-gray-400">
                roughly <span className="text-red-400 font-semibold">{distance.toLocaleString()}km</span> away from your current location
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">
                {location.city}, {location.country} {flag}
              </p>
              <p className="text-xs text-gray-400">according to your IP address</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MapboxMap
