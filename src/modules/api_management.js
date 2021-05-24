function execSearch(thisForm){
    const form = document.querySelector(thisForm);
    const input = form.querySelector('input[type=text]');
    const submit = form.querySelector('input[type=submit]');
    getData(input);

    submit.addEventListener('click', (e)=> {
        e.preventDefault();
        getData(input).catch(err => {
            alert("Oops, city not found. Try again.")
        })
    })
}   

const apiKey = process.env.API_KEY;
//promise based code to async await code
async function getData(inputField){
    const responseLATLON = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputField.value}&appid=${apiKey}`, {mode: 'cors'});
    const dataLATLON = await responseLATLON.json();
    const lat = dataLATLON[0].lat;
    const lon = dataLATLON[0].lon;
    const name = dataLATLON[0].name;
    const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`)
    const dataWeather = await responseWeather.json();
    const currentData = dataWeather.current;
    const nextWeekData = dataWeather.daily.slice(1,dataWeather.daily.length);
   
    // nextWeekData.forEach( el => {
    //     console.log(new Date(el.dt*1000).getDay());
    // });

    displayToday(currentData, name);
    displayNextWeek(nextWeekData);
}




function displayToday(todayData, city){
    const todayDashboard = document.querySelector('.today_dashboard_lower');
    const degrees = todayDashboard.querySelector('.degrees h1');
    const data = todayDashboard.querySelector('.today_dashboard_data');

    const location = data.querySelector('.location nobr');
    const weatherImage = data.querySelector('.weather_image img');
    const timeDate = data.querySelector('.time_date small');

    degrees.innerText = `${Math.round(todayData.temp)}°`;
    if (city.length > 8 ){
        location.innerText = `${city.substring(0,8)}.`;
    }else {
        location.innerText = `${city}`;
    }
    
    weatherImage.src = `https://openweathermap.org/img/wn/${todayData.weather[0].icon}.png`;
    // timeDate.innerText = `${new Date(todayData.dt*1000)}`;
    const date = new Date();
    const dateString = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()} - ${convertDay(date.getDay())}, ${date.getDate()} ${convertMonth(date.getMonth())} '${date.getFullYear().toString().slice(2)}`;
    
    timeDate.innerText = dateString;
}

function displayNextWeek(nextWeek){
    let container = document.querySelector('.container_content');
    container.innerHTML = '';

    let container_row = document.createElement('div');
    container_row.classList.add('content_row');

    let dayTag = document.createElement('span');
    let dayStrong = document.createElement('strong');

    let iconTag = document.createElement('span');

    let humidityTag = document.createElement('span');
    let humStrong = document.createElement('strong');

    let rainTag = document.createElement('span');
    let rainStrong = document.createElement('strong');

    let tempTag = document.createElement('span');
    let tempStrong = document.createElement('strong');

    container.appendChild(container_row);

    container_row.appendChild(dayTag);
    dayStrong.innerText = "DAY";
    dayTag.appendChild(dayStrong);
    
    container_row.appendChild(iconTag);

    container_row.appendChild(humidityTag);
    humStrong.innerText = "HUM";
    humidityTag.appendChild(humStrong);

    container_row.appendChild(rainTag);
    rainStrong.innerText = "RAIN";
    rainTag.appendChild(rainStrong);

    container_row.appendChild(tempTag);
    tempStrong.innerText = "TEMP";
    tempTag.appendChild(tempStrong);


    nextWeek.forEach( (day, idx) => {
        let date = new Date(day.dt * 1000);

        let container_row = document.createElement('div');
        container_row.classList.add('content_row');
        let dayCell = document.createElement('span');
        dayCell.innerText = `${convertDay(date.getDay())}`;

        let iconCell = document.createElement('span');
        let icon = document.createElement('img');
        icon.classList.add('icon');
        icon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        let humidityCell = document.createElement('span');
        if (day.humidity === undefined) {
            humidityCell.innerText = 'NaN';
        }else {
            humidityCell.innerText = `${day.humidity}%`;
        }
        

        let rainCell = document.createElement('span');

        if (day.rain === undefined) {
            rainCell.innerText = 'NaN';
        }else {
            rainCell.innerText = `${day.rain}`;
        }
        

        let tempCell = document.createElement('span');
        tempCell.innerText = `${Math.round(day.temp.min)}° ${Math.round(day.temp.max)}°`;

        container.appendChild(container_row);
        container_row.appendChild(dayCell);

        iconCell.appendChild(icon);
        container_row.appendChild(iconCell);
        
        container_row.appendChild(humidityCell);
        container_row.appendChild(rainCell);
        container_row.appendChild(tempCell);
    })

}

function convertMonth(month){
    switch(month){
        case 0:
            return "January";
            break;
        
        case 1:
            return "February";
            break;
            
        case 2:
            return "March";
            break;
        
        case 3:
            return "April";
            break;
        
        case 4:
            return "May";
            break;
            
        case 5:
            return "June";
            break;
            
        case 6:
            return "July";
            break;
            
        case 7:
            return "August";
            break;
            
        case 8:
            return "September";
            break;
            
        case 9:
            return "October";
            break;
            
        case 10:
            return "November";
            break;
        
        case 11:
            return "December";
            break;
    }
}

function convertDay(day){
    switch(day){
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
        case 0:
            return "Sunday";
    }
        
}

export {execSearch}