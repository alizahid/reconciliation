import '../assets/global.scss'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import App from 'next/app'
import React from 'react'
dayjs.extend(localizedFormat)

class Bank extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props

    return <Component {...pageProps} />
  }
}

export default Bank
