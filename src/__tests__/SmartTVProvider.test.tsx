/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import SmartTVProvider, { SmartTVContext } from '../components/SmartTVProvider'
import { useContext } from 'react'

// Mock the platform detection
jest.mock('../utils/platformUtils', () => ({
  detectPlatform: jest.fn(() => 'tizen'),
  getPlatformConfig: jest.fn(() => ({
    platform: 'tizen',
    userAgent: 'mock-agent',
    capabilities: {
      voice: true,
      touch: false,
      motion: true,
      bluetooth: true,
      wifi: true,
    },
  })),
}))

// Test component to access context
function TestComponent() {
  const context = useContext(SmartTVContext)
  if (!context) {
    return <div>No context</div>
  }
  
  return (
    <div>
      <div data-testid="platform">{context.platform}</div>
      <div data-testid="ready">{context.isReady ? 'ready' : 'not-ready'}</div>
      <div data-testid="voice">{context.config.capabilities?.voice ? 'has-voice' : 'no-voice'}</div>
    </div>
  )
}

describe('SmartTVProvider', () => {
  it('should provide context to children', async () => {
    render(
      <SmartTVProvider>
        <TestComponent />
      </SmartTVProvider>
    )

    // Wait for the provider to initialize
    await screen.findByTestId('platform')
    
    expect(screen.getByTestId('platform')).toHaveTextContent('tizen')
    expect(screen.getByTestId('ready')).toHaveTextContent('ready')
    expect(screen.getByTestId('voice')).toHaveTextContent('has-voice')
  })

  it('should merge initial config with platform config', async () => {
    const initialConfig = {
      capabilities: {
        voice: false, // Override platform config
        customFeature: true,
      },
    }

    function TestConfigComponent() {
      const context = useContext(SmartTVContext)
      if (!context) return <div>No context</div>
      
      return (
        <div>
          <div data-testid="voice">{context.config.capabilities?.voice ? 'has-voice' : 'no-voice'}</div>
          <div data-testid="custom">{(context.config.capabilities as any)?.customFeature ? 'has-custom' : 'no-custom'}</div>
        </div>
      )
    }

    render(
      <SmartTVProvider initialConfig={initialConfig}>
        <TestConfigComponent />
      </SmartTVProvider>
    )

    await screen.findByTestId('voice')
    
    expect(screen.getByTestId('voice')).toHaveTextContent('no-voice') // Should be overridden
    expect(screen.getByTestId('custom')).toHaveTextContent('has-custom') // Should be added
  })

  it('should update config when updateConfig is called', async () => {
    function TestUpdateComponent() {
      const context = useContext(SmartTVContext)
      if (!context) return <div>No context</div>
      
      const handleUpdate = () => {
        context.updateConfig({
          version: '2.0.0',
          capabilities: {
            voice: false,
          },
        })
      }
      
      return (
        <div>
          <div data-testid="version">{context.config.version || 'no-version'}</div>
          <button onClick={handleUpdate} data-testid="update-btn">Update</button>
        </div>
      )
    }

    render(
      <SmartTVProvider>
        <TestUpdateComponent />
      </SmartTVProvider>
    )

    await screen.findByTestId('version')
    expect(screen.getByTestId('version')).toHaveTextContent('no-version')

    // Click update button
    screen.getByTestId('update-btn').click()

    expect(screen.getByTestId('version')).toHaveTextContent('2.0.0')
  })

  it('should handle errors gracefully', async () => {
    // Mock an error in platform detection
    const { detectPlatform } = require('../utils/platformUtils')
    detectPlatform.mockImplementationOnce(() => {
      throw new Error('Platform detection failed')
    })

    function TestErrorComponent() {
      const context = useContext(SmartTVContext)
      if (!context) return <div>No context</div>
      
      return (
        <div>
          <div data-testid="ready">{context.isReady ? 'ready' : 'not-ready'}</div>
          <div data-testid="error">{context.error || 'no-error'}</div>
        </div>
      )
    }

    render(
      <SmartTVProvider>
        <TestErrorComponent />
      </SmartTVProvider>
    )

    await screen.findByTestId('ready')
    
    expect(screen.getByTestId('ready')).toHaveTextContent('not-ready')
    expect(screen.getByTestId('error')).toHaveTextContent('Platform detection failed')
  })
})