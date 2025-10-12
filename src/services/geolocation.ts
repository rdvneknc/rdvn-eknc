interface LocationData {
  city: string
  country: string
  latitude: number
  longitude: number
  countryCode: string
}

interface DistanceResult {
  distance: number // in kilometers
  location: LocationData
}

// Tallinn, Estonia coordinates
const TALLINN_COORDS = {
  lat: 59.4370,
  lng: 24.7536
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Get visitor's location using IP geolocation
export async function getVisitorLocation(): Promise<DistanceResult> {
  try {
    // Using ipapi.co (free tier: 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/')
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data')
    }
    
    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.reason || 'Location service error')
    }
    
    const location: LocationData = {
      city: data.city || 'Unknown',
      country: data.country_name || 'Unknown',
      latitude: parseFloat(data.latitude) || 0,
      longitude: parseFloat(data.longitude) || 0,
      countryCode: data.country_code || 'XX'
    }
    
    // Calculate distance from Tallinn
    const distance = calculateDistance(
      TALLINN_COORDS.lat,
      TALLINN_COORDS.lng,
      location.latitude,
      location.longitude
    )
    
    return {
      distance: Math.round(distance),
      location
    }
  } catch (error) {
    console.error('Error fetching location:', error)
    
    // Fallback data
    return {
      distance: 0,
      location: {
        city: 'Unknown',
        country: 'Unknown',
        latitude: 0,
        longitude: 0,
        countryCode: 'XX'
      }
    }
  }
}

// Format location display text
export function formatLocationText(location: LocationData, distance: number): string {
  if (distance === 0) {
    return "I'm from Tallinn, Estonia"
  }
  
  return `I'm from Tallinn, Estonia, roughly ${distance.toLocaleString()}km away from your current location`
}

// Get country flag emoji
export function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'US': '🇺🇸', 'CA': '🇨🇦', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷',
    'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱', 'SE': '🇸🇪', 'NO': '🇳🇴',
    'DK': '🇩🇰', 'FI': '🇫🇮', 'PL': '🇵🇱', 'CZ': '🇨🇿', 'HU': '🇭🇺',
    'AT': '🇦🇹', 'CH': '🇨🇭', 'BE': '🇧🇪', 'IE': '🇮🇪', 'PT': '🇵🇹',
    'GR': '🇬🇷', 'TR': '🇹🇷', 'RU': '🇷🇺', 'JP': '🇯🇵', 'KR': '🇰🇷',
    'CN': '🇨🇳', 'IN': '🇮🇳', 'AU': '🇦🇺', 'NZ': '🇳🇿', 'BR': '🇧🇷',
    'MX': '🇲🇽', 'AR': '🇦🇷', 'CL': '🇨🇱', 'CO': '🇨🇴', 'PE': '🇵🇪',
    'VE': '🇻🇪', 'EC': '🇪🇨', 'UY': '🇺🇾', 'PY': '🇵🇾', 'BO': '🇧🇴',
    'SG': '🇸🇬', 'MY': '🇲🇾', 'TH': '🇹🇭', 'VN': '🇻🇳', 'ID': '🇮🇩',
    'PH': '🇵🇭', 'TW': '🇹🇼', 'HK': '🇭🇰', 'MO': '🇲🇴'
  }
  
  return flags[countryCode.toUpperCase()] || '🌍'
}
