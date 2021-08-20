import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import store from '../../mobx/store';
import { Link } from 'react-router-dom';


const Navbar = observer(() => {

    const celsius = store.celsius;

    return (
       <Navbardiv>
        <Buttondiv>
            <Link to='/'>
                <Button>Home</Button>
            </Link>
            <Link to='/favorite'>
                <Button>Favorite Cities</Button>
            </Link>
        </Buttondiv>
        <Checkdiv>
            <input type='radio' checked={celsius} onChange={() => store.changeCels()}/>
            <p>°C</p>
            <input type='radio' checked={!celsius} onChange={() => store.changeCels()}/>
            <p>°F</p>
        </Checkdiv>
       </Navbardiv>
    )
});


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

export default Navbar;