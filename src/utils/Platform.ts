import { DeviceUtil } from './deviceUtils'
import { PlatformName } from '../types'

export { PlatformName } from '../types'
export type { TypePlatformName } from '../types'

/**
 * Platform detection and management utility class
 * Provides centralized platform detection and platform-specific functionality
 */
export class Platform {
  public PlatformName = PlatformName
  private platformName: PlatformName = PlatformName.Browser

  constructor() {
    this._init()
  }

  /**
   * Initialize platform detection
   * @private
   */
  private _init(): void {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') {
      this.platformName = PlatformName.Browser
      return
    }

    try {
      if (DeviceUtil.isTizen()) {
        this.platformName = PlatformName.Tizen
      } else if (DeviceUtil.isWebOS()) {
        this.platformName = PlatformName.WebOS
      } else if (DeviceUtil.isHisense()) {
        this.platformName = PlatformName.Hisense
      } else if (DeviceUtil.isSony()) {
        this.platformName = PlatformName.Sony
      } else if (DeviceUtil.isToshiba()) {
        this.platformName = PlatformName.Toshiba
      } else if (DeviceUtil.isTiVo()) {
        this.platformName = PlatformName.TiVo
      } else if (DeviceUtil.isApple()) {
        // Check for iOS specifically
        const userAgent = navigator.userAgent.toLowerCase()
        if (
          userAgent.includes('iphone') ||
          userAgent.includes('ipad') ||
          userAgent.includes('ipod')
        ) {
          this.platformName = PlatformName.iOS
        } else {
          this.platformName = PlatformName.Apple
        }
      } else if (navigator.userAgent.toLowerCase().includes('android')) {
        this.platformName = PlatformName.Android
      } else {
        this.platformName = PlatformName.Browser
      }
    } catch (error) {
      console.warn('Platform detection failed:', error)
      this.platformName = PlatformName.Browser
    }
  }

  /**
   * Get the current platform name
   * @returns The detected platform name
   */
  public getPlatformName(): PlatformName {
    return this.platformName
  }

  /**
   * Check if current platform is Samsung Tizen
   * @returns True if running on Tizen platform
   */
  public isTizen(): boolean {
    return DeviceUtil.isTizen()
  }

  /**
   * Check if current platform is LG webOS
   * @returns True if running on webOS platform
   */
  public isWebOS(): boolean {
    return DeviceUtil.isWebOS()
  }

  /**
   * Check if current platform is Hisense Smart TV
   * @returns True if running on Hisense platform
   */
  public isHisense(): boolean {
    return DeviceUtil.isHisense()
  }

  /**
   * Check if current platform is Sony Smart TV
   * @returns True if running on Sony platform
   */
  public isSony(): boolean {
    return DeviceUtil.isSony()
  }

  /**
   * Check if current platform is Toshiba Smart TV
   * @returns True if running on Toshiba platform
   */
  public isToshiba(): boolean {
    return DeviceUtil.isToshiba()
  }

  /**
   * Check if current platform is TiVo
   * @returns True if running on TiVo platform
   */
  public isTiVo(): boolean {
    return DeviceUtil.isTiVo()
  }

  /**
   * Check if current platform is any Smart TV platform
   * @returns True if running on any supported Smart TV platform
   */
  public isSmartTV(): boolean {
    return (
      DeviceUtil.isTizen() ||
      DeviceUtil.isWebOS() ||
      DeviceUtil.isHisense() ||
      DeviceUtil.isSony() ||
      DeviceUtil.isToshiba() ||
      DeviceUtil.isTiVo() ||
      DeviceUtil.isVideoFutur()
    )
  }

  /**
   * Check if current platform is Apple device
   * @returns True if running on Apple platform
   */
  public isApple(): boolean {
    return DeviceUtil.isApple()
  }

  /**
   * Check if current platform is iOS
   * @returns True if running on iOS
   */
  public isiOS(): boolean {
    if (!DeviceUtil.isApple()) return false
    const userAgent = navigator.userAgent.toLowerCase()
    return (
      userAgent.includes('iphone') ||
      userAgent.includes('ipad') ||
      userAgent.includes('ipod')
    )
  }

  /**
   * Check if current browser is Chrome
   * @returns True if running on Chrome browser
   */
  public isChrome(): boolean {
    return DeviceUtil.isChrome()
  }

  /**
   * Check if current platform is Android
   * @returns True if running on Android platform
   */
  public isAndroid(): boolean {
    if (typeof window === 'undefined') return false
    return navigator.userAgent.toLowerCase().includes('android')
  }

  /**
   * Check if current platform is web browser
   * @returns True if running in a web browser (not on Smart TV)
   */
  public isBrowser(): boolean {
    return this.platformName === PlatformName.Browser
  }

  /**
   * Get platform capabilities
   * @returns Object describing platform capabilities
   */
  public getCapabilities(): {
    hasRemoteControl: boolean
    hasVoiceControl: boolean
    hasTouchInput: boolean
    hasMotionSensor: boolean
    hasBluetooth: boolean
    hasWifi: boolean
  } {
    const isSmartTV = this.isSmartTV()

    return {
      hasRemoteControl: isSmartTV,
      hasVoiceControl:
        this.isTizen() || this.isWebOS() || this.isHisense() || this.isTiVo(),
      hasTouchInput: this.isiOS() || this.isAndroid() || this.isBrowser(),
      hasMotionSensor: this.isTizen() || this.isiOS() || this.isAndroid(),
      hasBluetooth: isSmartTV || this.isiOS() || this.isAndroid(),
      hasWifi: true, // Assume all platforms have wifi
    }
  }

  /**
   * Get platform display name
   * @returns Human-readable platform name
   */
  public getDisplayName(): string {
    const displayNames: Record<PlatformName, string> = {
      [PlatformName.Tizen]: 'Samsung Smart TV (Tizen)',
      [PlatformName.WebOS]: 'LG Smart TV (webOS)',
      [PlatformName.Sony]: 'Sony Smart TV',
      [PlatformName.Panasonic]: 'Panasonic Smart TV',
      [PlatformName.Apple]: 'Apple TV',
      [PlatformName.TiVo]: 'TiVo',
      [PlatformName.Toshiba]: 'Toshiba Smart TV',
      [PlatformName.Browser]: 'Web Browser',
      [PlatformName.iOS]: 'iOS Device',
      [PlatformName.Android]: 'Android Device',
      [PlatformName.Hisense]: 'Hisense Smart TV',
    }

    return displayNames[this.platformName] || 'Unknown Platform'
  }
}

/**
 * Global Platform instance for easy access throughout the application
 * This singleton provides immediate access to platform detection without initialization
 */
export const PlatformInstance: Platform = new Platform()

// Re-export for convenience
export default Platform
