<template>
    <v-list class="transparent">
        <v-list-item>
            <h3>Today's Forecast - {{ today.description }}</h3>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>Sunrise</v-list-item-title>
            <v-list-item-subtitle>{{ today.sunrise }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>Sunset</v-list-item-title>
            <v-list-item-subtitle>{{ today.sunset }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>High/Low Temps</v-list-item-title>
            <v-list-item-subtitle>{{ today.high }}&deg;F / {{ today.low }}&deg;F</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>Humidity</v-list-item-title>
            <v-list-item-subtitle>{{ today.humidity }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>Pressure</v-list-item-title>
            <v-list-item-subtitle>{{ today.pressure }} (inHg)</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>UV Index</v-list-item-title>
            <v-list-item-subtitle>{{ today.uv_index }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>Precipitation chance</v-list-item-title>
            <v-list-item-subtitle>{{ today.chance_of_pri }}</v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    name: 'weather',
    computed: {
      ...mapState(['today'])
    },
    data () {
      return {
        
      }
    },
  }
</script>