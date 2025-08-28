/**
 * @jest-environment jsdom
 */
import { detectPlatform, getPlatformConfig, isPlatformSupported } from '../utils/platformUtils'

// Mock navigator
Object.defineProperty(window, 'navigator', {
  value: {
    userAgent: '',
    platform: '',
  },
  writable: true,
})

describe('platformUtils', () => {
  beforeEach(() => {
    // Reset navigator mock
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: '',
        platform: '',
      },
      writable: true,
    })
  })

  describe('detectPlatform', () => {
    it('should detect Tizen platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36 Samsung'
      expect(detectPlatform()).toBe('tizen')
    })

    it('should detect webOS platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 LG Browser'
      expect(detectPlatform()).toBe('webos')
    })

    it('should detect Sony platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (Linux; U; Android 9; Sony Build/JDQ39) AppleWebKit/534.30'
      expect(detectPlatform()).toBe('sony')
    })

    it('should detect Toshiba platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (Unknown; Linux armv7l) AppleWebKit/537.1+ TSBNetTV/1.0'
      expect(detectPlatform()).toBe('toshiba')
    })

    it('should detect Hisense platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (Linux; U; Android 9; Hisense_H9809) AppleWebKit/537.36'
      expect(detectPlatform()).toBe('hisense')
    })

    it('should detect TiVo platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (Linux; Android 7.1; TiVo_TCDA93000) AppleWebKit/537.36'
      expect(detectPlatform()).toBe('tivo')
    })

    it('should detect VideoFutur platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (Linux; U; Android 4.4.2; VITIS) AppleWebKit/534.30'
      expect(detectPlatform()).toBe('videofutur')
    })

    it('should detect Chromecast platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (CrKey armv7l 1.5.16041) AppleWebKit/537.36'
      expect(detectPlatform()).toBe('chromecast')
    })

    it('should detect Android TV platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (Linux; Android 9; Android TV) AppleWebKit/537.36'
      expect(detectPlatform()).toBe('android')
    })

    it('should detect browser platform', () => {
      ;(window.navigator as any).userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      ;(window.navigator as any).platform = 'Win32'
      expect(detectPlatform()).toBe('browser')
    })

    it('should return unknown for unrecognized platforms', () => {
      ;(window.navigator as any).userAgent = 'Unknown Device'
      ;(window.navigator as any).platform = 'Unknown'
      expect(detectPlatform()).toBe('unknown')
    })
  })

  describe('getPlatformConfig', () => {
    it('should return Tizen config with correct capabilities', () => {
      const config = getPlatformConfig('tizen')
      expect(config.platform).toBe('tizen')
      expect(config.capabilities?.voice).toBe(true)
      expect(config.capabilities?.touch).toBe(false)
      expect(config.capabilities?.bluetooth).toBe(true)
    })

    it('should return Sony config with correct capabilities', () => {
      const config = getPlatformConfig('sony')
      expect(config.platform).toBe('sony')
      expect(config.capabilities?.voice).toBe(true)
      expect(config.capabilities?.touch).toBe(false)
      expect(config.capabilities?.bluetooth).toBe(true)
    })

    it('should return Hisense config with correct capabilities', () => {
      const config = getPlatformConfig('hisense')
      expect(config.platform).toBe('hisense')
      expect(config.capabilities?.voice).toBe(true)
      expect(config.capabilities?.bluetooth).toBe(true)
    })

    it('should return TiVo config with correct capabilities', () => {
      const config = getPlatformConfig('tivo')
      expect(config.platform).toBe('tivo')
      expect(config.capabilities?.voice).toBe(true)
      expect(config.capabilities?.bluetooth).toBe(false)
    })

    it('should return unknown config for unknown platform', () => {
      const config = getPlatformConfig('unknown')
      expect(config.platform).toBe('unknown')
      expect(config.capabilities?.voice).toBe(false)
    })
  })

  describe('isPlatformSupported', () => {
    it('should return true for supported platforms', () => {
      expect(isPlatformSupported('tizen')).toBe(true)
      expect(isPlatformSupported('webos')).toBe(true)
      expect(isPlatformSupported('android')).toBe(true)
      expect(isPlatformSupported('sony')).toBe(true)
      expect(isPlatformSupported('hisense')).toBe(true)
      expect(isPlatformSupported('tivo')).toBe(true)
    })

    it('should return false for unknown platform', () => {
      expect(isPlatformSupported('unknown')).toBe(false)
    })
  })
})