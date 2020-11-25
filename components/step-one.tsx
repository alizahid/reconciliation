import React, { FunctionComponent, useState } from 'react'

import { ParsedFiles } from '../types'
import { Spinner } from './spinner'

interface Props {
  onParse: (files: ParsedFiles) => void
}

export const StepOne: FunctionComponent<Props> = ({ onParse }) => {
  const [loading, setLoading] = useState(false)

  const [bank, setBank] = useState<File>()
  const [books, setBooks] = useState<File>()

  return (
    <>
      <p>
        Upload your exports from bank and accounting software in CSV format.
      </p>
      <form
        className="flex flex-col items-start mt-8"
        onSubmit={async (event) => {
          event.preventDefault()

          const body = new FormData()

          body.append('bank', bank)
          body.append('books', books)

          setLoading(true)

          const response = await fetch('/api/upload', {
            body,
            method: 'POST'
          })

          const json = await response.json()

          setLoading(false)

          onParse(json)
        }}>
        <label className="flex items-center bg-gradient-to-br from-blue-100 to-blue-200 py-2 px-4 rounded-full shadow-sm">
          <h3 className="font-medium">Bank file</h3>
          <span className="ml-4">{bank?.name ?? 'Upload'}</span>
          <input
            accept=".csv"
            className="absolute"
            onChange={(event) => setBank(event.target.files[0])}
            required
            style={{
              left: -9999,
              top: -9999
            }}
            type="file"
          />
        </label>
        <label className="flex items-center mt-4 bg-gradient-to-br from-red-100 to-red-200 py-2 px-4 rounded-full shadow-sm">
          <h3 className="font-medium">Books file</h3>
          <span className="ml-4">{books?.name ?? 'Upload'}</span>
          <input
            accept=".csv"
            className="absolute"
            onChange={(event) => setBooks(event.target.files[0])}
            required
            style={{
              left: -9999,
              top: -9999
            }}
            type="file"
          />
        </label>
        {loading ? (
          <Spinner className="mt-8" />
        ) : (
          <button className="mt-8 rounded-full shadow-sm bg-gradient-to-br from-green-100 to-green-200 py-2 px-4 font-medium">
            Upload
          </button>
        )}
      </form>
    </>
  )
}
