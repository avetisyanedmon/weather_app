import styled from "styled-components";


const Inputdiv = styled.div`
display:flex;
justify-content: center;
margin: 25px auto;
`

const Favorites = styled.div`
display: flex;
margin-top: 50px;
`

const Citydiv = styled.div`
color: black;
padding: 10px 15px;
border: 1px solid #a4a4a4;
border-radius: 3px;
margin: 10px 25px;
cursor: pointer;
text-overflow: ellipsis;
`
const Button = styled.button`
padding: 5px 10px;
margin: 0 5px;
background-color: #4eb85e;
border: 0;
border-radius: 3px;
cursor: pointer;
&:hover {
    background-color: #6ed17d
};
`
export const Styled = {
    Inputdiv,
    Favorites,
    Citydiv,
    Button,
}
