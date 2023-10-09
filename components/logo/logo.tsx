import * as React from "react";

export enum MarkStyle {
    GRAYS = 'grays',
    COLORS = 'colors'
}

export interface LogoProps {
    size: number;
    mode: MarkStyle;
}

export const propDefaults: Partial<LogoProps> = {
    size: 32,
    mode: MarkStyle.COLORS,
}

const toStyleUrl: (index: number, mode: MarkStyle) => string = (index, mode) => {
    if (mode === MarkStyle.GRAYS) {
        return `url(#grays-${index})`
    } else {
        return `url(#colors-${index})`
    }
}

export default function Mark(props: Partial<LogoProps>) {
    const { size, mode } = {...propDefaults, ...props} as LogoProps;
    const [ logoMode, setLogoMode ] = React.useState(mode)
    const [ gradient1, setGradient1 ] = React.useState(toStyleUrl(0, logoMode))
    const [ gradient2, setGradient2 ] = React.useState(toStyleUrl(1, logoMode))
    const [ gradient3, setGradient3 ] = React.useState(toStyleUrl(2, logoMode))

    React.useEffect(() => {
        setGradient1(toStyleUrl(0, logoMode))
        setGradient2(toStyleUrl(1, logoMode))
        setGradient3(toStyleUrl(2, logoMode))
    }, [ logoMode ])

    return (
        <svg
            version="1.2"
            baseProfile="tiny"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 292.400085 318.430115"
            overflow="hidden"
            xmlSpace="preserve"
            height={size}
            width={size}
        >
            <switch>
                <g i:extraneous="self">
                    <g id="Layer_2_00000118381631492804463780000014862786634177271461_">
                        <rect x="-131.249969" y="-542.409973" display="none" stroke="#000000" strokeMiterlimit="10" width="1417.319946" height="1417.319946"/>
                        <path fill={gradient1} d="M252.400024,40v2.630005c-0.010406,22.555298-18.303497,40.831543-40.858826,40.821167 c-0.097046-0.000061-0.194122-0.000427-0.291168-0.00116L91.250023,82.330017c0,0-30.850006,3.929993-27.199997,32.619995 l-24-24.450012V40H252.400024z"/>
                        <path fill={gradient2} d="M252.400024,236.090027c0.038696,23.345032-18.854828,42.301331-42.19986,42.340027 c-0.046722,0.000061-0.093414,0.000061-0.140137,0H40.000023V155.090027l39.360001,40.099976v40.900024H252.400024z"/>
                        <path fill={gradient3} d="M252.400024,142.490051c0.005524,22.141113-17.938873,40.094482-40.079987,40.100037 c-0.023346,0-0.046661,0-0.070007-0.000061h-81.649994l-55.270012-56.159973l-11.289993-11.47998 c-3.649994-28.690002,27.199997-32.619995,27.199997-32.619995l54.999992,58.669983L252.400024,142.490051z"/>
                    </g>
                </g>
            </switch>
        </svg>
    )
}
