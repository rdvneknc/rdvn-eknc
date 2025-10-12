'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { getVisitorLocation, getCountryFlag } from '@/services/geolocation'

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

const LocationDisplay = () => {
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
      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-600 text-gray-300">
        <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm">Detecting location...</span>
      </div>
    )
  }

  if (error || !locationData) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-600 text-gray-300">
        <MapPin className="w-4 h-4 text-purple-400" />
        <span className="text-sm">Tallinn, Estonia 🇪🇪</span>
      </div>
    )
  }

  const { distance, location } = locationData
  const flag = getCountryFlag(location.countryCode)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-600 text-gray-300 hover:border-purple-500/50 transition-colors"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Navigation className="w-4 h-4 text-purple-400" />
      </motion.div>
      
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {distance > 0 ? (
            <>
              <span className="text-purple-400">{distance.toLocaleString()}km</span>
              <span className="text-gray-400 mx-1">away</span>
            </>
          ) : (
            <span className="text-purple-400">Local</span>
          )}
        </span>
        <span className="text-xs text-gray-400">
          {location.city}, {location.country} {flag}
        </span>
      </div>
    </motion.div>
  )
}

export default LocationDisplay
