'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface LanguageContextType {
  language: 'en' | 'tr'
  setLanguage: (lang: 'en' | 'tr') => void
  t: (key: string) => string
}

interface TranslationObject {
  [key: string]: string | TranslationObject
}

type TranslationData = TranslationObject

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'tr'>('en')
  const [translations, setTranslations] = useState<TranslationData>({})

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error('Error loading translations:', error)
      }
    }

    loadTranslations()
  }, [language])

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: string | TranslationObject | undefined = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'tr'
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
      setLanguage(savedLanguage)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
