import '@testing-library/jest-dom'

// Mock Smart TV APIs that might not be available in test environment
Object.defineProperty(window, 'navigator', {
  value: {
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    platform: 'Linux x86_64',
  },
  writable: true,
})

// Mock platform-specific APIs
;(globalThis as any).webOS = undefined
;(globalThis as any).tizen = undefined
