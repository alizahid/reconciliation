import csv from 'csv-parser'
import { File, IncomingForm } from 'formidable'
import fs from 'fs'
import { NextApiHandler, NextApiRequest } from 'next'

export const config = {
  api: {
    bodyParser: false
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method.toLowerCase() !== 'post') {
    throw new Error('POST required')
  }

  const { bank, books } = await getFiles(req)

  res.json({
    bank: await parseCsv(bank),
    books: await parseCsv(books)
  })
}

export default handler

const getFiles = (
  req: NextApiRequest
): Promise<{
  bank: File
  books: File
}> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.keepExtensions = true

    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error)

        return
      }

      const { bank, books } = files

      resolve({
        bank,
        books
      })
    })
  })

const parseCsv = (file: File) =>
  new Promise((resolve, reject) => {
    const data = []

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', (error) => reject(error))
  })
