import * as React from "react";
import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Header from '../../components/header';
import Gradient from '../../components/gradient';

export interface PageProps extends PropsWithChildren {
    tag: string;
    title: string;
    fullbleed: boolean;
    noheader: boolean;
}

export function pageInfo(tag: string, title: string, opts: Partial<PageProps> = {}): Partial<PageProps> {
    return Object.assign({}, {
        tag,
        title,
        fullbleed: false,
        noheader: false,
    }, opts);
}

function PageDefs() {
    return (
        <Gradient />
    )
}

export default function Page(props: PageProps) {
    const { title } = props;

    return props.fullbleed === true ? (
        <Box component="main">
            <PageDefs />
            {props.children}
        </Box>
    ) : (
        <Box>
            <PageDefs />
            {props.noheader === true ? '' : <Header title={title} />}

            <Box component="main">
                <Toolbar />
                <Container maxWidth={'xl'}>
                    <Box>
                        {props.children}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

Page.info = pageInfo;
