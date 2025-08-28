import { useEffect, useState, useCallback, useRef } from 'react'
import {
  mapKeyboardToRemote,
  getPlatformKeyMappings,
} from '../utils/keyboardUtils'
import { usePlatform } from './usePlatform'
import type {
  UseRemoteControlReturn,
  RemoteControlKey,
  RemoteControlEvent,
} from '../types'

/**
 * Hook to handle remote control input
 */
export function useRemoteControl(): UseRemoteControlReturn {
  const [isListening, setIsListening] = useState(false)
  const [lastKey, setLastKey] = useState<RemoteControlKey>()
  const { platform } = usePlatform()
  const callbacksRef = useRef<Set<(event: RemoteControlEvent) => void>>(
    new Set()
  )

  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      // Try standard key mapping first
      let remoteKey = mapKeyboardToRemote(event.key)

      // If no standard mapping, try platform-specific mapping
      if (!remoteKey) {
        const platformMappings = getPlatformKeyMappings(platform)
        remoteKey = platformMappings[event.code] || platformMappings[event.key]
      }

      if (remoteKey) {
        setLastKey(remoteKey)

        const remoteEvent: RemoteControlEvent = {
          key: remoteKey,
          type: event.type as 'keydown' | 'keyup' | 'keypress',
          preventDefault: () => event.preventDefault(),
          stopPropagation: () => event.stopPropagation(),
        }

        // Call all registered callbacks
        callbacksRef.current.forEach(
          (callback: (event: RemoteControlEvent) => void) => {
            try {
              callback(remoteEvent)
            } catch (error) {
              console.error('Error in remote control callback:', error)
            }
          }
        )
      }
    },
    [platform]
  )

  const startListening = useCallback(() => {
    if (!isListening) {
      document.addEventListener('keydown', handleKeyEvent)
      document.addEventListener('keyup', handleKeyEvent)
      setIsListening(true)
    }
  }, [isListening, handleKeyEvent])

  const stopListening = useCallback(() => {
    if (isListening) {
      document.removeEventListener('keydown', handleKeyEvent)
      document.removeEventListener('keyup', handleKeyEvent)
      setIsListening(false)
    }
  }, [isListening, handleKeyEvent])

  const onKeyPress = useCallback(
    (callback: (event: RemoteControlEvent) => void) => {
      callbacksRef.current.add(callback)

      // Return cleanup function
      return () => {
        callbacksRef.current.delete(callback)
      }
    },
    []
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening()
      callbacksRef.current.clear()
    }
  }, [stopListening])

  return {
    isListening,
    lastKey,
    startListening,
    stopListening,
    onKeyPress,
  }
}
