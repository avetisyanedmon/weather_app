import styled from "styled-components";


const Forecast = styled.div`
width: 20%;
display: flex;
margin: 0 auto;
padding-top: 5%;
justify-content: center;
text-align: center;
`
const Weatherdiv = styled.div<{active:boolean}>`
padding: 1% 5%;
border: 1px solid black;
border-radius: 3px;
margin: 15px;
cursor: pointer;
box-shadow:${props => props.active ? "3px 3px 15px #2e2e2e" : ''} ;
:hover {
    box-shadow: 3px 3px 15px #2e2e2e;
    transition: linear 0.1s;
}
`
const Tempdiv = styled.div`
width: 100%;
display: flex;

`
const Img = styled.img`
width: 80px;
`

export const Styled = {
    Forecast,
    Weatherdiv,
    Tempdiv,
    Img
};