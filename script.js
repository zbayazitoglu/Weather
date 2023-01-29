var cities = [];

function setPage() {
    if(localStorage.getItem("cities") !== null) {
        cities = JSON.parse(localStorage.getItem("cities"));
    }
    cities.forEach((c) => {
        addButton(c);
    })    
}

function addButton(buttonText) {
    var button = $("<button>");
        button.text(buttonText).attr("id",buttonText);
        button.on("click", () => {
            getData(buttonText);
        })
        $("#history").prepend(button);
}

$("#search-button").on("click", function() {
    var term = $("#search-input").val() || "london";
    if(localStorage.getItem("cities") !== null) {
        cities = JSON.parse(localStorage.getItem("cities"));
    }
    if(cities.indexOf(term) === -1) {
       cities.push(term);
       localStorage.setItem("cities",JSON.stringify(cities));
       getData(term);
       addButton(term);
    }
    $("#search-input").val("");
});

function getData(callTerm) {
    var lon;
    var lat;

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q="+callTerm+"&appid=122837ec0c3dc22fd1d0b18bbf2d38f8",
        method: "GET"
    }).then(function(res) {
        lon = res.city.coord.lon;
        lat = res.city.coord.lat;
    });

    window.setTimeout(function() {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=122837ec0c3dc22fd1d0b18bbf2d38f8&units=metric",
            method: "GET"
        }).then(function(responseCurrent) {
            setCurrentData(responseCurrent);
        });
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=122837ec0c3dc22fd1d0b18bbf2d38f8&units=metric",
            method: "GET"
        }).then(function(forecastResp) {
            setForecastData(forecastResp);
        });
    }, 200);
    window.setTimeout(function(){
        $("#dashboard").attr("style", "");
    },250);
    
}

function setCurrentData(response) {
    var iconurl = "https://openweathermap.org/img/w/" + response.weather[0].icon+ ".png";
    $("#current-icon").attr("src",iconurl);
    var day= moment().get("date");
    var month = moment().get("month") + 1;
    var year = moment().get("year")
    $("#title").text(response.name + " " + "( " + day + "/" + month + "/" + year +" )");
    $("#current-temp").text("Temp: " + response.main.temp + " °C");
    $("#current-wind").text("Wind: " + response.wind.speed + " KPH");
    $("#current-hum").text("Humidity: " + response.main.humidity + "%");

}

function setForecastData(resp) {
    var iconurl1 = "https://openweathermap.org/img/w/" + resp.list[3].weather[0].icon+ ".png";
            $("#icon1").attr("src",iconurl1);
            $("#title1").text((resp.list[3].dt_txt.split(" "))[0]);
            $("#temp1").text("Temp: " + resp.list[3].main.temp + " °C");
            $("#wind1").text("Wind: " + resp.list[3].wind.speed + " KPH");
            $("#hum1").text("Humidity: " + resp.list[3].main.humidity + "%");
    var iconurl2 = "https://openweathermap.org/img/w/" + resp.list[11].weather[0].icon+ ".png";
            $("#icon2").attr("src",iconurl2);
            $("#title2").text((resp.list[11].dt_txt.split(" "))[0]);
            $("#temp2").text("Temp: " + resp.list[11].main.temp + " °C");
            $("#wind2").text("Wind: " + resp.list[11].wind.speed + " KPH");
            $("#hum2").text("Humidity: " + resp.list[11].main.humidity + "%");
    var iconurl3 = "https://openweathermap.org/img/w/" + resp.list[19].weather[0].icon+ ".png";
            $("#icon3").attr("src",iconurl3);
            $("#title3").text((resp.list[19].dt_txt.split(" "))[0]);
            $("#temp3").text("Temp: " + resp.list[19].main.temp + " °C");
            $("#wind3").text("Wind: " + resp.list[19].wind.speed + " KPH");
            $("#hum3").text("Humidity: " + resp.list[19].main.humidity + "%");
    var iconurl4 = "https://openweathermap.org/img/w/" + resp.list[27].weather[0].icon+ ".png";
            $("#icon4").attr("src",iconurl4);
            $("#title4").text((resp.list[27].dt_txt.split(" "))[0]);
            $("#temp4").text("Temp: " + resp.list[27].main.temp + " °C");
            $("#wind4").text("Wind: " + resp.list[27].wind.speed + " KPH");
            $("#hum4").text("Humidity: " + resp.list[27].main.humidity + "%");
    var iconurl5 = "https://openweathermap.org/img/w/" + resp.list[35].weather[0].icon+ ".png";
            $("#icon5").attr("src",iconurl5);
            $("#title5").text((resp.list[35].dt_txt.split(" "))[0]);
            $("#temp5").text("Temp: " + resp.list[35].main.temp + " °C");
            $("#wind5").text("Wind: " + resp.list[35].wind.speed + " KPH");
            $("#hum5").text("Humidity: " + resp.list[35].main.humidity + "%");
}

setPage();
