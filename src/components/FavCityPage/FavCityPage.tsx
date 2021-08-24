import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import store, { Data } from '../../mobx/store';




const FavCityPage = observer(() => {

const history = useHistory();
const name: string = history.location.pathname.slice(6); 
const data = store.cityPageData;
const celsius = store.celsius;
const cityWeather = [];

console.log(data)

useEffect(() => {
    store.getCityPageData(name)
},[name])

for(let i = 0; i < data?.length; i+=8) {
    cityWeather.push(data[i])
}



    return (
        <Content>
           {data?.map((d: Data) => {
               return (
                   <Weatherdiv>
                    <div>
                        <h1>{d.dt_txt}</h1>
                        <p>{celsius ? Math.ceil(d.main?.temp - 273) + "°C": Math.ceil(((d.main?.temp - 273.15) * 9/5 + 32)) + "°F"}</p>
                    </div>
                    <div>
                        <img alt='weather' src={`http://openweathermap.org/img/wn/${d.weather[0].icon}.png`}/>
                    </div>
                   </Weatherdiv>
               )
           })}
        </Content>
    )
});


const Content = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
`

const Weatherdiv = styled.div`
width: 15%;
margin: 25px;
background-color: #4eb85e;
border: 2px solid #a4a4a4;
border-radius: 5px;
justify-content: center;
text-align: center;
`

export default FavCityPage;