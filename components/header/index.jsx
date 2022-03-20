import { HeaderStyled, InnerHeaderContainerStyled, LogoStyled } from './header.styles'

export const Header = () => {
    return (
        <HeaderStyled>
            <InnerHeaderContainerStyled py="32px" px="64px">
                <LogoStyled>
                    {/*<Image src='/logo.svg' />*/}
                    {/*<Text*/}
                    {/*    sx={{*/}
                    {/*        fontSize: '19px',*/}
                    {/*        fontWeight: 'bold',*/}
                    {/*    }}>*/}
                    {/*    Booking*/}
                    {/*</Text>*/}
                </LogoStyled>
                {/*<ColorSwitcher />*/}
            </InnerHeaderContainerStyled>
        </HeaderStyled>
    )
}
