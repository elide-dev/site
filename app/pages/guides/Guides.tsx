import * as React from "react"
import Page, { PageProps } from '../../layouts/Page'

export const pageInfo = Page.info(
  'guides',
  'Guides',
)

function GuidesPage() {
    return (
        <b>I'm the guides page</b>
    )
}

export default Component;

export function Component(props: Partial<PageProps>) {
    const state = {...pageInfo, ...props} as PageProps;

    return (
        <Page {...state}>
            <GuidesPage />
        </Page>
    )
}
