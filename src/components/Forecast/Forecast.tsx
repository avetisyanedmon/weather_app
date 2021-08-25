import { observer} from 'mobx-react-lite';
import styled from 'styled-components';
import  store  from '../../mobx/store';
import { useState } from 'react';



const WeatherOf5Day = observer(() => {

    const daysWeather = [];
    const celsius = store.celsius;
    const data = store.data;
    const [active, setActive] = useState(0)



    for(let i = 0; i < data?.length; i+=8){
        daysWeather.push(data[i])
    }


    return (
        <>
        <Forecast>
            {daysWeather.map((day, id:number) => {
                return (
                    <Weatherdiv active={active} id={id} key={id} onClick={() => {
                        store.weatherDate = day.dt_txt.slice(0, 10);
                        store.forecastNumber = id * 8;
                        setActive(id)
                    }}>
                        <p>{day?.dt_txt?.slice(5, 10)}</p>
                        <Tempdiv>
                            <h1>{celsius ? Math.ceil(day?.main?.temp - 273) + "°C": Math.ceil(((day?.main?.temp - 273.15) * 9/5 + 32)) + "°F"}  </h1>
                            <Img  alt="weather" src={`http://openweathermap.org/img/wn/${day?.weather?.[0].icon}@4x.png`}/>
                        </Tempdiv>
                    </Weatherdiv>
                )
            })}
            </Forecast>
    </>
    )
});

const Forecast = styled.div`
width: 20%;
display: flex;
margin: 0 auto;
padding-top: 5%;
justify-content: center;
text-align: center;
`
const Weatherdiv = styled.div`
padding: 1% 5%;
border: 1px solid black;
border-radius: 3px;
margin: 15px;
cursor: pointer;
box-shadow:${props => props.active === props.id ? "3px 5px 10px black" : ''} ;
:hover {
    box-shadow: 3px 5px 10px black;
}
`
const Tempdiv = styled.div`
width: 100%;
display: flex;

`
const Modaldiv = styled.div`
width: 15%;
margin: 5% auto;
display: flex;
padding: 10px 15px;
justify-content: space-between;
border-radius: 5px;
background-color: whitesmoke;

`

const Modalbtn = styled.button`
cursor: pointer;
`
const Modalinner = styled.div`
width: 100%;
padding: 10px 15px;
background-color: #e4e4e4;
display: flex;
justify-content: space-between;
border-bottom: 1px solid #a4a4a4;
`

const Img = styled.img`
width: 80px`

export default WeatherOf5Day;