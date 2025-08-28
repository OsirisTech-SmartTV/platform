// Platform types
export type SmartTVPlatform =
  | 'tizen' // Samsung Smart TV
  | 'webos' // LG Smart TV
  | 'android' // Android TV
  | 'roku' // Roku TV
  | 'fire' // Amazon Fire TV
  | 'chromecast' // Google Chromecast
  | 'sony' // Sony TV
  | 'toshiba' // Toshiba TV
  | 'hisense' // Hisense TV
  | 'tivo' // TiVo
  | 'videofutur' // VideoFutur
  | 'browser' // Web Browser
  | 'unknown'

// Remote control key types
export type RemoteControlKey =
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Back'
  | 'Home'
  | 'Menu'
  | 'Exit'
  | 'VolumeUp'
  | 'VolumeDown'
  | 'Mute'
  | 'ChannelUp'
  | 'ChannelDown'
  | 'Power'
  | 'Info'
  | 'Guide'
  | 'Red'
  | 'Green'
  | 'Yellow'
  | 'Blue'
  | 'Play'
  | 'Pause'
  | 'Stop'
  | 'Rewind'
  | 'FastForward'
  | 'Record'

// Platform configuration
export interface PlatformConfig {
  platform: SmartTVPlatform
  version?: string
  userAgent?: string
  capabilities?: {
    voice?: boolean
    touch?: boolean
    motion?: boolean
    bluetooth?: boolean
    wifi?: boolean
  }
}

// Smart TV Context type
export interface SmartTVContextType {
  platform: SmartTVPlatform
  config: PlatformConfig
  isReady: boolean
  error?: string
  updateConfig: (config: Partial<PlatformConfig>) => void
}

// Remote control event
export interface RemoteControlEvent {
  key: RemoteControlKey
  type: 'keydown' | 'keyup' | 'keypress'
  preventDefault: () => void
  stopPropagation: () => void
}

// Hook return types
export interface UseSmartTVReturn extends SmartTVContextType {}

export interface UsePlatformReturn {
  platform: SmartTVPlatform
  isSupported: boolean
  capabilities: PlatformConfig['capabilities']
  version?: string
}

export interface UseRemoteControlReturn {
  isListening: boolean
  lastKey?: RemoteControlKey
  startListening: () => void
  stopListening: () => void
  onKeyPress: (callback: (event: RemoteControlEvent) => void) => () => void
}

// Device detection utilities
export interface DeviceDetection {
  isToshiba: () => boolean
  isSony: () => boolean
  isWebOS: () => boolean
  isEdge: () => boolean
  isIE: () => boolean
  isTizen: () => boolean
  isTizenVersion: (version: number | string) => boolean
  isVideoFutur: () => boolean
  isTiVo: () => boolean
  isChromecast: () => boolean
  isChrome: () => boolean
  isApple: () => boolean
  isHisense: () => boolean
}

// Platform enumeration and types
export enum PlatformName {
  Tizen = 'tizen',
  WebOS = 'webOS',
  Sony = 'sony',
  Panasonic = 'panasonic',
  Apple = 'apple',
  TiVo = 'tivo',
  Toshiba = 'toshiba',
  Browser = 'browser',
  iOS = 'ios',
  Android = 'android',
  Hisense = 'hisense',
}

export type TypePlatformName = keyof typeof PlatformName
