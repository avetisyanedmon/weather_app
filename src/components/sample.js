{
    name:data.name
    list:{
        dt_text:data.list.dt_text
        main:{
            temp:data.list.main.temp
        }
    }
    weather:{
        icon:weather.icon
    }
}


{
    name:data.name,
    main:{
        ...main
    }
}



setWeatherData(
    {name:data.name,
        main:{
            temp:data.main.temp
         },
    weather:[{icon:data.weather[0].icon}]
})


this.data = {
    dt_txt:data.dt_txt,
    main:{
        temp:data.main.temp
    },
    weather:[{
        icon:data.weather[0].icon
    }]
}