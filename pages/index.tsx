import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'

import { Header, StepOne, StepThree, StepTwo } from '../components'
import { ParsedBank, ParsedBooks, ReconciledData } from '../types'

const Home: NextPage = () => {
  const [step, setStep] = useState<'one' | 'two' | 'three'>('one')

  const [parsedBank, setParsedBank] = useState<ParsedBank>()
  const [parsedBooks, setParsedBooks] = useState<ParsedBooks>()

  const [reconciled, setReconciled] = useState<ReconciledData>()

  return (
    <>
      <Head>
        <title>Reconciliation</title>
      </Head>

      <Header
        onReset={() => {
          setParsedBank(undefined)
          setParsedBooks(undefined)

          setReconciled(undefined)

          setStep('one')
        }}
        reset={step !== 'one'}
      />

      <main className="m-8">
        {step === 'one' && (
          <StepOne
            onParse={({ bank, books }) => {
              setParsedBank(bank)
              setParsedBooks(books)

              setStep('two')
            }}
          />
        )}

        {step === 'two' && parsedBank && parsedBooks && (
          <StepTwo
            bank={parsedBank}
            books={parsedBooks}
            onReconile={(data) => {
              setReconciled(data)

              setStep('three')
            }}
          />
        )}

        {step === 'three' && reconciled && <StepThree {...reconciled} />}
      </main>
    </>
  )
}

export default Home
