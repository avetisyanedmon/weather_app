import Geolocation from '@react-native-community/geolocation';
import { observer } from 'mobx-react-lite';
const { makeAutoObservable, runInAction, observable } = require("mobx");





class Store {
    
    weatherData = {};
    currentLoc = {};
    celsius = true;
    data = [];
    favorites = [];
    cityPageData= [];

    constructor() {
        makeAutoObservable(this)
    }

    getLocation(){
        Geolocation.getCurrentPosition(loc => runInAction(() => {
            this.currentLoc = {
                lat:loc.coords.latitude,
                lng:loc.coords.longitude
            }
        }))
    }

    changeCels(){
        this.celsius = !this.celsius
    }

    getData(){
        setTimeout(() =>{
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.currentLoc?.lat}&lon=${this.currentLoc?.lng}&appid=4731ea198a1e19cdc594363ec13377fb`)
            .then(respond => respond.json())
            .then(data => runInAction(() =>{
                this.data = data;
            }))
        })
    }

    getFavoriteCity(city){
        if(city.length > 0){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4731ea198a1e19cdc594363ec13377fb`)
            .then(response =>  response.json())
            .then(data => data.cod != 404 ? runInAction(() => {
                this.favorites.push(data)
                console.log(data)
        }) : '')}
    }

    getCityPageData(name){
        if(name?.length > 0){
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=4731ea198a1e19cdc594363ec13377fb`)
            .then(response => response.json())
            .then(data => runInAction(() => {
                this.cityPageData = data;
            }))
        }
    }
 
};



export default new Store();