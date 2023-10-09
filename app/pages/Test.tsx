import * as React from "react";
import Page, { PageProps } from '../layouts/Page';

export const pageInfo = Page.info(
  'test',
  'Test',
)

export default function Test() {
    return (
        <div>
            <b>I'm a code-split lazy page</b>
        </div>
    )
}

export function Component(props: PageProps) {
    const state = {...pageInfo, ...props};
    return (
        <Page {...state}>
            <Test />
        </Page>
    )
}
