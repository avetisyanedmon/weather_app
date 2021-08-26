import styled from 'styled-components';

const Content = styled.div`
display: flex;
`

const Contentinner = styled.div`
width: 100%;
display: flex;
box-sizing: border-box;
justify-content: center;
text-align: center;
padding-left: 15%;
`
const Weather = styled.div`
width: 100%;
margin-top: 10%;
`
const Temp = styled.p`
font-size: 22px;
font-weight:500;`

const Img = styled.img`
width: 200px;
`
export const Styled = {
    Content,
    Contentinner,
    Weather,
    Temp,
    Img
}