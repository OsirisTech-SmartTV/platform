import { useContext } from 'react'
import { SmartTVContext } from '../components/SmartTVProvider'
import type { UseSmartTVReturn } from '../types'

/**
 * Hook to access Smart TV context
 */
export function useSmartTV(): UseSmartTVReturn {
  const context = useContext(SmartTVContext)

  if (!context) {
    throw new Error('useSmartTV must be used within a SmartTVProvider')
  }

  return context
}
