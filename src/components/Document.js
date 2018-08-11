import React from 'react'

export default ({ Html, Head, Body, children }) => (
  <Html>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>tommy kwan</title>
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-no-straw-32x32.png'
      />
    </Head>
    <Body>{children}</Body>
  </Html>
)
