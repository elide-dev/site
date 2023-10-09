import * as React from "react"
import Page, { PageProps } from '../../layouts/Page'

export const pageInfo = Page.info(
  'runtime',
  'Elide Runtime',
)

function RuntimePage() {
    return (
        <b>I'm the runtime page</b>
    )
}

export default Component;

export function Component(props: Partial<PageProps>) {
    const state = {...pageInfo, ...props} as PageProps;

    return (
        <Page {...state}>
            <RuntimePage />
        </Page>
    )
}
