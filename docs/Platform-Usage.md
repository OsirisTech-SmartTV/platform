# Platform Class Usage Examples

This document demonstrates how to use the Platform class and global PlatformInstance in your Smart TV applications.

## Basic Usage

### Import the Platform Class

```typescript
import { Platform, PlatformInstance, PlatformName } from '@osiris-smarttv/platform'
```

### Using the Global Instance

The easiest way to use platform detection is through the global `PlatformInstance`:

```typescript
import { PlatformInstance } from '@osiris-smarttv/platform'

// Get current platform
const currentPlatform = PlatformInstance.getPlatformName()
console.log('Running on:', currentPlatform) // e.g., 'tizen'

// Check specific platforms
if (PlatformInstance.isTizen()) {
  console.log('Running on Samsung Smart TV')
} else if (PlatformInstance.isWebOS()) {
  console.log('Running on LG Smart TV')
} else if (PlatformInstance.isSmartTV()) {
  console.log('Running on some Smart TV platform')
} else {
  console.log('Running in web browser')
}
```

### Creating Your Own Instance

You can also create your own Platform instance:

```typescript
import { Platform } from '@osiris-smarttv/platform'

const platform = new Platform()
const platformName = platform.getPlatformName()
```

## Platform Detection Methods

### Smart TV Platform Detection

```typescript
import { PlatformInstance } from '@osiris-smarttv/platform'

// Check for specific Smart TV platforms
const isSamsungTV = PlatformInstance.isTizen()
const isLGTV = PlatformInstance.isWebOS()
const isSonyTV = PlatformInstance.isSony()
const isHisenseTV = PlatformInstance.isHisense()
const isToshibaTV = PlatformInstance.isToshiba()
const isTiVo = PlatformInstance.isTiVo()

// Check if running on any Smart TV
const isAnySmartTV = PlatformInstance.isSmartTV()
```

### Mobile and Browser Detection

```typescript
import { PlatformInstance } from '@osiris-smarttv/platform'

// Check for mobile platforms
const isAppleDevice = PlatformInstance.isApple()
const isiOSDevice = PlatformInstance.isiOS()
const isAndroidDevice = PlatformInstance.isAndroid()

// Check for web browser
const isWebBrowser = PlatformInstance.isBrowser()
const isChromeeBrowser = PlatformInstance.isChrome()
```

## Platform Capabilities

Get information about what the current platform supports:

```typescript
import { PlatformInstance } from '@osiris-smarttv/platform'

const capabilities = PlatformInstance.getCapabilities()

console.log('Platform capabilities:', {
  remoteControl: capabilities.hasRemoteControl,     // Smart TV remote control
  voiceControl: capabilities.hasVoiceControl,       // Voice commands
  touchInput: capabilities.hasTouchInput,           // Touch screen
  motionSensor: capabilities.hasMotionSensor,       // Motion/gesture detection
  bluetooth: capabilities.hasBluetooth,             // Bluetooth connectivity
  wifi: capabilities.hasWifi                        // WiFi connectivity
})

// Use capabilities to enable/disable features
if (capabilities.hasRemoteControl) {
  // Enable remote control navigation
  enableRemoteControlNavigation()
}

if (capabilities.hasTouchInput) {
  // Enable touch gestures
  enableTouchGestures()
}
```

## Display Names

Get human-readable platform names:

```typescript
import { PlatformInstance } from '@osiris-smarttv/platform'

const displayName = PlatformInstance.getDisplayName()
console.log('Platform:', displayName)
// Examples:
// "Samsung Smart TV (Tizen)"
// "LG Smart TV (webOS)"
// "Sony Smart TV"
// "Web Browser"
// "iOS Device"
```

## Platform Enum Usage

Use the PlatformName enum for type-safe comparisons:

```typescript
import { PlatformInstance, PlatformName } from '@osiris-smarttv/platform'

const currentPlatform = PlatformInstance.getPlatformName()

switch (currentPlatform) {
  case PlatformName.Tizen:
    // Samsung Smart TV specific code
    setupTizenFeatures()
    break
    
  case PlatformName.WebOS:
    // LG Smart TV specific code
    setupWebOSFeatures()
    break
    
  case PlatformName.Sony:
    // Sony Smart TV specific code
    setupSonyFeatures()
    break
    
  case PlatformName.Browser:
    // Web browser specific code
    setupWebFeatures()
    break
    
  case PlatformName.iOS:
    // iOS specific code
    setupiOSFeatures()
    break
    
  case PlatformName.Android:
    // Android specific code
    setupAndroidFeatures()
    break
    
  default:
    // Unknown platform fallback
    setupDefaultFeatures()
}
```

## React Component Examples

### Conditional Rendering Based on Platform

```typescript
import React from 'react'
import { PlatformInstance } from '@osiris-smarttv/platform'

const MyComponent: React.FC = () => {
  const isSmartTV = PlatformInstance.isSmartTV()
  const capabilities = PlatformInstance.getCapabilities()
  
  return (
    <div>
      <h1>Welcome to {PlatformInstance.getDisplayName()}</h1>
      
      {isSmartTV && (
        <div className="remote-control-hints">
          <p>Use your remote control to navigate</p>
        </div>
      )}
      
      {capabilities.hasTouchInput && (
        <div className="touch-controls">
          <button>Touch me!</button>
        </div>
      )}
      
      {capabilities.hasVoiceControl && (
        <div className="voice-control">
          <button>🎤 Voice Commands Available</button>
        </div>
      )}
    </div>
  )
}
```

### Platform-Specific Styling

```typescript
import React from 'react'
import { PlatformInstance, PlatformName } from '@osiris-smarttv/platform'

const PlatformAwareComponent: React.FC = () => {
  const platform = PlatformInstance.getPlatformName()
  
  const getClassName = () => {
    const baseClass = 'my-component'
    
    switch (platform) {
      case PlatformName.Tizen:
        return `${baseClass} ${baseClass}--tizen`
      case PlatformName.WebOS:
        return `${baseClass} ${baseClass}--webos`
      case PlatformName.Browser:
        return `${baseClass} ${baseClass}--browser`
      default:
        return baseClass
    }
  }
  
  return (
    <div className={getClassName()}>
      Platform-specific styling applied!
    </div>
  )
}
```

## Advanced Usage

### Custom Platform Detection Logic

```typescript
import { Platform, PlatformInstance } from '@osiris-smarttv/platform'

class CustomPlatformManager {
  private platform: Platform
  
  constructor() {
    this.platform = PlatformInstance
  }
  
  getOptimizedSettings() {
    const capabilities = this.platform.getCapabilities()
    
    return {
      // Optimize for Smart TV remote control
      focusManagement: capabilities.hasRemoteControl,
      
      // Enable touch gestures only where supported
      touchGestures: capabilities.hasTouchInput,
      
      // Adjust UI scale for TV screens
      uiScale: this.platform.isSmartTV() ? 'large' : 'normal',
      
      // Enable voice features where available
      voiceCommands: capabilities.hasVoiceControl,
      
      // Platform-specific navigation
      navigationMode: this.getNavigationMode(),
    }
  }
  
  private getNavigationMode() {
    if (this.platform.isSmartTV()) {
      return 'remote'
    } else if (this.platform.isiOS() || this.platform.isAndroid()) {
      return 'touch'
    } else {
      return 'mouse'
    }
  }
}

const platformManager = new CustomPlatformManager()
const settings = platformManager.getOptimizedSettings()
```

## Error Handling

The Platform class handles errors gracefully and falls back to browser detection:

```typescript
import { PlatformInstance } from '@osiris-smarttv/platform'

try {
  const platform = PlatformInstance.getPlatformName()
  const capabilities = PlatformInstance.getCapabilities()
  
  // Platform detection succeeded
  console.log('Platform detected:', platform)
} catch (error) {
  // This shouldn't happen as Platform handles errors internally,
  // but you can add additional error handling if needed
  console.error('Platform detection error:', error)
  
  // Fallback behavior
  console.log('Falling back to browser mode')
}
```

## Integration with SmartTVProvider

The Platform class works seamlessly with the SmartTVProvider:

```typescript
import React from 'react'
import { SmartTVProvider, PlatformInstance } from '@osiris-smarttv/platform'

const App: React.FC = () => {
  // Get initial configuration based on platform
  const initialConfig = {
    version: '1.0.0',
    capabilities: PlatformInstance.getCapabilities(),
    customSettings: {
      platformName: PlatformInstance.getDisplayName(),
      optimizedForTV: PlatformInstance.isSmartTV(),
    }
  }
  
  return (
    <SmartTVProvider initialConfig={initialConfig}>
      <MyAppContent />
    </SmartTVProvider>
  )
}
```

This global Platform instance provides a consistent, easy-to-use interface for platform detection throughout your Smart TV application!