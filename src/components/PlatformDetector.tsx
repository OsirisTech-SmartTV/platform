import React from 'react'
import { usePlatform } from '../hooks/usePlatform'
import { getPlatformDisplayName } from '../utils/platformUtils'

interface PlatformDetectorProps {
  children?:
    | React.ReactNode
    | ((platform: ReturnType<typeof usePlatform>) => React.ReactNode)
  fallback?: React.ReactNode
  showUnsupported?: boolean
}

/**
 * Component that detects platform and conditionally renders content
 */
const PlatformDetector: React.FC<PlatformDetectorProps> = ({
  children,
  fallback = null,
  showUnsupported = true,
}): React.ReactNode | JSX.Element => {
  const platformInfo = usePlatform()

  // If platform is not supported and we don't want to show unsupported platforms
  if (!platformInfo.isSupported && !showUnsupported) {
    return <>{fallback}</>
  }

  // If children is a render prop function
  if (typeof children === 'function') {
    return <>{children(platformInfo)}</>
  }

  // Default display
  if (!children) {
    return (
      <div className="platform-detector">
        <h3>Platform Information</h3>
        <p>
          <strong>Platform:</strong>{' '}
          {getPlatformDisplayName(platformInfo.platform)}
        </p>
        <p>
          <strong>Supported:</strong> {platformInfo.isSupported ? 'Yes' : 'No'}
        </p>
        {platformInfo.version && (
          <p>
            <strong>Version:</strong> {platformInfo.version}
          </p>
        )}
        {platformInfo.capabilities && (
          <div>
            <strong>Capabilities:</strong>
            <ul>
              {Object.entries(platformInfo.capabilities).map(
                ([capability, supported]) => (
                  <li key={capability}>
                    {capability}: {supported ? 'Yes' : 'No'}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}

export default PlatformDetector
