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
                        main:{
                            ...data.main
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
                {store?.favorites?.map(( fav, id ) => {
                    return (
                        <Link to='/'>
                            <Styled.Citydiv key={fav.name + id} role='button' onClick={() => {store.city = fav.name 
                                                                                  store.haveCity = false
                                                                                  store.getForecast()}}>
                                    <h1>{fav.name !== undefined ? fav.name : ''}</h1>
                                    <p>{celsius ? Math.ceil(fav.main?.temp - 273) + "°C": Math.ceil(((fav.main?.temp - 273.15) * 9/5 + 32)) + "°F"}</p>
                            </Styled.Citydiv>
                        </Link>

                    )
                })}
            </Styled.Favorites>
            
        </div>
    )
});

export default FavoriteCities;