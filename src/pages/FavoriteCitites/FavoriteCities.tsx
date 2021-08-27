import store from '../../mobx/store';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Styled } from './style';



const FavoriteCities = observer(() => {

    const [title, setTitle] = useState <string>(''); 
    const celsius = store.celsius;


    useEffect(() => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${store?.currentLoc?.lat}&lon=${store?.currentLoc?.lng}&appid=4731ea198a1e19cdc594363ec13377fb`)
            .then(response => response.json())
            .then(data => store?.favorites?.length === 0 ? store.favorites= [
                ...store.favorites,
                    {
                        name:data.name,
                        dt:data.dt,
                        main:{
                            temp:data.main.temp
                        }
                    }
                
            ] : '')
    },[]);


    return (
        <div>
            <Styled.Inputdiv>
                <input type='text' value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} />
                <Styled.Button onClick={() => {
                    store.getFavoriteCity(title)
                    setTitle('')
                    }}>Add
                </Styled.Button>
            </Styled.Inputdiv>
            <Styled.Favorites>
                {store?.favorites?.map(( fav ) => {
                    return (
                            <Styled.Citydiv key={fav.dt} onClick={() => {store.city = fav.name 
                                                                                       store.haveCity = false
                                                                                       store.getForecast()}}>
                                <Link to='/' >
                                    <Styled.Cityname>{fav.name !== undefined ? fav.name : ''}</Styled.Cityname>
                                </Link>
                                    <p>{celsius ? Math.ceil(fav.main?.temp - 273) + "°C": Math.ceil(((fav.main?.temp - 273.15) * 9/5 + 32)) + "°F"}</p>
                                    <Styled.Button onClick={() => {store.favorites = store.favorites.filter(f => f.dt !== fav.dt)}}>Delete</Styled.Button>
                            </Styled.Citydiv>
                    )
                })}
            </Styled.Favorites>
            
        </div>
    )
});

export default FavoriteCities;