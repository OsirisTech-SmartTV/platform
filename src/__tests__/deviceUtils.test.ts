/**
 * @jest-environment jsdom
 */
import { DeviceUtil } from '../utils/deviceUtils'

// Mock navigator
Object.defineProperty(window, 'navigator', {
  value: {
    userAgent: '',
    vendor: '',
  },
  writable: true,
})

describe('DeviceUtil', () => {
  beforeEach(() => {
    // Reset navigator mock
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: '',
        vendor: '',
      },
      writable: true,
    })
  })

  describe('TV manufacturer detection', () => {
    it('should detect Toshiba devices', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Unknown; Linux armv7l) AppleWebKit/537.1+ (KHTML, like Gecko) Safari/537.1+ TSBNetTV/1.0'
      expect(DeviceUtil.isToshiba()).toBe(true)
    })

    it('should detect Sony devices', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; Sony Build/JDQ39) AppleWebKit/534.30'
      expect(DeviceUtil.isSony()).toBe(true)
    })

    it('should detect webOS devices', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36'
      expect(DeviceUtil.isWebOS()).toBe(true)
    })

    it('should detect Tizen devices', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36'
      expect(DeviceUtil.isTizen()).toBe(true)
    })

    it('should detect Hisense devices', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Linux; U; Android 9; Hisense_H9809_US) AppleWebKit/537.36'
      expect(DeviceUtil.isHisense()).toBe(true)
    })

    it('should detect TiVo devices', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Linux; Android 7.1; TiVo_TCDA93000) AppleWebKit/537.36'
      expect(DeviceUtil.isTiVo()).toBe(true)
    })

    it('should detect VideoFutur devices', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Linux; U; Android 4.4.2; VITIS) AppleWebKit/534.30'
      expect(DeviceUtil.isVideoFutur()).toBe(true)
    })

    it('should detect Chromecast devices', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (CrKey armv7l 1.5.16041) AppleWebKit/537.36'
      expect(DeviceUtil.isChromecast()).toBe(true)
    })
  })

  describe('Browser detection', () => {
    it('should detect Chrome browser', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      expect(DeviceUtil.isChrome()).toBe(true)
    })

    it('should detect Edge browser', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59'
      expect(DeviceUtil.isEdge()).toBe(true)
      expect(DeviceUtil.isChrome()).toBe(false) // Should not detect as Chrome when Edge
    })

    it('should detect Internet Explorer', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko'
      expect(DeviceUtil.isIE()).toBe(true)
    })

    it('should detect Apple devices', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'
      ;(window.navigator as any).vendor = 'Apple Computer, Inc.'
      expect(DeviceUtil.isApple()).toBe(true)
    })
  })

  describe('Tizen version detection', () => {
    it('should detect specific Tizen version', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (SMART-TV; LINUX; Tizen 4.0) AppleWebKit/537.36'
      expect(DeviceUtil.isTizenVersion(4)).toBe(true)
      expect(DeviceUtil.isTizenVersion(3)).toBe(false)
      expect(DeviceUtil.isTizenVersion(5)).toBe(false)
    })

    it('should return false for Tizen version less than 2', () => {
      expect(DeviceUtil.isTizenVersion(1)).toBe(false)
      expect(DeviceUtil.isTizenVersion(0)).toBe(false)
    })

    it('should handle string version numbers', () => {
      ;(window.navigator as any).userAgent =
        'Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36'
      expect(DeviceUtil.isTizenVersion('6')).toBe(true)
      expect(DeviceUtil.isTizenVersion('5')).toBe(false)
    })
  })
})
