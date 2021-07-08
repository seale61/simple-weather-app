<template>
    <v-list class="transparent">
        <v-list-item>
            <h3>Current Conditions</h3>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>Wind</v-list-item-title>
            <v-list-item-subtitle>{{ current.wind_direction }} - {{ current.wind_speed }} mph</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>Pressure</v-list-item-title>
            <v-list-item-subtitle>{{ current.pressure }} (inHg)</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>Humidity</v-list-item-title>
            <v-list-item-subtitle>{{ current.humidity }}</v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    name: 'CurrentWeather',
    computed: {
      ...mapState(['current'])
    },
    data () {
      return {
        
      }
    },
  }
</script>