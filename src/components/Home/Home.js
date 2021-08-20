import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import store from '../../mobx/store';
import styled from 'styled-components';
import Forecast from '../Forecast/Forecast'
import HoursWeather from '../HoursWeather/HoursWeather';



const Home = observer( () => {    

    const [weatherData, setWeatherData] = useState()

    const icon = weatherData?.weather?.[0].icon;
    const temp = weatherData?.main?.temp;
    const name = weatherData?.weather?.[0].main;
    const celsiusTrue = store.celsius;
    const celsius = weatherData ? Math.ceil(temp - 273) + "°C"  : "";
    const fahrenheit = weatherData ? Math.ceil(((temp - 273.15) * 9/5 + 32)) + "°F" : "";

    useEffect(() =>{
        store.getLocation()
         setTimeout(()=>{
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${store?.currentLoc?.lat}&lon=${store?.currentLoc?.lng}&appid=4731ea198a1e19cdc594363ec13377fb`)
                .then(response => response.json())
                .then(data => setWeatherData(data))
            },10)
    },[])


    return (
        <>
            <Content>
                <Contentinner>
                    <Weather>
                        <h1>{weatherData?.name}</h1>
                        <Temp>{celsiusTrue ? celsius : fahrenheit}</Temp>
                        <Img alt="weather" src={icon ? `http://openweathermap.org/img/wn/${icon}.png` : ""}></Img>
                        <p>{name ? name : ''}</p>
                    </Weather>
                </Contentinner>
                <HoursWeather/>
            </Content>
            <Forecast/>
        </>    
        )
    }
);

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
width: 120px;
`

export default Home;