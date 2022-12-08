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

var  URL=`http://api.openweathermap.org/data/2.5/forecast?`;
const API_KEY='36b2ba68d63c1edc7de157f97eb920a5';

var tom=`https://api.tomtom.com/search/2/search/`;
const TOM_KEY='.json?key=DLFolWFOZpxbich8Qqa1gUVpmaLV4ybV';

$(document).ready(function(){
	$('#submit').click(function(){

		getlonglat();
	});
        
});

function getlonglat(){
	var  input=document.getElementById('search').value;
	a=$.ajax({
		url:tom+input+TOM_KEY,
		method:"GET"
	}).done(function(data){
		
		var lat=data.results[0].position.lat;
		var log=data.results[0].position.lon;
		getWeatherData(input,lat,log);
	}).fail(function(error){
		console.log("error");
	});

}
function getWeatherData(input,lat,log){
	a=$.ajax({
	url:URL+"lat="+lat+"&lon="+log+"&units=imperial&appid=36b2ba68d63c1edc7de157f97eb920a5",
	type:"GET",
	dataType:'json',
	}).done(function(data){
		var iconcode=data.list[0].weather[0].icon;
		var iconurl=("<img src='http://openweathermap.org/img/wn/"+iconcode+".png'/>");
		$("#current-humidity").html(data.list[0].main.humidity);
		$("#current-pressure").html(data.list[0].main.pressure);
		$("#current-wind").html(data.list[0].wind.speed);
		var date=new Date(data.list[8].dt_txt);
		var day=date.getDay();
		$('#day-0').html(days[day]);
		date=new Date(data.list[16].dt_txt);
		day=date.getDay();
		$('#day-1').html(days[day]);
		date=new Date(data.list[24].dt_txt);
		day=date.getDay();
		$('#day-2').html(days[day]);
		date=new Date(data.list[32].dt_txt);
		day=date.getDay();
		$('#day-3').html(days[day]);
		len=data.list.length;
		for(i=0;i<len;i++){
			 var j =i;
			var iconl=data.list[i].weather[0].icon;
			 var iconur=("<img src='http://openweathermap.org/img/wn/"+iconl+".png'/>");
			
			$('#icon-'+j).append(iconur);
			$('#temp-night-'+j).html('Night - ' +data.list[i].main.temp_min+'&#176;');
			$('#temp-day-'+j).html('Day - ' + data.list[i].main.temp_max+'&#176;');

		}
		var map=lat+"," + log;
		var jsonData=JSON.stringify(data);
		toPHP(input,map,jsonData);

	}).fail(function(error){
	});
	
}
const  phpUrl='http://172.17.12.154/final.php?';
function toPHP(input,map,data){

	a=$.ajax({
		url:phpUrl,
		method:"POST",
		data:{method:'setWeather',location:input,mapJson:map,weatherJson:data}
	}).done(function(data){
		console.log("worked");
	}).fail(function(error){
	});
}


