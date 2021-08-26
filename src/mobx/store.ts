import {action, observable, runInAction, makeObservable} from "mobx";
import Geolocation from '@react-native-community/geolocation';
import cities from 'cities.json'


interface iFavorite {
    name: string;
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    }
}


interface iData {
    name: string;
    dt_txt: string;
    main: {
        temp: number;
    };
    weather: {
        icon: string;
        main: string
    }[]
}

interface iCity {
    country: string
    lat: string
    lng: string
    name: string
}


export class Store {

    @observable.ref currentLoc: { lat: number, lng: number } = {lat: 0, lng: 0};
    @observable.ref data: iData[] | [] = [];
    @observable.ref favorites: iFavorite[] | [] = [];
    @observable.ref celsius: boolean = true;
    @observable.ref weatherDate: string = '';
    @observable.ref haveCity: boolean = true;
    @observable.ref city: string = '';
    @observable.ref forecastNumber: number = 0;

    constructor() {
        this.getLocation()
        this.getData()
        makeObservable(this)
    }

    @action
    getLocation() {
        Geolocation.getCurrentPosition(loc => {
            this.currentLoc = {
                lat: loc.coords.latitude,
                lng: loc.coords.longitude
            }
        })

    }

    @action
    changeCels() {
        this.celsius = !this.celsius
    }


    @action
    getData() {
        setTimeout(() => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.currentLoc?.lat}&lon=${this.currentLoc?.lng}&appid=4731ea198a1e19cdc594363ec13377fb`)
                .then(response => response.json())
                .then(data =>runInAction(() => {
                    this.data = [
                        ...this.data,
                        ...data.list.map((l: iData) => ({
                                name: data.city.name,
                                dt_txt: l.dt_txt,
                                main: {
                                    temp: l.main.temp
                                },
                                weather: [{
                                    icon: l.weather[0].icon,
                                    main: l.weather[0].main
                                }]
                            })
                        )]
                }))
        })
    }

    @action
    getForecast() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=4731ea198a1e19cdc594363ec13377fb`)
            .then(response => response.json())
            .then(data => runInAction(() => {
                this.data = [
                    ...data.list.map((l: iData) => ({
                            name: data.city.name,
                            dt_txt: l.dt_txt,
                            main: {
                                temp: l.main.temp
                            },
                            weather: [{
                                icon: l.weather[0].icon,
                                main: l.weather[0].main
                            }]
                        })
                    )]
            }))
    }

    @action
    getFavoriteCity(city: string) {
        const myCities = cities as iCity[];
        const myCity = myCities.find(myCity => myCity.name === city) || false;
        if (myCity) {
            if(this.favorites.some((cityName:any) => cityName.name === city)){
                alert('City already in list')
            }else {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4731ea198a1e19cdc594363ec13377fb`)
                    .then(response => response.json())
                    .then(data =>
                        runInAction(
                            () => {
                                this.favorites = [
                                    ...this.favorites,
                                    {
                                        name: data.name,
                                        main: {
                                            ...data.main
                                        }
                                    }
                                ]
                            }
                        )
                    )
                    .catch((e) => console.log(e.message))
            }


        }
        else {
            alert("City doesn't exist!!!")
        }

    }
}


const store = new Store();
export default store;