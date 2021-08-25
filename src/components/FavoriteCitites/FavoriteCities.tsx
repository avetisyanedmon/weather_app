import store from '../../mobx/store';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



const FavoriteCities = observer(() => {

    const [title, setTitle] = useState <string>(''); 
    const celsius = store.celsius;


    useEffect(() => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${store?.currentLoc?.lat}&lon=${store?.currentLoc?.lng}&appid=4731ea198a1e19cdc594363ec13377fb`)
            .then(response => response.json())
            .then(data => store?.favorites?.length == 0 ? store.favorites= [
                ...store.favorites,
                
                    {
                        name:data.name,
                        main:{
                            ...data.main
                        }
                    }
                
            ] : '')
    },[]);


    return (
        <div>
            <Inputdiv>
                <input type='text' value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} />
                <Button onClick={() => {
                    store.getFavoriteCity(title)
                    setTitle('')
                    }}>Add
                </Button>
            </Inputdiv>
            <Favorites>
                {store?.favorites?.map(( fav ) => {
                    return (
                        <Link to='/'>
                            <Citydiv key={fav.name} role='button' onClick={() => {store.city = fav.name 
                                                                                  store.haveCity = false
                                                                                  store.getForecast()}}>
                                    <h1>{fav.name != undefined ? fav.name : ''}</h1>
                                    <p>{celsius ? Math.ceil(fav.main?.temp - 273) + "°C": Math.ceil(((fav.main?.temp - 273.15) * 9/5 + 32)) + "°F"}</p>
                            </Citydiv>
                        </Link>

                    )
                })}
            </Favorites>
            
        </div>
    )
});

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
}
`
export default FavoriteCities;