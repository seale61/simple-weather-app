# simple-weather-app
## Full Stack Development Tutorial - Part 4 (stand-alone web app)
While this app is part of a 4-part tutorial, it can be setup and used without having to complete the other 3 tutorials.  

## Framework: Vue 2 + Vuetify

## Installation
If you don't have **git** installed, be sure to do this first. From a terminal command line, clone this repository by entering:   
  
    git clone https://github.com/seale61/simple-weather-app.git  
    cd simple-weather-app  
    npm install  


## Prerequisits
### API Key
In order to access the APIs, you will need to create a free account and get an API key from [OpenWeatherMap.org](https://openweathermap.org/api). Once you have created an account and acquired an API key, subscribe to the "Current Weather Data" API and "One Call" API. These APIs are free to use, but there are some restrictions involved as to how many times they can be accessed in a given time frame from a the same IP address. Please read the documentation.  

### Test data
In order to aid in testing and development, and so to avoid the need to constantly access the APIs, there is a mixin included with this project (src/mixins/test-data.js) that contains test data. To use the test data instead of the API, navigate to ___src/views/Home.vue___ and find the function "___getForecastData___." The first line of code in this function sets a variable named ***production***. Set the value to ***true*** to use the APIs, and set it to ***false*** to use the test data.  

    let production = true;       // Set this variable to true to use the API, false to use test data  

### Create a .env file for your API key
In the root folder of your project, create a file called ___***.env***___ and enter the following line

    VUE_APP_WEATHERKEY=ENTER_YOUR_API_KEY_HERE
    

   
