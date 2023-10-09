import * as React from "react";
import { PropsWithChildren } from "react";
import Header from '../../components/header';
import { Box, Container, Toolbar } from "@mui/material";

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

export default function Page(props: PageProps) {
    return props.fullbleed === true ? (
        <Box component="main">
            {props.children}
        </Box>
    ) : (
        <Box>
            {props.noheader === true ? '' : <Header />}

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
