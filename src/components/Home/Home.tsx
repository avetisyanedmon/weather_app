import { observer } from 'mobx-react-lite';
import store from '../../mobx/store';
import styled from 'styled-components';
import Forecast from '../Forecast/Forecast'
import HoursWeather from '../HoursWeather/HoursWeather';



const Home = observer( () => {    


    const number = store.forecastNumber;
    const weatherData = store.data[number]
    const icon = weatherData?.weather?.[0].icon;
    const temp = weatherData?.main.temp;
    const name = weatherData?.name;
    const weatherName = weatherData?.weather[0].main
    const celsiusTrue = store.celsius;
    const celsius = weatherData ? Math.ceil(temp - 273) + "°C"  : "";
    const fahrenheit = weatherData ? Math.ceil(((temp - 273.15) * 9/5 + 32)) + "°F" : "";

    return (
        <>
            <Content>
                <Contentinner>
                    <Weather>
                        <h1>{name}</h1>
                        <Temp>{celsiusTrue ? celsius : fahrenheit}</Temp>
                        <Img alt="weather" src={icon ? `http://openweathermap.org/img/wn/${icon}@4x.png` : ""}></Img>
                        <p>{weatherName ? weatherName : ''}</p>
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
width: 200px;
`

export default Home;