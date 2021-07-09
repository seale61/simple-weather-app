# simple-weather-app
## Full Stack Development Tutorial - Part 4
While this app is part of a 4 part tutorial, it can be setup without having to complete the other 3 tutorials. 

## Prerequisits
### API Key
In order to access the APIs, you will need to create a free account and get an API key from [https://openweathermap.org](OpenWeatherMap.org). Once you have created an account and acquired an API key, subscribe to the "Current Weather Data" API and "One Call" API. These APIs are free to use, but there are some restrictions involved as to how many times they can be accessed in a given time frame from a the same IP address. Please read the documentation.  

### Test data
In order to aid in testing and development, and so to avoid the need to constantly access the APIs, there is a mixin included with this project (src/mixins/test-data.js) that contains test data. To use the test data instead of the API, navigate to src/views/Home.js amd find the function "getForecastData." The first line of code in this function sets a variable named ***production***. Set the value to ***true*** to use the APIs, and set it to ***false*** to use the test data.  

    let production = true;       // Set this variable to true to use API, false to use test data  

