/**
 * @jest-environment jsdom
 */
import { Platform, PlatformInstance, PlatformName } from '../utils/Platform'

// Mock the DeviceUtil
jest.mock('../utils/deviceUtils', () => ({
  DeviceUtil: {
    isTizen: jest.fn(() => false),
    isWebOS: jest.fn(() => false),
    isHisense: jest.fn(() => false),
    isSony: jest.fn(() => false),
    isToshiba: jest.fn(() => false),
    isTiVo: jest.fn(() => false),
    isVideoFutur: jest.fn(() => false),
    isApple: jest.fn(() => false),
    isChrome: jest.fn(() => false),
  },
}))

describe('Platform', () => {
  let platform: Platform

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks()

    // Mock navigator.userAgent
    Object.defineProperty(global.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      writable: true,
    })

    platform = new Platform()
  })

  describe('Platform Detection', () => {
    it('should detect Tizen platform', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isTizen.mockReturnValue(true)

      const tizenPlatform = new Platform()
      expect(tizenPlatform.getPlatformName()).toBe(PlatformName.Tizen)
      expect(tizenPlatform.isTizen()).toBe(true)
      expect(tizenPlatform.isSmartTV()).toBe(true)
    })

    it('should detect webOS platform', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isWebOS.mockReturnValue(true)

      const webOSPlatform = new Platform()
      expect(webOSPlatform.getPlatformName()).toBe(PlatformName.WebOS)
      expect(webOSPlatform.isWebOS()).toBe(true)
      expect(webOSPlatform.isSmartTV()).toBe(true)
    })

    it('should detect Hisense platform', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isHisense.mockReturnValue(true)

      const hisensePlatform = new Platform()
      expect(hisensePlatform.getPlatformName()).toBe(PlatformName.Hisense)
      expect(hisensePlatform.isHisense()).toBe(true)
      expect(hisensePlatform.isSmartTV()).toBe(true)
    })

    it('should detect Sony platform', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isSony.mockReturnValue(true)

      const sonyPlatform = new Platform()
      expect(sonyPlatform.getPlatformName()).toBe(PlatformName.Sony)
      expect(sonyPlatform.isSony()).toBe(true)
      expect(sonyPlatform.isSmartTV()).toBe(true)
    })

    it('should detect Apple/iOS platform', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isApple.mockReturnValue(true)

      // Mock iOS user agent
      Object.defineProperty(global.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        writable: true,
      })

      const applePlatform = new Platform()
      expect(applePlatform.getPlatformName()).toBe(PlatformName.iOS)
      expect(applePlatform.isApple()).toBe(true)
      expect(applePlatform.isiOS()).toBe(true)
    })

    it('should detect Android platform', () => {
      // Mock Android user agent
      Object.defineProperty(global.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Linux; Android 10; SM-G975F)',
        writable: true,
      })

      const androidPlatform = new Platform()
      expect(androidPlatform.getPlatformName()).toBe(PlatformName.Android)
      expect(androidPlatform.isAndroid()).toBe(true)
    })

    it('should default to Browser platform', () => {
      expect(platform.getPlatformName()).toBe(PlatformName.Browser)
      expect(platform.isBrowser()).toBe(true)
      expect(platform.isSmartTV()).toBe(false)
    })
  })

  describe('Platform Capabilities', () => {
    it('should return correct capabilities for Smart TV', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isTizen.mockReturnValue(true)

      const tizenPlatform = new Platform()
      const capabilities = tizenPlatform.getCapabilities()

      expect(capabilities.hasRemoteControl).toBe(true)
      expect(capabilities.hasVoiceControl).toBe(true)
      expect(capabilities.hasTouchInput).toBe(false)
      expect(capabilities.hasMotionSensor).toBe(true)
      expect(capabilities.hasBluetooth).toBe(true)
      expect(capabilities.hasWifi).toBe(true)
    })

    it('should return correct capabilities for Browser', () => {
      const capabilities = platform.getCapabilities()

      expect(capabilities.hasRemoteControl).toBe(false)
      expect(capabilities.hasVoiceControl).toBe(false)
      expect(capabilities.hasTouchInput).toBe(true)
      expect(capabilities.hasMotionSensor).toBe(false)
      expect(capabilities.hasBluetooth).toBe(false)
      expect(capabilities.hasWifi).toBe(true)
    })

    it('should return correct capabilities for iOS', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isApple.mockReturnValue(true)

      Object.defineProperty(global.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        writable: true,
      })

      const iosPlatform = new Platform()
      const capabilities = iosPlatform.getCapabilities()

      expect(capabilities.hasRemoteControl).toBe(false)
      expect(capabilities.hasVoiceControl).toBe(false)
      expect(capabilities.hasTouchInput).toBe(true)
      expect(capabilities.hasMotionSensor).toBe(true)
      expect(capabilities.hasBluetooth).toBe(true)
      expect(capabilities.hasWifi).toBe(true)
    })
  })

  describe('Display Names', () => {
    it('should return correct display name for Tizen', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isTizen.mockReturnValue(true)

      const tizenPlatform = new Platform()
      expect(tizenPlatform.getDisplayName()).toBe('Samsung Smart TV (Tizen)')
    })

    it('should return correct display name for Browser', () => {
      expect(platform.getDisplayName()).toBe('Web Browser')
    })
  })

  describe('Error Handling', () => {
    it('should handle platform detection errors gracefully', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isTizen.mockImplementation(() => {
        throw new Error('Detection failed')
      })

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      const errorPlatform = new Platform()
      expect(errorPlatform.getPlatformName()).toBe(PlatformName.Browser)
      expect(consoleSpy).toHaveBeenCalledWith(
        'Platform detection failed:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('Global PlatformInstance', () => {
    it('should provide a global singleton instance', () => {
      expect(PlatformInstance).toBeInstanceOf(Platform)
      expect(PlatformInstance.getPlatformName()).toBeDefined()
    })

    it('should be the same instance on multiple accesses', () => {
      const instance1 = PlatformInstance
      const instance2 = PlatformInstance
      expect(instance1).toBe(instance2)
    })
  })

  describe('Utility Methods', () => {
    it('should check Chrome browser correctly', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isChrome.mockReturnValue(true)

      expect(platform.isChrome()).toBe(true)
    })

    it('should check TiVo platform correctly', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isTiVo.mockReturnValue(true)

      const tivoPlatform = new Platform()
      expect(tivoPlatform.isTiVo()).toBe(true)
      expect(tivoPlatform.isSmartTV()).toBe(true)
    })

    it('should check Toshiba platform correctly', () => {
      const { DeviceUtil } = require('../utils/deviceUtils')
      DeviceUtil.isToshiba.mockReturnValue(true)

      const toshibaPlatform = new Platform()
      expect(toshibaPlatform.isToshiba()).toBe(true)
      expect(toshibaPlatform.isSmartTV()).toBe(true)
    })
  })
})
