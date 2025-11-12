'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from 'lucide-react'
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

const LocationDisplayContact = () => {
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
      <div className="card bg-gray-800/30 border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <p className="text-white font-medium">Detecting your location...</p>
            <p className="text-sm text-gray-400">Calculating distance from Tallinn</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !locationData) {
    return (
      <div className="card bg-gray-800/30 border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Navigation className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-white font-medium">Remote / Global</p>
            <p className="text-sm text-gray-400">Available for remote collaboration</p>
          </div>
        </div>
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
      className="card bg-gray-800/30 border-gray-700 hover:border-purple-500/50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <motion.div
          className="flex-shrink-0"
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
          <Navigation className="w-5 h-5 text-purple-400" />
        </motion.div>
        
        <div className="flex-1">
          <p className="text-white font-medium mb-1">
            {distance > 0 ? (
              <>
                <span className="text-purple-400">{distance.toLocaleString()}km</span>
                <span className="text-gray-300 mx-1">away</span>
              </>
            ) : (
              <span className="text-purple-400">Local</span>
            )}
          </p>
          <p className="text-sm text-gray-400">
            {location.city}, {location.country} {flag}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default LocationDisplayContact
