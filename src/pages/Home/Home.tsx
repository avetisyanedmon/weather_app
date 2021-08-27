import { observer } from 'mobx-react-lite';
import store from '../../mobx/store';
import Forecast from '../../components/Forecast/Forecast'
import HoursWeather from '../../components/HoursWeather/HoursWeather';
import { Styled } from './style';



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
            <Styled.Content>
                <Styled.Contentinner>
                    <Styled.Weather>
                        <h1>{name}</h1>
                        <Styled.Temp>{celsiusTrue ? celsius : fahrenheit}</Styled.Temp>
                        <Styled.Img alt="weather" src={icon ? `http://openweathermap.org/img/wn/${icon}@4x.png` : ""}></Styled.Img>
                        <p>{weatherName ? weatherName : ''}</p>
                    </Styled.Weather>
                </Styled.Contentinner>
                <HoursWeather/>
            </Styled.Content>
            <Forecast/>
        </>    
        )
    }
);



export default Home;