import styled from '@emotion/styled'

export const ListStyled = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    align-items: center;
`

export const ListItemStyled = styled.li`
  width: 250px;
  height: 250px;
  border: 1px solid rgba(215, 215, 215, 0.5);
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
`

export const ImageWrapperStyled = styled.span`
    padding: 10px;
    display: block;

    img {
      width: 100%;
      height: 100%;
    }
`
