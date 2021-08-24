import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import store2 from '../../mobx/store';


const Navbar = observer(() => {

    const celsius = store2.celsius;

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
            <input type='radio' checked={celsius} onChange={() => store2.changeCels()}/>
            <p>°C</p>
            <input type='radio' checked={!celsius} onChange={() => store2.changeCels()}/>
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