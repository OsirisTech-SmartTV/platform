import React, { useEffect } from 'react'
import { useRemoteControl } from '../hooks/useRemoteControl'
import type { RemoteControlEvent, RemoteControlKey } from '../types'

interface RemoteControlProps {
  onKeyPress?: (event: RemoteControlEvent) => void
  onNavigationKey?: (key: RemoteControlKey) => void
  onMediaKey?: (key: RemoteControlKey) => void
  autoStart?: boolean
  children?: React.ReactNode
}

/**
 * Component that handles remote control input
 */
const RemoteControl: React.FC<RemoteControlProps> = ({
  onKeyPress,
  onNavigationKey,
  onMediaKey,
  autoStart = true,
  children,
}) => {
  const { startListening, stopListening, onKeyPress: addKeyPressListener } = useRemoteControl()

  useEffect(() => {
    if (autoStart) {
      startListening()
    }

    return () => {
      stopListening()
    }
  }, [autoStart, startListening, stopListening])

  useEffect(() => {
    if (!onKeyPress && !onNavigationKey && !onMediaKey) {
      return
    }

    const cleanup = addKeyPressListener((event: RemoteControlEvent) => {
      // Call general key press handler
      onKeyPress?.(event)

      // Call specific handlers based on key type
      const { key } = event
      const navigationKeys: RemoteControlKey[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Back']
      const mediaKeys: RemoteControlKey[] = ['Play', 'Pause', 'Stop', 'Rewind', 'FastForward', 'Record']

      if (navigationKeys.includes(key)) {
        onNavigationKey?.(key)
      } else if (mediaKeys.includes(key)) {
        onMediaKey?.(key)
      }
    })

    return cleanup
  }, [onKeyPress, onNavigationKey, onMediaKey, addKeyPressListener])

  return <>{children}</>
}

export default RemoteControl