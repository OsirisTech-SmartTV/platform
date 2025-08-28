import type { DeviceDetection } from '../types'

/**
 * Get current user agent string (safe for SSR)
 */
function getCurrentUserAgent(): string {
  if (typeof window !== 'undefined' && window.navigator) {
    return window.navigator.userAgent || ''
  }
  return ''
}

/**
 * Check if user agent contains specific string
 */
function userAgentContains(key: string): boolean {
  const userAgent = getCurrentUserAgent()
  return userAgent.includes(key)
}

/**
 * Device detection utilities based on user agent
 */
export const DeviceUtil: DeviceDetection = {
  isToshiba: (): boolean =>
    userAgentContains('Toshiba') || userAgentContains('TSBNetTV'),
  isSony: (): boolean => userAgentContains('Sony'), // CEBrowser
  isWebOS: (): boolean => userAgentContains('Web0S'),
  isEdge: (): boolean => userAgentContains('Edg/'),
  isIE: (): boolean => userAgentContains('Trident/'),
  isTizen: (): boolean => userAgentContains('Tizen'),
  isTizenVersion: (version: number | string = 0): boolean => {
    if (Number(version) < 2) return false
    return userAgentContains('Tizen ' + parseInt('' + version, 10))
  },
  isVideoFutur: (): boolean => userAgentContains('VITIS'),
  isTiVo: (): boolean => userAgentContains('TiVo'),
  isChromecast: (): boolean => userAgentContains('CrKey'),
  isChrome: (): boolean => userAgentContains('Chrome') && !DeviceUtil.isEdge(),
  isApple: (): boolean =>
    typeof window !== 'undefined' &&
    !!navigator.vendor &&
    navigator.vendor.includes('Apple') &&
    !DeviceUtil.isTizen(),
  isHisense: (): boolean => userAgentContains('Hisense'),
}

/**
 * Get user agent string (safe for SSR)
 */
export function getUserAgent(): string {
  return getCurrentUserAgent()
}

/**
 * Check if user agent contains specific string
 */
export function checkUserAgent(key: string): boolean {
  return userAgentContains(key)
}
