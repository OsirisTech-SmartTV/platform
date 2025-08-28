import type { SmartTVPlatform, PlatformConfig } from '../types'
import { DeviceUtil } from './deviceUtils'

/**
 * Detect the current Smart TV platform based on user agent and other browser properties
 */
export function detectPlatform(): SmartTVPlatform {
  if (typeof window === 'undefined') {
    return 'unknown'
  }

  // Use DeviceUtil for more accurate detection
  if (DeviceUtil.isTizen()) {
    return 'tizen'
  }

  if (DeviceUtil.isWebOS()) {
    return 'webos'
  }

  if (DeviceUtil.isSony()) {
    return 'sony'
  }

  if (DeviceUtil.isToshiba()) {
    return 'toshiba'
  }

  if (DeviceUtil.isHisense()) {
    return 'hisense'
  }

  if (DeviceUtil.isTiVo()) {
    return 'tivo'
  }

  if (DeviceUtil.isVideoFutur()) {
    return 'videofutur'
  }

  if (DeviceUtil.isChromecast()) {
    return 'chromecast'
  }

  // Fallback to original detection logic
  const userAgent = navigator.userAgent.toLowerCase()
  const { platform } = navigator

  // Android TV
  if (userAgent.includes('android') && userAgent.includes('tv')) {
    return 'android'
  }

  // Roku
  if (userAgent.includes('roku')) {
    return 'roku'
  }

  // Amazon Fire TV
  if (userAgent.includes('aftt') || userAgent.includes('aft')) {
    return 'fire'
  }

  // Default to browser for web platforms
  if (
    platform.includes('Win') ||
    platform.includes('Mac') ||
    platform.includes('Linux')
  ) {
    return 'browser'
  }

  return 'unknown'
}

/**
 * Get platform-specific configuration
 */
export function getPlatformConfig(platform: SmartTVPlatform): PlatformConfig {
  const baseConfig: PlatformConfig = {
    platform,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
  }

  switch (platform) {
    case 'tizen':
      return {
        ...baseConfig,
        capabilities: {
          voice: true,
          touch: false,
          motion: true,
          bluetooth: true,
          wifi: true,
        },
      }

    case 'webos':
      return {
        ...baseConfig,
        capabilities: {
          voice: true,
          touch: false,
          motion: false,
          bluetooth: true,
          wifi: true,
        },
      }

    case 'android':
      return {
        ...baseConfig,
        capabilities: {
          voice: true,
          touch: true,
          motion: true,
          bluetooth: true,
          wifi: true,
        },
      }

    case 'roku':
      return {
        ...baseConfig,
        capabilities: {
          voice: true,
          touch: false,
          motion: false,
          bluetooth: false,
          wifi: true,
        },
      }

    case 'fire':
      return {
        ...baseConfig,
        capabilities: {
          voice: true,
          touch: false,
          motion: false,
          bluetooth: true,
          wifi: true,
        },
      }

    case 'chromecast':
      return {
        ...baseConfig,
        capabilities: {
          voice: false,
          touch: false,
          motion: false,
          bluetooth: false,
          wifi: true,
        },
      }

    case 'sony':
      return {
        ...baseConfig,
        capabilities: {
          voice: true,
          touch: false,
          motion: false,
          bluetooth: true,
          wifi: true,
        },
      }

    case 'toshiba':
      return {
        ...baseConfig,
        capabilities: {
          voice: false,
          touch: false,
          motion: false,
          bluetooth: true,
          wifi: true,
        },
      }

    case 'hisense':
      return {
        ...baseConfig,
        capabilities: {
          voice: true,
          touch: false,
          motion: false,
          bluetooth: true,
          wifi: true,
        },
      }

    case 'tivo':
      return {
        ...baseConfig,
        capabilities: {
          voice: true,
          touch: false,
          motion: false,
          bluetooth: false,
          wifi: true,
        },
      }

    case 'videofutur':
      return {
        ...baseConfig,
        capabilities: {
          voice: false,
          touch: false,
          motion: false,
          bluetooth: false,
          wifi: true,
        },
      }

    case 'browser':
      return {
        ...baseConfig,
        capabilities: {
          voice: false,
          touch: true,
          motion: false,
          bluetooth: false,
          wifi: true,
        },
      }

    default:
      return {
        ...baseConfig,
        capabilities: {
          voice: false,
          touch: false,
          motion: false,
          bluetooth: false,
          wifi: false,
        },
      }
  }
}

/**
 * Check if a platform is supported by the library
 */
export function isPlatformSupported(platform: SmartTVPlatform): boolean {
  return platform !== 'unknown'
}

/**
 * Get platform display name
 */
export function getPlatformDisplayName(platform: SmartTVPlatform): string {
  const names: Record<SmartTVPlatform, string> = {
    tizen: 'Samsung Smart TV (Tizen)',
    webos: 'LG Smart TV (webOS)',
    android: 'Android TV',
    roku: 'Roku TV',
    fire: 'Amazon Fire TV',
    chromecast: 'Google Chromecast',
    sony: 'Sony Smart TV',
    toshiba: 'Toshiba Smart TV',
    hisense: 'Hisense Smart TV',
    tivo: 'TiVo',
    videofutur: 'VideoFutur',
    browser: 'Web Browser',
    unknown: 'Unknown Platform',
  }

  return names[platform]
}
