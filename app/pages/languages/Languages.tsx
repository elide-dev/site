import * as React from "react"
import Page, { PageProps } from '../../layouts/Page'

export const pageInfo = Page.info(
  'languages',
  'Languages',
)

function LanguagesPage() {
    return (
        <b>I'm the languages page</b>
    )
}

export default Component;

export function Component(props: Partial<PageProps>) {
    const state = {...pageInfo, ...props} as PageProps;

    return (
        <Page {...state}>
            <LanguagesPage />
        </Page>
    )
}
