import * as React from "react"
import Page, { PageProps } from '../../layouts/Page'

export const pageInfo = Page.info(
  'community',
  'Get Involved',
)

function CommunityPage() {
    return (
        <b>I'm the community page</b>
    )
}

export default Component;

export function Component(props: Partial<PageProps>) {
    const state = {...pageInfo, ...props} as PageProps;

    return (
        <Page {...state}>
            <CommunityPage />
        </Page>
    )
}
