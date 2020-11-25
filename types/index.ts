export type ParsedBank = Array<Record<string, string>>

export type ParsedBooks = Array<Record<string, string>>

export type ParsedFiles = {
  bank: ParsedBank
  books: ParsedBooks
}

export type ReconcilePayload = {
  bank: ParsedBank
  bankAmountField: string
  bankDateField: string

  books: ParsedBooks
  booksAmountField: string
  booksDateField: string
}

export type ReconciledData = {
  data: Array<{
    bank?: Record<string, string | number>[]
    books?: Record<string, string | number>[]
  }>

  bankAmountField: string
  bankDateField: string

  booksAmountField: string
  booksDateField: string
}
