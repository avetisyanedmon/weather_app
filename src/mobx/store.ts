import { action, observable, runInAction, makeObservable } from "mobx";
import Geolocation from '@react-native-community/geolocation';

    interface Favorite {
        name:string;
        main:{
            feels_like:number;
            humidity: number;
            pressure: number;
            temp: number;
            temp_max: number;
            temp_min: number;
        }
    }



    export interface Data {
        name:string;
        dt_txt:string;
        main:{
            temp:number;
        };
        weather:{
            icon:string;
            main:string
        }[]
    } 




export class Store {

    @observable.ref currentLoc: {lat:number, lng:number} = {lat:0, lng:0};
    @observable.ref data: Data[] | [] = [];
    @observable.ref favorites: Favorite[] | [] = [];
    @observable.ref celsius: boolean = true;
    @observable.ref weatherDate: string = '';
    @observable.ref haveCity: boolean = true;
    @observable.ref city: string = '';
    @observable.ref forecastNumber: number = 0;
    
    constructor(){
        this.getLocation()
        this.getData()
        makeObservable(this)
    }

    @action
    getLocation(){
         Geolocation.getCurrentPosition(loc =>  {
            this.currentLoc = {
                lat:loc.coords.latitude,
                lng:loc.coords.longitude
            }
        })
        
    }

    @action
    changeCels(){
        this.celsius = !this.celsius
    }


    @action
    getData(){
        setTimeout(() => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.currentLoc?.lat}&lon=${this.currentLoc?.lng}&appid=4731ea198a1e19cdc594363ec13377fb`)
            .then(response => response.json())
            .then(data => this.data = [
                ...this.data,
                ...data.list.map((l:Data) => ({
                    name:data.city.name,
                    dt_txt:l.dt_txt,
                    main:{
                        temp:l.main.temp
                    },
                    weather:[{
                        icon:l.weather[0].icon,
                        main:l.weather[0].main
                    }]
                }) 
                 )])
        })
    }

    @action
    getForecast(){
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=4731ea198a1e19cdc594363ec13377fb`)
        .then(response => response.json())
        .then(data => this.data = [
            ...data.list.map((l:Data) => ({
                name:data.city.name,
                dt_txt:l.dt_txt,
                main:{
                    temp:l.main.temp
                },
                weather:[{
                    icon:l.weather[0].icon,
                    main:l.weather[0].main
                }]
            }) 
             )])
    }
    
    @action
    getFavoriteCity(city: string){
        if(city.length > 0){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4731ea198a1e19cdc594363ec13377fb`)
            .then(response =>  response.json())
            .then(data => data.cod != 404 ? runInAction(() => {
                this.favorites = [
                    ...this.favorites,
                    {
                        name:data.name,
                        main:{
                            ...data.main
                        }
                    }
                ]
        }) : '')}

    }

}




const store = new Store();
export default store;