import { observer } from 'mobx-react-lite';
import store from "../../mobx/store";
import { Styled } from './style';


const HoursWeather = observer(() => {

    const date = store.weatherDate;
    const data = !date ? store.data.slice(0, 5): store.data.filter(d => d.dt_txt.includes(date));
    const celsius = store.celsius;
    


    return (
        <Styled.Content>
            {data?.map((day) => {
                return (
                    <Styled.Weatherdiv key={day.dt}>
                        <p>{day.dt_txt.slice(11)}</p>
                        <p>{celsius ? Math.ceil(day.main.temp - 273) + "°C": Math.ceil(((day.main.temp - 273.15) * 9/5 + 32)) + "°F"}</p>
                        <img alt='icon' src={`http://openweathermap.org/img/wn/${day.weather?.[0].icon}.png`}/>
                    </Styled.Weatherdiv>
                )
            })}
        </Styled.Content>
    )
});




export default HoursWeather;