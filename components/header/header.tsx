import * as React from 'react';
import { AppBar, Box, Link, Toolbar } from "@mui/material";
import { cls } from '../../app/util/styles';

const onHomeClick = (event: any) => {
    event.preventDefault()
    setTimeout(() => {
        // @ts-ignore
        open("/", "_self");
    }, 0);
};

export default function Header() {
    return (
        <AppBar position={'fixed'} className={'gradient'} sx={{gridArea: 'header', zIndex: 1500}}>
            <Toolbar>
                <Box className={cls('header', 'box')}>
                    <Link
                        title={'Elide Home'}
                        href={'/'}
                        underline={'none'}
                        onClick={onHomeClick}
                    >
                        <div className={cls('header', 'logo-box')}>
                            <b>logobox</b>
                        </div>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
