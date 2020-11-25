import React, { FunctionComponent } from 'react'

interface Props {
  reset: boolean

  onReset: () => void
}

export const Header: FunctionComponent<Props> = ({ onReset, reset }) => (
  <header className="flex items-center justify-between m-8">
    <h1 className="font-semibold text-2xl">Reconciliation</h1>
    {reset && (
      <button
        className="rounded-full shadow-sm bg-red-200 py-2 px-4 font-medium"
        onClick={() => onReset()}>
        Start over
      </button>
    )}
  </header>
)
