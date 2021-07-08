<template>
    <v-expansion-panels class="p-0">
        <v-expansion-panel v-for="item in forecast" :key="item.day">
            <v-expansion-panel-header>
                <v-list class="transparent p-0">
                    <div class="forecast-titlebar">
                        <div class="data-div"><b>{{ item.day }}</b></div>
                        <div class="data-div pl-5 icon_orange" style="text-align: center"> <i :class="item.icon" /></div>
                        <div class="data-div pr-3" style="text-align: right"><b>{{ item.high }}&deg;/{{ item.low }}&deg;</b></div>
                    </div>
                </v-list>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="p-0">
                <v-list class="transparent">
                    <v-list-item>
                        <h3>Outlook - {{ item.description }}</h3>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Sunrise</v-list-item-title>
                        <v-list-item-subtitle>{{ item.sunrise }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Sunset</v-list-item-title>
                        <v-list-item-subtitle>{{ item.sunset }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>High/Low Temps</v-list-item-title>
                        <v-list-item-subtitle>{{ item.high }}&deg;F / {{ item.low }}&deg;F</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Humidity</v-list-item-title>
                        <v-list-item-subtitle>{{ item.humidity }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Pressure</v-list-item-title>
                        <v-list-item-subtitle>{{ item.pressure }} (inHg)</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>UV Index</v-list-item-title>
                        <v-list-item-subtitle>{{ item.uv_index }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Precipitation chance</v-list-item-title>
                        <v-list-item-subtitle>{{ item.chance_of_pri }}</v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    name: 'weather',
    computed: {
      ...mapState(['forecast'])
    },
    data () {
      return {
        
      }
    },
  }
</script>
<style lang="scss">
    .forecast-titlebar {
        position: relative;
        width: 100%;
        float: left;

        .data-div {
            float: left;
            width: 33%;
        }
    }

</style>