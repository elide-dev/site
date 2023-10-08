import * as React from "react";
import { PropsWithChildren } from "react";
import Header from '../../components/header';

export interface PageProps extends PropsWithChildren {
    tag: string;
    title: string;
}

export function pageInfo(tag: string, title: string): Partial<PageProps> {
    return {
        tag,
        title,
    };
}

export default function Page(props: PageProps) {
    return (
        <>
            <b>I'm a page</b>
            <br />
            <Header />
            {props.children}
        </>
    );
}

Page.info = pageInfo;
