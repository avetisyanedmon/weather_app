import { observer } from 'mobx-react-lite';
import store from "../../mobx/store";
import styled from 'styled-components';



const HoursWeather = observer(() => {

    const date = store.weatherDate;
    const data = !date ? store.data.slice(0, 5): store.data.filter(d => d.dt_txt.includes(date));
    const celsius = store.celsius;
    


    return (
        <Content>
            {data?.map((d, id) => {
                return (
                    <Weatherdiv key={id}>
                        <p>{d.dt_txt.slice(11)}</p>
                        <p>{celsius ? Math.ceil(d.main.temp - 273) + "°C": Math.ceil(((d.main.temp - 273.15) * 9/5 + 32)) + "°F"}</p>
                        <img alt='icon' src={`http://openweathermap.org/img/wn/${d.weather?.[0].icon}.png`}/>
                    </Weatherdiv>
                )
            })}
        </Content>
    )
});


const Content = styled.div`
width: 15%;
padding: 15px 50px 0 0;
`
const Weatherdiv = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
border-bottom: 2px solid #a4a4a4;
`

export default HoursWeather;