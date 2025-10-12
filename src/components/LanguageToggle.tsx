'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-600 hover:border-purple-500 transition-colors duration-200 text-gray-300 hover:text-white"
      title={`Switch to ${language === 'en' ? 'Türkçe' : 'English'}`}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'TR' : 'EN'}
      </span>
    </button>
  )
}

export default LanguageToggle
