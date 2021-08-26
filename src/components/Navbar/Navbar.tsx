import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import store from '../../mobx/store';
import { Styled } from './style'


const Navbar = observer(() => {

    const celsius = store.celsius;

    return (
       <Styled.Navbardiv>
        <Styled.Buttondiv>
            <Link to='/'>
                <Styled.Button>Home</Styled.Button>
            </Link>
            <Link to='/favorite'>
                <Styled.Button>Favorite Cities</Styled.Button>
            </Link>
        </Styled.Buttondiv>
        <Styled.Checkdiv>
            <input type='radio' checked={celsius} onChange={() => store.changeCels()}/>
            <p>°C</p>
            <input type='radio' checked={!celsius} onChange={() => store.changeCels()}/>
            <p>°F</p>
        </Styled.Checkdiv>
       </Styled.Navbardiv>
    )
});



export default Navbar;