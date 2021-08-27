import { observer} from 'mobx-react-lite';
import  store  from '../../mobx/store';
import { useState } from 'react';
import { Styled } from './style';
import { runInAction } from 'mobx';

const WeatherOf5Day = observer(() => {
    const daysWeather = [];
    const celsius = store.celsius;
    const data = store.data;
    const [active, setActive] = useState<number>(0)

    for(let i = 0; i < data?.length; i+=8){
        daysWeather.push(data[i])
    }

    return (
        <>
            <Styled.Forecast>
                {daysWeather.map((day, id:number) => {
                    return (
                        <Styled.Weatherdiv active={active === id}   key={day.dt} onClick={() => runInAction(() => {
                            store.weatherDate = day.dt_txt.slice(0, 10);
                            store.forecastNumber = id * 8;
                            setActive(id)
                        })}>
                            <p>{day?.dt_txt?.slice(5, 10)}</p>
                            <Styled.Tempdiv>
                                <h1>{celsius ? Math.ceil(day?.main?.temp - 273) + "°C": Math.ceil(((day?.main?.temp - 273.15) * 9/5 + 32)) + "°F"}  </h1>
                                <Styled.Img  alt="weather" src={`http://openweathermap.org/img/wn/${day?.weather?.[0].icon}@4x.png`}/>
                            </Styled.Tempdiv>
                        </Styled.Weatherdiv>
                    )
                })}
            </Styled.Forecast>
        </>
    )
});

export default WeatherOf5Day;