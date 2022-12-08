
$(document).ready(function(){
          $('#submit').click(function(){

                history();
        });
 
              


});

const  phpUrl='final.php?method=getWeather&date=';
function history(){

   	 let  inputDay=document.getElementById('input-day').value;
	let max=document.getElementById('quantity').value;
        a=$.ajax({
                url:phpUrl+inputDay,
                method:"GET"
        }).done(function(data){
		$('#history').html("");
		for(let i=0;i<max;i++){
			$('#history').append("<tr><td>"+data.result[i].DateTime+"</td><td>"+data.result[i].Location+"</td><td>"+data.result[i].MapJson+"</td><td>"+"<input type='button' id='more' value='Click Here For Weather' onclick='more("+i+")'></td></tr>");

		}
                console.log(data);
        }).fail(function(error){
                console.log("error outputting data");
        });
}
function more(index){
	 let  inputDay=document.getElementById('input-day').value;
	  a=$.ajax({
                url:phpUrl+inputDay,
                method:"GET"
	  }).done(function(data){
		 weather=JSON.parse(data.result[index].WeatherJson);
		$('#date-1').append(weather.list[0].dt_txt);
		 $('#data-1').html(JSON.stringify(weather.list[0]));
		$('#date-2').append(weather.list[8].dt_txt);
                 $('#data-2').html(JSON.stringify(weather.list[8]));
		$('#date-3').append(weather.list[16].dt_txt);
                 $('#data-3').append(JSON.stringify(weather.list[16]));
		$('#date-4').append(weather.list[24].dt_txt);
                 $('#data-4').append(JSON.stringify(weather.list[24]));
		$('#date-5').append(weather.list[32].dt_txt);
                 $('#data-5').append(JSON.stringify(weather.list[32]));


	  }).fail(function(error){
		  console.log("error fetching data");
	  });
}

