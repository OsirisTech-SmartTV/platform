// Main library entry point
export { default as SmartTVProvider } from './components/SmartTVProvider'
export { default as RemoteControl } from './components/RemoteControl'
export { default as PlatformDetector } from './components/PlatformDetector'

// Hooks
export { useSmartTV } from './hooks/useSmartTV'
export { usePlatform } from './hooks/usePlatform'
export { useRemoteControl } from './hooks/useRemoteControl'

// Utils
export * from './utils/platformUtils'
export * from './utils/keyboardUtils'
export * from './utils/deviceUtils'
export * from './utils/compatibility'
export { Platform, PlatformInstance, PlatformName } from './utils/Platform'

// Types
export type {
  SmartTVPlatform,
  RemoteControlKey,
  PlatformConfig,
  SmartTVContextType,
  DeviceDetection,
  TypePlatformName,
} from './types'
