import Document, { Html, Head, Main, NextScript } from 'next/document'
import {
  createCache,
  extractStyle,
  legacyLogicalPropertiesTransformer,
  StyleProvider
} from '@ant-design/cssinjs'
import type { DocumentContext, DocumentProps, DocumentInitialProps } from 'next/document'

class NextDocument extends Document<DocumentProps & { deviceType: string }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { deviceType: string }> {
    const originalRenderPage = ctx.renderPage
    const cache = createCache()
    const deviceType = (ctx.req?.headers['x-device-type'] as string) ?? 'PC'

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props) => (
          <StyleProvider
            cache={cache}
            ssrInline
            hashPriority="high"
            transformers={[legacyLogicalPropertiesTransformer]}>
            <App {...props} />
          </StyleProvider>
        )
      })

    const initialProps = await Document.getInitialProps(ctx)
    const style = extractStyle(cache, true)

    return {
      ...initialProps,
      deviceType,
      styles: (
        <>
          <style id="__jss_server_side__" dangerouslySetInnerHTML={{ __html: style }} />
          {initialProps.styles}
        </>
      )
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="INDEX,FOLLOW" />
        </Head>
        <body className="bg-body font-sans text-base text-colorDefault">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument
