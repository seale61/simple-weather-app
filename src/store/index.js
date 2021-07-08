import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city:       null,
    current:    {},
    forecast:   [],
    today:      {},
    alerts:     [],
    items: [
      { 
        title:  'Weather', 
        icon:   'mdi-white-balance-sunny',
        to:     '/',
        color:  'orange',
        view:   true
      },
      { 
        title:  'Weather Alerts', 
        icon:   'mdi-alert-outline',
        to:     '/warn',
        color:  'red',
        view:   false
      },
      { 
        title:  'About', 
        icon:   'mdi-help-box', 
        to:     '/about', 
        color:  'green',
        view:   true
      },
    ],
  },
  mutations: {
    SET_ITEMS: (state, data) => {
      state.items = data;
    },
    LOAD_CURRENT: (state, data) => {
      state.current = data;
    },
    LOAD_FORECAST: (state, data) => {
      state.forecast = data;
    },
    LOAD_TODAY: (state, data) => {
      state.today = data;
    },
    LOAD_ALERTS: (state, data) => {
      state.alerts = data;
    },
    LOAD_WEATHERKEY: (state, data) => {
      state.weatherkey = data;
    }
  },
  actions: {
    setItems: (context, data) => {
      context.commit("SET_ITEMS", data);
    },
    loadCurrent: (context, data) => {
      context.commit("LOAD_CURRENT", data);
    },
    loadForecast: (context, data) => {
      context.commit("LOAD_FORECAST", data);
    },
    loadToday: (context, data) => {
      context.commit("LOAD_TODAY", data);
    },
    loadAlerts: (context, data) => {
      context.commit("LOAD_ALERTS", data);
    },
    loadWeatherkey: (context, data) => {
      context.commit("LOAD_WEATHERKEY", data);
    },
  }
})
