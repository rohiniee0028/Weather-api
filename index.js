function ByDefault(){
    document.getElementById("city").defaultValue="London"; 
    getSData();
    getData();
}
function getData(){

let city = document.getElementById("city").value;
localStorage.setItem("cityname",city);

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5881c4a70f1f474bc5289105d70aa1b5&units=metric`;

fetch(url)
.then(function(res){
    return res.json();
})
.then(function(res){
    console.log(res);
    append(res);
    
})
.catch(function(err){
   console.log(err);
});

}

function getDataLocation(lat,lon){
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5881c4a70f1f474bc5289105d70aa1b5`;
    
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
        let {lat,lon} = res.coord;
        append(res);
        getSevendaysData(lat,lon); 
        console.log(res);
    })
    .catch(function(err){
       console.log(res);
    });
    
}

function append(data){
    let container = document.getElementById("container");

    let map = document.getElementById("gmap_canvas");

    container.innerHTML = null;
    let city = document.createElement("h3");
    city.innerText = `City:${data.name}`;

    let min = document.createElement("h3");
    min.innerText = `Min temp:${data.main.temp_min}\u00B0`;

    let max = document.createElement("h3");
    max.innerText = `Max temp:${data.main.temp_max}\u00B0`;

    let current = document.createElement("h3");
    current.innerText = `Current temp:${data.main.temp}\u00B0`;

    let humidity = document.createElement("h3");
    humidity.innerText = `Humidity:${data.main.humidity}`;

    let weather = document.createElement("h3");
    weather.innerText = `Weather:${data.weather[0].description}`;

    let img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    img.setAttribute("class","imgappenddiv");

    let sunrise = document.createElement("h3");
    sunrise.innerText = `Sunrise:${data.sys.sunrise}`;

    let sunset = document.createElement("h3");
    sunset.innerText = `Sunset:${data.sys.sunset}`

    let wind = document.createElement("h3");
    wind.innerText = `Wind speed:${data.wind.speed}`;

    container.append(weather,city,img,humidity,min,max,current,sunrise,sunset,wind);

    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    document.getElementById("city").value=null;

}


function getWeather(){
    navigator.geolocation.getCurrentPosition(success);

    function success(position){
        var crd = position.coords;
    
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    
    getDataLocation(crd.latitude,crd.longitude);

    }
}


//showing seven days data-------------------------------------------------------------------------------




document.getElementById("submit").addEventListener("click",getSData);

function getSData(){

    let city = document.getElementById("city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5881c4a70f1f474bc5289105d70aa1b5`;
    
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
        console.log(res);
        let {lat,lon} = res.coord;
        console.log(lat,lon);
        getSevendaysData(lat,lon);
       
    })
    .catch(function(err){
       console.log(res);
    });
    
    }


function getSevendaysData(lat,lon){

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=5881c4a70f1f474bc5289105d70aa1b5&units=metric`;
    
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
      
        console.log(res.daily);
        appendSevenDaysData(res.daily);
    })
    .catch(function(err){
       console.log(err);
    });
}
function appendSevenDaysData(data){

    for(i=0;i<7;i++)
    {
        document.getElementById("day" +(i+1)+"Min").innerText = "Min:" +Number(data[i].temp.min)+ `\u00B0`;
    }
    for(i=0;i<7;i++)
    {
        document.getElementById("day" +(i+1)+"Max").innerText = "Max:" +Number(data[i].temp.max)+ `\u00B0`;
    }
    for(i=0;i<7;i++)
    {
        document.getElementById("img" +(i+1)).src = `http://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`;
    }

}

const d = new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
function CheckDay(day){
    if(day +d.getDay() > 6){
        return day + d.getDay()-7;
    }
    else{
        return day +d.getDay();
    }
}

for(i=0;i<7;i++){
   document.getElementById("day"+(i+1)).innerText = weekday[CheckDay(i)];
}
       





