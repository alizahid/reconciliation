import dayjs from 'dayjs'
import { findIndex, orderBy } from 'lodash'
import { NextApiHandler } from 'next'

import { ReconciledData, ReconcilePayload } from '../../types'

const handler: NextApiHandler<ReconciledData> = async (req, res) => {
  if (req.method.toLowerCase() !== 'post') {
    throw new Error('POST required')
  }

  const data: ReconciledData['data'] = []

  const {
    bank,
    bankAmountField,
    bankDateField,
    books,
    booksAmountField,
    booksDateField
  } = req.body as ReconcilePayload

  const bankData = bank.map((item) => ({
    ...item,
    [bankAmountField]: parseAmount(item[bankAmountField]),
    [bankDateField]: dayjs(item[bankDateField]).toISOString()
  }))

  const booksData = books.map((item) => ({
    ...item,
    [booksAmountField]: parseAmount(item[booksAmountField]),
    [booksDateField]: dayjs(item[booksDateField]).toISOString()
  }))

  bankData.forEach((item) => {
    const index = findIndex(booksData, {
      [booksAmountField]: item[bankAmountField],
      [booksDateField]: item[bankDateField]
    })

    data.push({
      bank: [item],
      books: booksData[index] ? [booksData[index]] : []
    })

    if (index >= 0) {
      booksData.splice(index, 1)
    }
  })

  booksData.forEach((item) => {
    data.push({
      bank: [],
      books: [item]
    })
  })

  res.json({
    bankAmountField,
    bankDateField,
    booksAmountField,
    booksDateField,
    data: orderBy(data, [bankDateField, booksDateField], ['asc', 'asc'])
  })
}

export default handler

const parseAmount = (data: string): number =>
  Number(data.replace(/([^\d.]+)/g, ''))
