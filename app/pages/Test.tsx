import * as React from "react"
import Page from '../layouts/Page'

export const pageInfo = Page.info(
  'test',
  'Test',
)

function Test() {
    return (
        <b>I'm a code-split lazy page</b>
    )
}

export default Component;

export function Component() {
    return (
        <Page tag={'test'} title={'Test'}>
            <Test />
        </Page>
    )
}
