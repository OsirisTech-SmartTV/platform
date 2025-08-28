# @osiris-smarttv/platform

A modern TypeScript library for building Smart TV applications with React ## 🎯 **Compatibility**

### React Support
- ✅ **React 17+** - Full support with automatic JSX runtime
- ✅ **React 18+** - All modern features supported
- 🔄 **React 16** - Legacy support with classic JSX runtime

### Browser Support  
- ✅ **Chromium 53+** (2016+) - Samsung, LG, Sony Smart TVs
- ✅ **Modern browsers** - Chrome, Firefox, Safari, Edge
- 🔧 **Automatic polyfills** for older Smart TV browsers

See [React 17 & Chromium 53+ Compatibility Guide](./docs/React17-Chromium53-Compatibility.md) for detailed information.

### Platform Class (Global Instance)

For direct platform detection without React context, use the global `PlatformInstance`:

```tsx
import { PlatformInstance, PlatformName } from '@osiris-smarttv/platform'

// Get current platform
const platform = PlatformInstance.getPlatformName()

// Check specific platforms
if (PlatformInstance.isTizen()) {
  console.log('Samsung Smart TV detected')
} else if (PlatformInstance.isWebOS()) {
  console.log('LG Smart TV detected')
}

// Get platform capabilities
const capabilities = PlatformInstance.getCapabilities()
console.log('Has remote control:', capabilities.hasRemoteControl)

// Get display name
console.log('Platform:', PlatformInstance.getDisplayName())
```

See the [Platform Usage Guide](./docs/Platform-Usage.md) for detailed examples.

### Components

#### SmartTVProvider

Context provider that wraps your app and provides Smart TV platform information.

```tsx
<SmartTVProvider initialConfig={{ capabilities: { voice: true } }}>
  {/* Your app components */}
</SmartTVProvider>
```

**Props:**
- `children`: React nodes
- `initialConfig?`: Optional initial platform configurationibrary provides cross-platform utilities, components, and hooks for developing applications that work across different Smart TV platforms.

**GitHub Repository:** [OsirisTech-SmartTV/platform](https://github.com/OsirisTech-SmartTV/platform)

## Features

- 🎯 **Cross-Platform Support**: Works with Samsung Tizen, LG webOS, Android TV, Roku, Amazon Fire TV, and more
- ⚛️ **React Integration**: Built-in React components and hooks
- 🎮 **Remote Control Handling**: Unified remote control input management
- 📱 **Platform Detection**: Automatic detection of Smart TV platforms and capabilities
- 💪 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🔧 **Modern Tooling**: Built with Vite, ESLint, Prettier, and Jest
- 📦 **Multiple Formats**: Supports both ESM and CommonJS outputs

## Installation

```bash
npm install @osiris-smarttv/platform
```

```bash
yarn add @osiris-smarttv/platform
```

## Quick Start

### Basic Setup

```tsx
import React from 'react'
import { SmartTVProvider, PlatformDetector, RemoteControl } from '@osiris-smarttv/platform'

function App() {
  return (
    <SmartTVProvider>
      <RemoteControl
        onNavigationKey={(key) => console.log('Navigation key pressed:', key)}
        onMediaKey={(key) => console.log('Media key pressed:', key)}
      >
        <PlatformDetector>
          {(platform) => (
            <div>
              <h1>Smart TV App</h1>
              <p>Running on: {platform.platform}</p>
              <p>Supported: {platform.isSupported ? 'Yes' : 'No'}</p>
            </div>
          )}
        </PlatformDetector>
      </RemoteControl>
    </SmartTVProvider>
  )
}

export default App
```

### Using Hooks

```tsx
import React from 'react'
import { useSmartTV, usePlatform, useRemoteControl } from '@osiris-smarttv/platform'

function MyComponent() {
  const { platform, isReady } = useSmartTV()
  const platformInfo = usePlatform()
  const { startListening, stopListening, onKeyPress } = useRemoteControl()

  React.useEffect(() => {
    const cleanup = onKeyPress((event) => {
      console.log('Key pressed:', event.key)
    })

    startListening()

    return () => {
      cleanup()
      stopListening()
    }
  }, [onKeyPress, startListening, stopListening])

  if (!isReady) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Platform: {platformInfo.platform}</h2>
      <h3>Capabilities:</h3>
      <ul>
        {Object.entries(platformInfo.capabilities || {}).map(([key, value]) => (
          <li key={key}>
            {key}: {value ? 'Supported' : 'Not supported'}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## API Reference

### Components

#### SmartTVProvider

The main provider component that should wrap your entire application.

```tsx
<SmartTVProvider initialConfig={{ capabilities: { voice: true } }}>
  {/* Your app components */}
</SmartTVProvider>
```

**Props:**
- `children`: React nodes
- `initialConfig?`: Optional initial platform configuration

#### RemoteControl

Component that handles remote control input events.

```tsx
<RemoteControl
  onKeyPress={(event) => console.log(event.key)}
  onNavigationKey={(key) => console.log('Navigation:', key)}
  onMediaKey={(key) => console.log('Media:', key)}
  autoStart={true}
>
  {/* Your components */}
</RemoteControl>
```

**Props:**
- `onKeyPress?`: General key press handler
- `onNavigationKey?`: Navigation key handler
- `onMediaKey?`: Media key handler
- `autoStart?`: Auto-start listening (default: true)

#### PlatformDetector

Component for conditional rendering based on platform.

```tsx
<PlatformDetector showUnsupported={false}>
  {(platformInfo) => <div>Platform: {platformInfo.platform}</div>}
</PlatformDetector>
```

### Hooks

#### useSmartTV

Access the Smart TV context.

```tsx
const { platform, config, isReady, error, updateConfig } = useSmartTV()
```

#### usePlatform

Get platform detection information.

```tsx
const { platform, isSupported, capabilities, version } = usePlatform()
```

#### useRemoteControl

Handle remote control input.

```tsx
const { isListening, lastKey, startListening, stopListening, onKeyPress } = useRemoteControl()
```

### Utilities

#### Platform Utils

```tsx
import { detectPlatform, getPlatformConfig, isPlatformSupported } from '@osiris-smarttv/platform'

const platform = detectPlatform()
const config = getPlatformConfig(platform)
const supported = isPlatformSupported(platform)
```

#### Keyboard Utils

```tsx
import { mapKeyboardToRemote, isNavigationKey, isMediaKey } from '@osiris-smarttv/platform'

const remoteKey = mapKeyboardToRemote('ArrowUp')
const isNav = isNavigationKey('ArrowUp')
const isMedia = isMediaKey('Play')
```

#### Device Utils

```tsx
import { DeviceUtil, getUserAgent, checkUserAgent } from '@osiris-smarttv/platform'

// Check specific device types
const isSamsung = DeviceUtil.isTizen()
const isSony = DeviceUtil.isSony()
const isLG = DeviceUtil.isWebOS()

// Check Tizen version
const isTizen4 = DeviceUtil.isTizenVersion(4)

// Browser detection
const isChrome = DeviceUtil.isChrome()
const isEdge = DeviceUtil.isEdge()

// Get user agent
const userAgent = getUserAgent()
const hasCustomString = checkUserAgent('MyCustomTV')
```

## Supported Platforms

| Platform | Status | Voice | Touch | Motion | Bluetooth |
|----------|--------|-------|-------|--------|-----------|
| Samsung Tizen | ✅ | ✅ | ❌ | ✅ | ✅ |
| LG webOS | ✅ | ✅ | ❌ | ❌ | ✅ |
| Sony Smart TV | ✅ | ✅ | ❌ | ❌ | ✅ |
| Toshiba Smart TV | ✅ | ❌ | ❌ | ❌ | ✅ |
| Hisense Smart TV | ✅ | ✅ | ❌ | ❌ | ✅ |
| TiVo | ✅ | ✅ | ❌ | ❌ | ❌ |
| VideoFutur | ✅ | ❌ | ❌ | ❌ | ❌ |
| Android TV | ✅ | ✅ | ✅ | ✅ | ✅ |
| Roku TV | ✅ | ✅ | ❌ | ❌ | ❌ |
| Amazon Fire TV | ✅ | ✅ | ❌ | ❌ | ✅ |
| Google Chromecast | ✅ | ❌ | ❌ | ❌ | ❌ |
| Web Browser | ✅ | ❌ | ✅ | ❌ | ❌ |

## Development

### Prerequisites

- Node.js >= 16
- npm >= 8

### Setup

```bash
git clone <repository-url>
cd smart-tv-library
npm install
```

### Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Test
npm run test
npm run test:watch
npm run test:coverage

# Lint
npm run lint
npm run lint:fix

# Format
npm run format

# Type check
npm run type-check
```

### Project Structure

```
src/
├── components/          # React components
│   ├── SmartTVProvider.tsx
│   ├── RemoteControl.tsx
│   └── PlatformDetector.tsx
├── hooks/              # React hooks
│   ├── useSmartTV.ts
│   ├── usePlatform.ts
│   └── useRemoteControl.ts
├── utils/              # Utility functions
│   ├── platformUtils.ts
│   └── keyboardUtils.ts
├── types.ts            # TypeScript type definitions
└── index.ts            # Main entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for your changes
5. Run tests and linting
6. Submit a pull request

## License

MIT

## Support

For support and questions, please open an issue on GitHub.