import type { RemoteControlKey, SmartTVPlatform } from '../types'

/**
 * Map keyboard keys to remote control keys
 */
export function mapKeyboardToRemote(key: string): RemoteControlKey | null {
  const keyMap: Record<string, RemoteControlKey> = {
    // Arrow keys
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',

    // Standard keys
    Enter: 'Enter',
    Escape: 'Back',
    Backspace: 'Back',

    // Number keys can be mapped to channel or direct number input
    Home: 'Home',

    // Media keys
    ' ': 'Play', // Spacebar for play/pause
    MediaPlay: 'Play',
    MediaPause: 'Pause',
    MediaStop: 'Stop',
    MediaTrackPrevious: 'Rewind',
    MediaTrackNext: 'FastForward',

    // Volume keys
    AudioVolumeUp: 'VolumeUp',
    AudioVolumeDown: 'VolumeDown',
    AudioVolumeMute: 'Mute',

    // Function keys for colored buttons
    F1: 'Red',
    F2: 'Green',
    F3: 'Yellow',
    F4: 'Blue',
  }

  return keyMap[key] || null
}

/**
 * Get platform-specific key mappings
 */
export function getPlatformKeyMappings(
  platform: SmartTVPlatform
): Record<string, RemoteControlKey> {
  const baseMapping = {
    ArrowUp: 'ArrowUp' as RemoteControlKey,
    ArrowDown: 'ArrowDown' as RemoteControlKey,
    ArrowLeft: 'ArrowLeft' as RemoteControlKey,
    ArrowRight: 'ArrowRight' as RemoteControlKey,
    Enter: 'Enter' as RemoteControlKey,
  }

  switch (platform) {
    case 'tizen':
      return {
        ...baseMapping,
        '10009': 'Back', // Samsung specific back key
        '403': 'Red',
        '404': 'Green',
        '405': 'Yellow',
        '406': 'Blue',
        '412': 'VolumeUp',
        '413': 'VolumeDown',
        '414': 'Mute',
      }

    case 'webos':
      return {
        ...baseMapping,
        '461': 'Back', // LG specific back key
        '403': 'Red',
        '404': 'Green',
        '405': 'Yellow',
        '406': 'Blue',
      }

    case 'android':
      return {
        ...baseMapping,
        '4': 'Back', // Android back key
        '3': 'Home', // Android home key
        '82': 'Menu', // Android menu key
      }

    default:
      return baseMapping
  }
}

/**
 * Check if a key is a navigation key
 */
export function isNavigationKey(key: RemoteControlKey): boolean {
  const navigationKeys: RemoteControlKey[] = [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Enter',
    'Back',
  ]

  return navigationKeys.includes(key)
}

/**
 * Check if a key is a media control key
 */
export function isMediaKey(key: RemoteControlKey): boolean {
  const mediaKeys: RemoteControlKey[] = [
    'Play',
    'Pause',
    'Stop',
    'Rewind',
    'FastForward',
    'Record',
  ]

  return mediaKeys.includes(key)
}

/**
 * Check if a key is a volume control key
 */
export function isVolumeKey(key: RemoteControlKey): boolean {
  const volumeKeys: RemoteControlKey[] = ['VolumeUp', 'VolumeDown', 'Mute']

  return volumeKeys.includes(key)
}

/**
 * Check if a key is a colored button
 */
export function isColoredButton(key: RemoteControlKey): boolean {
  const coloredButtons: RemoteControlKey[] = ['Red', 'Green', 'Yellow', 'Blue']

  return coloredButtons.includes(key)
}

/**
 * Get key category for analytics or handling
 */
export function getKeyCategory(
  key: RemoteControlKey
): 'navigation' | 'media' | 'volume' | 'colored' | 'system' | 'other' {
  if (isNavigationKey(key)) return 'navigation'
  if (isMediaKey(key)) return 'media'
  if (isVolumeKey(key)) return 'volume'
  if (isColoredButton(key)) return 'colored'

  const systemKeys: RemoteControlKey[] = [
    'Home',
    'Menu',
    'Exit',
    'Power',
    'Info',
    'Guide',
  ]
  if (systemKeys.includes(key)) return 'system'

  return 'other'
}
