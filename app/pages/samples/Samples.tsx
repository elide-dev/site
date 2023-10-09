import * as React from "react"
import Page, { PageProps } from '../../layouts/Page'

export const pageInfo = Page.info(
  'samples',
  'Samples',
)

function SamplesPage() {
    return (
        <b>I'm the samples page</b>
    )
}

export default Component;

export function Component(props: Partial<PageProps>) {
    const state = {...pageInfo, ...props} as PageProps;

    return (
        <Page {...state}>
            <SamplesPage />
        </Page>
    )
}
