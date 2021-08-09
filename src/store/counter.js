const { makeAutoObservable } = require("mobx");

class Counter {
    
    constructor() {

        makeAutoObservable(this)
    }

    fetchWeather(){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Yerevan&appid=984850c0cb654ee3e177fbc13df76b69`)
        .then(response => response.json())
        .then(data => console.log(data))

    }

    increment() {
        this.count = this.count + 1;
    }

    decrement() {
        this.count = this.count - 1;
    }
}

export default new Counter();