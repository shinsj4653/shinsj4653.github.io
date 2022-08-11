import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobalStyle'
import Footer from 'components/Common/Footer'
import { Helmet } from 'react-helmet'
import TopBtn from 'components/Common/TopBtn'

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
    <Container>
      <Helmet>
        <title>{title}</title>
        <link
          href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAMP/AADZ/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIgAiIiEQIiIiACIiIQAiIiAAAiIRAAIiIAACIhAAAiIAAAAhEAAAIgAAACEAAAAgAAAAAQAAAAIiIiIQAAAAAiIiIRAAAAAAIiIhAAAAAAAiIhEAAAAAAAIiEAAAAAAAAiEQAAAAAAAAIQAAAAAAAAAhAAAAAAAAAAAYAAAIGBAACDwQAAw8MAAMfjAADn5wAA7/cAAPAPAADwDwAA+B8AAPgfAAD8PwAA/D8AAP5/AAD+fwAA"
          rel="icon"
          type="image/x-icon"
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
      <Footer />
      <TopBtn showBelow={250} />
    </Container>
  )
}

export default Template
