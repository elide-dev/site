import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { cls } from '../../app/util/styles'
import Logo, { MarkStyle } from "../logo";

const onHomeClick = (event: any) => {
    event.preventDefault()
    setTimeout(() => {
        // @ts-ignore
        open("/", "_self");
    }, 0);
};

export interface HeaderProps extends React.PropsWithChildren {
    title: string;
}

export default function Header(props: HeaderProps) {
    const { title } = props

    return (
        <AppBar position={'fixed'} className={'gradient'} sx={{gridArea: 'header', zIndex: 1500}}>
            <Toolbar>
                <Box className={cls('header', 'box')}>
                    <Box sx={{ marginRight: 3 }}>
                        <Link
                            title={'Elide Home'}
                            href={'/'}
                            underline={'none'}
                            onClick={onHomeClick}
                            color={'white'}
                            className={cls('header', 'logo')}
                        >
                            <Logo size={32} mode={MarkStyle.GRAYS} />
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, color: 'white' }}>
                        <Typography variant={'h1'} sx={{ fontSize: '16pt', fontWeight: '400', lineHeight: 'inherit' }}>
                            {title}
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
