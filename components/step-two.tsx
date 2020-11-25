import React, { FunctionComponent, useState } from 'react'

import { ParsedBank, ParsedBooks, ReconciledData } from '../types'

interface Props {
  bank: ParsedBank
  books: ParsedBooks

  onReconile: (data: ReconciledData) => void
}

export const StepTwo: FunctionComponent<Props> = ({
  bank,
  books,
  onReconile
}) => {
  const [bankAmountField, setBankAmountField] = useState<string>()
  const [bankDateField, setBankDateField] = useState<string>()

  const [booksAmountField, setBooksAmountField] = useState<string>()
  const [booksDateField, setBooksDateField] = useState<string>()

  return (
    <>
      <h3 className="flex items-center font-medium text-xl">
        Bank file
        <span className="text-sm font-normal ml-4">
          {bank.length} records found
        </span>
      </h3>
      <p className="mt-2 text-gray-700">
        Pick the <span className="font-semibold">amount</span> field
      </p>
      <div className="flex mt-4">
        {Object.keys(bank[0]).map((field) => (
          <button
            className={`ml-4 first:ml-0 py-2 px-4 rounded-full shadow-sm bg-gradient-to-br ${
              field === bankDateField
                ? 'opacity-25 cursor-not-allowed'
                : 'cursor-pointer'
            } ${
              field === bankAmountField
                ? 'from-blue-100 to-blue-200'
                : 'from-gray-100 to-gray-200'
            }`}
            key={field}
            onClick={() => {
              if (field === bankDateField) {
                return
              }

              setBankAmountField(field)
            }}>
            {field}
          </button>
        ))}
      </div>
      <p className="mt-4 text-gray-700">
        Pick the <span className="font-semibold">date</span> field
      </p>
      <div className="flex mt-4">
        {Object.keys(bank[0]).map((field) => (
          <button
            className={`ml-4 first:ml-0 py-2 px-4 rounded-full shadow-sm bg-gradient-to-br ${
              field === bankAmountField
                ? 'opacity-25 cursor-not-allowed'
                : 'cursor-pointer'
            } ${
              field === bankDateField
                ? 'from-blue-100 to-blue-200'
                : 'from-gray-100 to-gray-200'
            }`}
            key={field}
            onClick={() => {
              if (field === bankAmountField) {
                return
              }

              setBankDateField(field)
            }}>
            {field}
          </button>
        ))}
      </div>

      <h3 className="flex items-center font-medium text-xl mt-8">
        Books file
        <span className="text-sm font-normal ml-4">
          {books.length} records found
        </span>
      </h3>
      <p className="mt-2 text-gray-700">
        Pick the <span className="font-semibold">amount</span> field
      </p>
      <div className="flex mt-4">
        {Object.keys(books[0]).map((field) => (
          <button
            className={`ml-4 first:ml-0 py-2 px-4 rounded-full shadow-sm bg-gradient-to-br ${
              field === booksDateField
                ? 'opacity-25 cursor-not-allowed'
                : 'cursor-pointer'
            } ${
              field === booksAmountField
                ? 'from-red-100 to-red-200'
                : 'from-gray-100 to-gray-200'
            }`}
            key={field}
            onClick={() => {
              if (field === booksDateField) {
                return
              }

              setBooksAmountField(field)
            }}>
            {field}
          </button>
        ))}
      </div>
      <p className="mt-4 text-gray-700">
        Pick the <span className="font-semibold">date</span> field
      </p>
      <div className="flex mt-4">
        {Object.keys(books[0]).map((field) => (
          <button
            className={`ml-4 first:ml-0 py-2 px-4 rounded-full shadow-sm bg-gradient-to-br ${
              field === booksAmountField
                ? 'opacity-25 cursor-not-allowed'
                : 'cursor-pointer'
            } ${
              field === booksDateField
                ? 'from-red-100 to-red-200'
                : 'from-gray-100 to-gray-200'
            }`}
            key={field}
            onClick={() => {
              if (field === booksAmountField) {
                return
              }

              setBooksDateField(field)
            }}>
            {field}
          </button>
        ))}
      </div>

      <button
        className="mt-8 rounded-full shadow-sm bg-gradient-to-br from-green-100 to-green-200 py-2 px-4 font-medium"
        onClick={async () => {
          const response = await fetch('/api/reconcile', {
            body: JSON.stringify({
              bank,
              bankAmountField,
              bankDateField,
              books,
              booksAmountField,
              booksDateField
            }),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
          })

          const json = await response.json()

          onReconile(json)
        }}>
        Reconcile
      </button>
    </>
  )
}
