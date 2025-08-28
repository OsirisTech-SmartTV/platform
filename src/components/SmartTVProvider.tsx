import React, { createContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react'
import { detectPlatform, getPlatformConfig } from '../utils/platformUtils'
import type { SmartTVContextType, PlatformConfig, SmartTVPlatform } from '../types'

// Create context
export const SmartTVContext = createContext<SmartTVContextType | null>(null)

interface SmartTVProviderProps {
  children: ReactNode
  initialConfig?: Partial<PlatformConfig>
}

/**
 * Provider component that wraps the app and provides Smart TV context
 */
const SmartTVProvider: React.FC<SmartTVProviderProps> = ({ 
  children, 
  initialConfig = {} 
}: SmartTVProviderProps) => {
  const [platform, setPlatform] = useState<SmartTVPlatform>('unknown')
  const [config, setConfig] = useState<PlatformConfig>(getPlatformConfig('unknown'))
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string>()

  // Memoize initialConfig to prevent unnecessary re-renders
  const memoizedInitialConfig = useMemo(() => initialConfig, [
    JSON.stringify(initialConfig)
  ])

  // Initialize platform detection - only run once on mount
  useEffect(() => {
    let isMounted = true

    try {
      const detectedPlatform = detectPlatform()
      const platformConfig = getPlatformConfig(detectedPlatform)
      
      // Merge with initial config
      const mergedConfig: PlatformConfig = {
        ...platformConfig,
        ...memoizedInitialConfig,
        capabilities: {
          ...platformConfig.capabilities,
          ...(memoizedInitialConfig.capabilities || {}),
        },
      }

      if (isMounted) {
        setPlatform(detectedPlatform)
        setConfig(mergedConfig)
        setIsReady(true)
        setError(undefined)
      }
    } catch (err) {
      if (isMounted) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Smart TV platform')
        setIsReady(false)
      }
    }

    return () => {
      isMounted = false
    }
  }, [memoizedInitialConfig])

  const updateConfig = useCallback((newConfig: Partial<PlatformConfig>) => {
    setConfig((prevConfig: PlatformConfig) => ({
      ...prevConfig,
      ...newConfig,
      capabilities: {
        ...prevConfig.capabilities,
        ...(newConfig.capabilities || {}),
      },
    }))
  }, [])

  const contextValue: SmartTVContextType = useMemo(() => ({
    platform,
    config,
    isReady,
    error,
    updateConfig,
  }), [platform, config, isReady, error, updateConfig])

  return (
    <SmartTVContext.Provider value={contextValue}>
      {children}
    </SmartTVContext.Provider>
  )
}

export default SmartTVProvider