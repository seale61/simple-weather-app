<template>
  <Weather />
</template>

<script>
import { mapState, mapActions } from "vuex";
import { testData } from "../mixins/test-data";
import Weather from "../components/Weather";

export default {
  name: "Home",
  mixins: [
      testData
  ],
  components: {
    Weather
  },
  computed: {
    ...mapState([
        "items"
    ]),
  },
  created() {
    this.getLocationAndForecast();
  },
  data: () => ({}),
  methods: {
    ...mapActions([
      "loadCurrent",
      "loadForecast",
      "loadToday",
      "loadAlerts",
      "setItems",
    ]),

    getLocationAndForecast() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.getForecastData();
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        alert("You browser does not support the geolocation API");
      }
    },

    getForecastData: async function() {

      let production = false;       // Set this variable to true for production, false for development
      let current_results = [];
      let one_call_results = [];

      if (production) {

        let weatherApiKey = process.env.VUE_APP_WEATHERKEY;

        let url = "https://api.openweathermap.org/data/2.5/weather?";
        let q_string = `lat=${this.latitude}&lon=${this.longitude}&units=imperial&appid=${weatherApiKey}`;

        url = url + q_string;
        current_results = await this.$http.get(url);
        current_results = current_results.data;

        url = "https://api.openweathermap.org/data/2.5/onecall?";
        q_string = `lat=${this.latitude}&lon=${this.longitude}&exclude=minutely&units=imperial&appid=${weatherApiKey}`;

        url = url + q_string;
        one_call_results = await this.$http.get(url);
        one_call_results = one_call_results.data;

      } else {

        current_results = this.current_data_test();
        one_call_results = this.one_call_test();

      }

      let sunrise = this.convertDate(
        one_call_results.current.sunrise,
        one_call_results.timezone_offset
      );
      sunrise = sunrise.ampm;

      let sunset = this.convertDate(
        one_call_results.current.sunset,
        one_call_results.timezone_offset
      );
      sunset = sunset.ampm;

      // Create date and time object
      let dateTime = this.convertDate(current_results.dt, current_results.timezone);
      let dayNightMod = this.dayOrNight(
        current_results.sys.sunrise,
        current_results.sys.sunset,
        current_results.dt,
        current_results.timezone
      );

      if (typeof one_call_results.alerts !== "undefined") {

        let drawerItems = this.items;   // Get drawer menu items from vuex store
        drawerItems[1].view = true;     // Make "Weather Alerts" in drawer menu items visible 
        this.setItems(drawerItems);     // Make modification to items in vuex store

        let alerts = one_call_results.alerts;

        for (let i = 0; i < alerts.length; i++) {
          let start = this.convertDate(
            alerts[i].start,
            one_call_results.timezone_offset
          );
          alerts[i].start = `${start.day}, ${start.ampm}`;

          let end = this.convertDate(
            alerts[i].end,
            one_call_results.timezone_offset
          );
          alerts[i].end = `${end.day}, ${end.ampm}`;

          alerts[i].warning = this.isWarning(alerts[i].event);
        }

        this.loadAlerts(alerts);    // Load alerts into vuex store

      }

      let current = {
        city:           current_results.name,
        dateTime:       `${dateTime.day}, ${dateTime.ampm}`,
        weather_icon:   current_results.weather[0].id,
        description:    this.titleCase(current_results.weather[0].description),
        temperature:    Math.round(current_results.main.temp),
        icon:           `owf owf-${current_results.weather[0].id}-${dayNightMod} owf-5x`,
        wind_speed:     Math.round(current_results.wind.speed),
        wind_direction: this.windDirection(current_results.wind.deg),
        pressure:       this.convertPressure(current_results.main.pressure),
        sunrise:        sunrise,
        sunset:         sunset,
        feels_like:     Math.round(one_call_results.current.feels_like),
        humidity:       one_call_results.current.humidity + "%",
        dew_point:      Math.round(one_call_results.current.dew_point),
        high_temp:      Math.round(one_call_results.daily[0].temp.max),
        low_temp:       Math.round(one_call_results.daily[0].temp.min),
      };

      this.current = current;
      this.loadCurrent(current);  // Load current current condition into vuex store

      let daily = one_call_results.daily;
      let forecast = [];

      for (let i = 0; i < daily.length; i++) {
        let f_sunrise = this.convertDate(
          daily[i].sunrise,
          one_call_results.timezone_offset
        );
        let f_sunset = this.convertDate(
          daily[i].sunset,
          one_call_results.timezone_offset
        );
        let day = this.convertDate(
          daily[i].dt,
          one_call_results.timezone_offset
        );
        let today = null;

        if (i === 0) {
          today = `Today's Forecast, ${day.day}`;
        } else {
          today = day.day;
        }

        forecast[i] = {
          day: today,
          weekday:          day.weekday,
          sunrise:          f_sunrise.ampm,
          sunset:           f_sunset.ampm,
          icon:             `owf owf-${daily[i].weather[0].id} owf-1x`,
          high:             Math.round(daily[i].temp.max),
          low:              Math.round(daily[i].temp.min),
          pressure:         this.convertPressure(daily[i].pressure),
          humidity:         Math.round(daily[i].humidity) + "%",
          uv_index:          Math.round(daily[i].uvi),
          wind:             `${this.windDirection(daily[i].wind_deg)} - ${Math.round(daily[i].wind_speed)} mph`,
          chance_of_pri:    Math.round(daily[i].pop * 100) + "%",
          description:      this.titleCase(daily[i].weather[0].description),
          modal_title:      `${today} - ${this.titleCase(daily[i].weather[0].description)}`,
        };
      }

      this.loadToday(forecast[0]);  // Load today's forecast into vuex store
      forecast.splice(0, 1);        // Remove today's forecast from weekly forecast
      this.loadForecast(forecast);  // Load weekly forecast into vuex store
    },

    dayOrNight: (sunrise, sunset, current, offset) => {

      // If the current time is before sunrise or after sunset, return "n",
      // otherwise return "d"

      if (offset < 0) {
        sunrise -= Math.abs(offset);
        sunset  -= Math.abs(offset);
        current -= Math.abs(offset);
      }

      if (offset > 0) {
        sunrise += Math.abs(offset);
        sunset  += Math.abs(offset);
        current += Math.abs(offset);
      }

      if (current < sunrise || current >= sunset) {
        return "n";
      } else {
        return "d";
      }
    },

    convertDate: (utc, offset) => {

      if (offset < 0) {
        utc -= Math.abs(offset);
      }
      if (offset > 0) {
        utc += Math.abs(offset);
      }

      var t = new Date(1970, 0, 1); // Epoch
      t.setSeconds(utc);

      let d = new Date(t);

      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      let minutes = null;

      if (d.getMinutes() == 0) {
        minutes = "00";
      } else {
        if (d.getMinutes() < 10) {
          minutes = "0" + d.getMinutes();
        } else {
          minutes = d.getMinutes();
        }
      }

      let ampmTime;

      if (d.getHours() > 12) {
        ampmTime = d.getHours() - 12 + ":" + minutes + " PM";
      } else {
        if (d.getHours() == 0) {
          ampmTime = 12 + ":" + minutes + " AM";
        } else {
          ampmTime = d.getHours() + ":" + minutes + " AM";
        }
      }

      return {
        date:   days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
        day:    days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate(),
        time:   d.getHours() + ":" + minutes,
        ampm:   ampmTime,
      };
    },

    titleCase: (str) => {
      str = str.toLowerCase().split(" ");
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    },

    isWarning: (alert) => {
      if (alert.search("Warning") >= 0) {
        return true;
      } else {
        return false;
      }
    },

    convertPressure: (mb) => {
      // millibars to inches of mercury (hPa)
      let hPa = mb * 0.0295301;

      //round to maximum of two decimals and return
      return Number(Math.round(hPa + "e" + 2) + "e-" + 2);
    },

    windDirection: (degree) => {
      if (degree > 337.5) {
        return "N";
      }
      if (degree > 292.5) {
        return "NW";
      }
      if (degree > 247.5) {
        return "W";
      }
      if (degree > 202.5) {
        return "SW";
      }
      if (degree > 157.5) {
        return "S";
      }
      if (degree > 122.5) {
        return "SE";
      }
      if (degree > 67.5) {
        return "E";
      }
      if (degree > 22.5) {
        return "NE";
      }
      return "N";
    },
  },
};
</script>
