import * as React from "react"
import Page, { PageProps } from '../../layouts/Page'

export const pageInfo = Page.info(
  'docs',
  'Docs',
)

function DocsPage() {
    return (
        <b>I'm the docs page</b>
    )
}

export default Component;

export function Component(props: Partial<PageProps>) {
    const state = {...pageInfo, ...props} as PageProps;

    return (
        <Page {...state}>
            <DocsPage />
        </Page>
    )
}
