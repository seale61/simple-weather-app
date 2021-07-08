<template>
  <v-card
    class="mx-auto mt-5"
    max-width="600"
    app
  >
    <v-list>

      <v-list-item two-line>
        <v-list-item-content>

          <v-list-item-title class="headline">
            {{ current.city }}
          </v-list-item-title>

          <v-list-item-subtitle>
            <strong>{{ current.dateTime }}</strong>
          </v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>
    
    </v-list>

    <v-divider />

    <v-card-text>
      <v-row align="center">
        <v-col class="display-2 mt-2 mb-0 p-0" cols="5">

          <div v-if="alerts.length > 0" class="alert-notice">
            <router-link to="/warn">
              <v-icon color="red">mdi-alert-outline</v-icon>
            </router-link>
          </div>
          {{ current.temperature }}&deg;F
          <div style="font-size: 1.1rem; font-style: italic">
            (Feels like {{ current.feels_like }} &deg;F)
          </div>

        </v-col>
        <v-col cols="7" align="center" class="pt-0 pb-4">

          <i class="icon_orange" :class="current.icon" />
          <v-list-item-subtitle>
            <h2>{{ current.description }}</h2>
          </v-list-item-subtitle>
        
        </v-col>
      </v-row>
    </v-card-text>

    <Current />
    <v-divider />

    <Today />
    <v-divider />

    <v-list class="transparent">
        <v-list-item>
            <h3>Extended Forecast</h3>
        </v-list-item>
    </v-list>
    <Forecast />
    
  </v-card>
</template>

<script>

  import { mapState } from 'vuex';
  import Current      from './Current';
  import Today        from './Today';
  import Forecast     from './Forecast';

  export default {
    name: 'weather',
    components: {
      Current,
      Today,
      Forecast
    },
    computed: {
      ...mapState([
        'current',
        'alerts'
      ])
    },
    data () {
      return {
        
      }
    },
  }
</script>
<style lang="scss">
.icon_orange {
  color: rgb(255, 173, 22)
}
.alert-notice {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
}
.clear {
  clear: both;
}
</style>