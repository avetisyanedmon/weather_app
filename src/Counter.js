import { observer } from 'mobx-react-lite';
import React from 'react';
import counter from './store/counter';



const Counter = observer( () => {

    console.log(navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
      }))

    return (
            <div className='counter'>
                <h1>Test</h1>
                <div className='btns'>
                    <button className='btn' onClick={() => counter.increment()}>+</button>
                    <button className='btn' onClick={() => counter.fetchWeather()}>-</button>
                </div>
            </div>
        )
    }
);

export default Counter;