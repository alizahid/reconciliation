import React, { FunctionComponent } from 'react'

interface Props {
  className?: string
}

export const Spinner: FunctionComponent<Props> = ({ className }) => (
  <div
    className={`animate-spin h-6 w-6 border-4 border-green-400 rounded-full ${className}`}
    style={{
      borderLeftColor: '#BBF7D0'
    }}
  />
)
