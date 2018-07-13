import React from 'react'
import { TypographyStyle, GoogleFont } from 'react-typography'
import typography from '../typography.js'

export default ({ Html, Head, Body, children }) => (
  <Html>
    <Head>
      <title>tkwan.xyz</title>
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-no-straw-32x32.png'
      />
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
    </Head>
    <Body>{children}</Body>
  </Html>
)
