import { useEffect, useState } from 'react'
import {
  detectPlatform,
  getPlatformConfig,
  isPlatformSupported,
} from '../utils/platformUtils'
import type { UsePlatformReturn, SmartTVPlatform } from '../types'

/**
 * Hook to detect and manage platform information
 */
export function usePlatform(): UsePlatformReturn {
  const [platform, setPlatform] = useState<SmartTVPlatform>('unknown')
  const [config, setConfig] = useState(getPlatformConfig('unknown'))

  useEffect(() => {
    const detectedPlatform = detectPlatform()
    setPlatform(detectedPlatform)
    setConfig(getPlatformConfig(detectedPlatform))
  }, [])

  return {
    platform,
    isSupported: isPlatformSupported(platform),
    capabilities: config.capabilities,
    version: config.version,
  }
}
