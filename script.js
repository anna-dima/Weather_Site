const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl= document.getElementById('current-items');
const timezone = document.getElementById('time-zone');
const countryEl= document.getElementById('country');
const weatherForcastEl=document.getElementById('weather-forcast');
const currentTempEl=document.getElementById('current-temp');
const days= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];



setInterval(()=>{
	const time = new Date();
	const month = time.getMonth();
	const date = time.getDate();
	const day = time.getDay();
	const hour = time.getHours();
	const hoursFormat= hour>= 13 ? hour %12: hour;
	const minutes = time.getMinutes();
	const ampm= hour>=12 ? 'PM' : 'AM';
	


	timeEl.innerHTML = hoursFormat+ ':' + minutes;
		dateEl.innerHTML= days[day]+', '+ date+ ' ' +months[month];

},1000);
getWeatherData();
var  URL=`api.openweathermap.org/data/2.5/forecast?lat=39.51219&lon=-84.76460&appid=d7471f3e139a291b90be7d5f056f4d50`;
const API_KEY='36b2ba68d63c1edc7de157f97eb920a5';


function getWeatherData(){
	a=$.ajax({
	url:URL,
	method:"GET"}).done(function(data){
		showWeatherData(data);
	}).fail(function(error){
	});
	
}

function showWeatherData(data){
	let {humidity, pressure, sunrise, sunset, wind_speed}=data.current;
	currentWeatherItemsEl.innerHTML= ` <div class="weather-item"><div>Humidity</div> <div>${humidity}</div></div><div class="weather-item"><div>Pressure</div><div>${pressure}</div></div><div class="weather-item"><div> Wind Speed</div><div>${wind_speed}</div></div><div class="weather-item"><div>Sunrise</div><div>${sunrise}</div></div><div class="weather-item"><div>Sunset</div><div>${sunset}</div></div>`;
}



