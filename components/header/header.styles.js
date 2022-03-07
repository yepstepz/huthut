import styled from '@emotion/styled'
import { Container, Text } from 'theme-ui'

export const HeaderStyled = styled.header``

export const InnerHeaderContainerStyled = styled((props) =>  <Container {...props} />)`
  display: flex;
  justify-content: space-between;
`

export const SettingsBlockStyled = styled.ul`
    
`

export const LogoStyled = styled.span`
    display: flex;
    align-items: center;
`
