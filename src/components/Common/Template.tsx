import React, {
  FunctionComponent,
  ReactNode,
} from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import { Helmet } from 'react-helmet'
import FloatingButtons from 'components/Common/FloatingButtons'
type TemplateProps = {
  title: string
  description: string
  url: string
  image: string
  children: ReactNode
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Template: FunctionComponent<TemplateProps> = function ({
  title,
  description,
  url,
  image,
  children,
}) {
  return (
    <Container
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--textNormal)',
        transition: 'color 0.2s ease-out, background 0.2s ease-out',
      }}
    >
      <Helmet>
        <title>{title}</title>
        <link
          href="/triforce.png"
          rel="icon"
          type="image/png"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@username" />
        <meta name="twitter:creator" content="@username" />

        <meta
          name="google-site-verification"
          content="G3_La3tI5z6krV3tJYP4VbJvi2dKTemqeU2svzgSaq0"
        />

        <meta
          name="naver-site-verification"
          content="88290c4cfe2d3116362cf74eb2c6a5bfc790793d"
        />

        <html lang="ko" />
      </Helmet>

      <GlobalStyle />
      {children}
      <FloatingButtons showTopBelow={250} />
    </Container>
  )
}

export default Template
