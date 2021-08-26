import styled from "styled-components";

const Navbardiv = styled.div`
 width:100%;
 padding: 15px;
 background-color: #4eb85e;
 display: flex;
 text-align: center;
 box-sizing: border-box;
`;

const Buttondiv = styled.div`
width: 100%;
margin: auto;
`

const Button = styled.button`
 background-color: transparent;
 color: whitesmoke;
 font-size: 15px;
 padding: 10px;
 border: 0px;
 border-radius: 3px;
 margin-left: 45px;
 cursor: pointer;
`;

const Checkdiv = styled.div`
width: 7%;
border-radius: 35px;
background-color: whitesmoke;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`
export const Styled = {
    Navbardiv,
    Buttondiv,
    Button,
    Checkdiv
}