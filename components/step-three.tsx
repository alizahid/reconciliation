import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import React, { FunctionComponent, useState } from 'react'

import { ReconciledData } from '../types'

export const StepThree: FunctionComponent<ReconciledData> = (props) => {
  const {
    bankAmountField,
    bankDateField,
    booksAmountField,
    booksDateField
  } = props

  const [data, setData] = useState(props.data)

  const [selected, setSelected] = useState(new Map())

  const bankTotal = data.reduce(
    (total, item) =>
      total +
      item.bank.reduce(
        (total, item) => total + Number(item[bankAmountField]),
        0
      ),
    0
  )

  const booksTotal = data.reduce(
    (total, item) =>
      total +
      item.books.reduce(
        (total, item) => total + Number(item[booksAmountField]),
        0
      ),
    0
  )

  return (
    <>
      <table className={selected.size > 0 ? 'mb-28' : ''}>
        <thead>
          <tr>
            <th className="bg-warmGray-100 font-semibold text-xl">Bank</th>
            <th className="bg-warmGray-100 font-semibold text-xl">Books</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {data.map((item, index) => {
            const matched = item.bank.length > 0 && item.books.length > 0

            const reconciled =
              item.bank.reduce(
                (total, item) => total + Number(item[bankAmountField]),
                0
              ) ===
              item.books.reduce(
                (total, item) => total + Number(item[booksAmountField]),
                0
              )

            return (
              <tr
                className={`border-t border-border ${
                  selected.has(index)
                    ? 'bg-blue-200'
                    : reconciled
                    ? 'bg-green-100'
                    : matched
                    ? 'bg-orange-100'
                    : 'bg-red-100'
                }`}
                key={index}
                onClick={() => {
                  const next = new Map(selected)

                  if (next.has(index)) {
                    next.delete(index)
                  } else {
                    next.set(index, true)
                  }

                  setSelected(next)
                }}>
                <td className="w-1/2">
                  {item.bank.length > 0 ? (
                    item.bank.map((item, index) => (
                      <div className="mt-4 first:mt-0" key={index}>
                        {Object.entries(item).map(([key, value]) => (
                          <div key={key}>
                            <strong className="font-semibold">{key}</strong>
                            <span className="ml-2">
                              {key === bankDateField
                                ? dayjs(value).format('ll')
                                : key === bankAmountField
                                ? value.toLocaleString('en-US')
                                : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-600">No match</span>
                  )}
                </td>

                <td className="w-1/2">
                  {item.books.length > 0 ? (
                    item.books.map((item, index) => (
                      <div className="mt-4 first:mt-0" key={index}>
                        {Object.entries(item).map(([key, value]) => (
                          <div key={key}>
                            <strong className="font-semibold">{key}</strong>
                            <span className="ml-2">
                              {key === booksDateField
                                ? dayjs(value).format('ll')
                                : key === booksAmountField
                                ? value.toLocaleString('en-US')
                                : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-600">No match</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>

        <tfoot>
          <tr>
            <th className="bg-warmGray-100 font-semibold text-xl">
              <span className="block font-normal text-sm">Bank total</span>
              {bankTotal.toLocaleString('en-US')}
            </th>
            <th className="bg-warmGray-100 font-semibold text-xl">
              <span className="block font-normal text-sm">Books total</span>
              {booksTotal.toLocaleString('en-US')}
            </th>
          </tr>
          <tr>
            <th className="bg-warmGray-100 font-semibold text-xl" colSpan={2}>
              <span className="block font-normal text-sm">Missing</span>
              {Math.abs(bankTotal - booksTotal).toLocaleString('en-US')}
            </th>
          </tr>
        </tfoot>
      </table>

      {selected.size > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 m-8">
          {selected.size > 1 && (
            <button
              className="rounded-full shadow-sm bg-gradient-to-br from-blue-200 to-blue-300 py-2 px-4 font-medium"
              onClick={() => {
                const next = cloneDeep(data)

                const items = Array.from(selected.keys())

                setData([
                  ...next.filter((item, index) => !items.includes(index)),
                  next
                    .filter((item, index) => items.includes(index))
                    .reduce(
                      (data, item) => {
                        data.bank.push(...item.bank)
                        data.books.push(...item.books)

                        return data
                      },
                      {
                        bank: [],
                        books: []
                      }
                    )
                ])

                setSelected(new Map())
              }}>
              Merge
            </button>
          )}
          {selected.size > 0 && (
            <button
              className="ml-8 first:ml-0 rounded-full shadow-sm bg-gradient-to-br from-blue-200 to-blue-300 py-2 px-4 font-medium"
              onClick={() => {
                const next = cloneDeep(data)

                const items = Array.from(selected.keys())

                setData([
                  ...next.filter((_, index) => !items.includes(index)),
                  ...next
                    .filter((_, index) => items.includes(index))
                    .map((item) => [
                      ...item.bank.map((item) => ({
                        bank: [item],
                        books: []
                      })),
                      ...item.books.map((item) => ({
                        bank: [],
                        books: [item]
                      }))
                    ])
                    .flat()
                ])

                setSelected(new Map())
              }}>
              Split
            </button>
          )}
        </footer>
      )}
    </>
  )
}
