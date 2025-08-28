import React from 'react'
import {
  SmartTVProvider,
  PlatformDetector,
  RemoteControl,
  useSmartTV,
  usePlatform,
  useRemoteControl,
} from '../src'

// Example component demonstrating basic usage
function BasicExample() {
  return (
    <SmartTVProvider>
      <RemoteControl
        onNavigationKey={(key) => console.log('Navigation:', key)}
        onMediaKey={(key) => console.log('Media:', key)}
      >
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Osiris Smart TV Library Demo</h1>
          
          <PlatformDetector>
            {(platform) => (
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <h2>Platform Information</h2>
                <p><strong>Platform:</strong> {platform.platform}</p>
                <p><strong>Supported:</strong> {platform.isSupported ? '✅ Yes' : '❌ No'}</p>
                {platform.version && <p><strong>Version:</strong> {platform.version}</p>}
                
                {platform.capabilities && (
                  <div>
                    <h3>Capabilities:</h3>
                    <ul>
                      {Object.entries(platform.capabilities).map(([capability, supported]) => (
                        <li key={capability}>
                          <strong>{capability}:</strong> {supported ? '✅ Supported' : '❌ Not supported'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </PlatformDetector>

          <RemoteControlDemo />
        </div>
      </RemoteControl>
    </SmartTVProvider>
  )
}

// Component demonstrating remote control handling
function RemoteControlDemo() {
  const { isListening, lastKey, startListening, stopListening, onKeyPress } = useRemoteControl()
  const [pressedKeys, setPressedKeys] = React.useState<string[]>([])

  React.useEffect(() => {
    const cleanup = onKeyPress((event) => {
      setPressedKeys(prev => [...prev.slice(-9), `${event.key} (${event.type})`])
    })

    return cleanup
  }, [onKeyPress])

  return (
    <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #007acc', borderRadius: '8px' }}>
      <h2>Remote Control Demo</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={isListening ? stopListening : startListening}
          style={{
            padding: '10px 20px',
            backgroundColor: isListening ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        
        <span style={{ marginLeft: '15px', fontSize: '14px' }}>
          Status: {isListening ? '🟢 Listening' : '🔴 Not listening'}
        </span>
      </div>

      {lastKey && (
        <p><strong>Last Key:</strong> {lastKey}</p>
      )}

      <div>
        <h3>Recent Key Presses:</h3>
        <div style={{ 
          height: '150px', 
          overflowY: 'auto', 
          border: '1px solid #ccc', 
          padding: '10px',
          backgroundColor: '#f9f9f9',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          {pressedKeys.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              Press any key on your remote or keyboard to see events...
            </p>
          ) : (
            pressedKeys.map((key, index) => (
              <div key={index}>{key}</div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p><strong>Try these keys:</strong></p>
        <ul style={{ margin: '5px 0' }}>
          <li>Arrow keys (Up/Down/Left/Right)</li>
          <li>Enter key</li>
          <li>Escape key (Back)</li>
          <li>Space bar (Play/Pause)</li>
          <li>F1-F4 (Colored buttons)</li>
        </ul>
      </div>
    </div>
  )
}

// Advanced example with context usage
function AdvancedExample() {
  const { platform, config, isReady, updateConfig } = useSmartTV()
  const platformInfo = usePlatform()

  if (!isReady) {
    return <div>Loading Smart TV platform...</div>
  }

  return (
    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4f8', borderRadius: '8px' }}>
      <h2>Advanced Context Usage</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Context Platform:</strong> {platform}</p>
        <p><strong>Platform Info:</strong> {platformInfo.platform}</p>
        <p><strong>User Agent:</strong> {config.userAgent}</p>
      </div>

      <button
        onClick={() => updateConfig({ version: '2.0.0' })}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Update Config Version
      </button>

      {config.version && (
        <p style={{ marginTop: '10px' }}>
          <strong>Current Version:</strong> {config.version}
        </p>
      )}
    </div>
  )
}

// Main example app
function ExampleApp() {
  return (
    <div>
      <BasicExample />
      <SmartTVProvider>
        <AdvancedExample />
      </SmartTVProvider>
    </div>
  )
}

export default ExampleApp