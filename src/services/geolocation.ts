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
    // Using ip-api.com (free, CORS enabled, 45 requests/minute)
    const response = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,city,lat,lon', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data')
    }
    
    const data = await response.json()
    
    if (data.status === 'fail') {
      throw new Error(data.message || 'Location service error')
    }
    
    const location: LocationData = {
      city: data.city || 'Unknown',
      country: data.country || 'Unknown',
      latitude: parseFloat(data.lat) || 0,
      longitude: parseFloat(data.lon) || 0,
      countryCode: data.countryCode || 'XX'
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
    
    // Fallback data - silently fail and return default location
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
    'PH': '🇵🇭', 'TW': '🇹🇼', 'HK': '🇭🇰', 'MO': '🇲🇴', 'EE': '🇪🇪'
  }
  
  return flags[countryCode.toUpperCase()] || '🌍'
}

