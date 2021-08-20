import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import store from '../../mobx/store';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';
import { useState } from 'react';



const WeatherOf5Day = observer(() => {

    const [open, setOpen] = useState(false);
    const [day, setDay] = useState('');
    const [modalWeather, setModalWeather] = useState([])
    const daysWeather = [];
    const celsius = store.celsius;
    const data = store.data;


    useEffect(() => {
        setModalWeather(data?.list?.filter(d => d?.dt_txt?.includes(day)))
    },[day])


    useEffect(() => {
        store.getLocation()
        store.getData()
    },[]);


    for(let i = 0; i < data?.list?.length; i+=8){
        daysWeather.push(data.list[i])
    }


    return(
        <>
        <Forecast>
            {daysWeather.map((day, id) => {
                return (
                    <Weatherdiv  key={id} onClick={() => {
                        setDay(day?.dt_txt?.slice(0, 10))
                        setOpen(true)
                    }}>
                        <p>{day?.dt_txt?.slice(5, 10)}</p>
                        <Tempdiv>
                            <h1>{celsius ? Math.ceil(day?.main?.temp - 273) + "°C": Math.ceil(((day?.main?.temp - 273.15) * 9/5 + 32)) + "°F"}  </h1>
                            <Img  alt="weather" src={`http://openweathermap.org/img/wn/${day?.weather?.[0].icon}.png`}/>
                        </Tempdiv>
                    </Weatherdiv>
                )
            })}
            </Forecast>
            <Modal open={open}>
                <Modaldiv>
                    <div>
                        {modalWeather?.map((day, id) => {
                            return (
                                <Modalinner key={id}>
                                    <p>{day.dt_txt.slice(11)}</p>
                                    <p>{celsius ? Math.ceil(day.main.temp - 273) + "°C": Math.ceil(((day.main.temp - 273.15) * 9/5 + 32)) + "°F"}</p>
                                    <img alt='icon' src={`http://openweathermap.org/img/wn/${day.weather?.[0].icon}.png`}/>
                                </Modalinner>
                            )
                        })}
                    </div>
                    <div>
                        <Modalbtn onClick={() => setOpen(false)}>X</Modalbtn>
                    </div>
                </Modaldiv>
            </Modal>
    </>
    )
});

const Forecast = styled.div`
width: 20%;
display: flex;
margin: 0 auto;
justify-content: center;
text-align: center;
`
const Weatherdiv = styled.div`
padding: 1% 5%;
border: 1px solid black;
border-radius: 3px;
margin: 15px;
cursor: pointer;
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