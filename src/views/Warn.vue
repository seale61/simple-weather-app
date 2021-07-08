<template>
    <div>
        <v-card 
            v-for="(alert, index) in alerts" :key="index"
            class="mx-auto mt-5"
            max-width="600"
            app
        >
            <v-card-text>
                <v-card-title>
                    <span 
                        class="alert-title"
                        :class="{'warn': alert.warning}"
                    >
                        {{ alert.event }}
                    </span>
                </v-card-title>
                <v-card-subtitle 
                    class="pl-5"
                >
                    <strong>
                        {{ alert.sender_name }}
                    </strong>
                </v-card-subtitle>
                <h4
                    class="pl-5 date-range-text"
                >
                    Start: {{ alert.start }}<br>End: {{ alert.end }}
                </h4>
                <v-card-text 
                    class="pl-5 alert-message"
                >
                    {{ alert.description }}
                </v-card-text>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    name: 'alerts',
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
<style scoped>

.alert-title {
    color: white;
    font-weight: bold;
    background-color: darkorange;
    width: 100%;
    padding-left: 5px;
}
.alert-message {
    font-family:'Lucida Console', monospace;
    font-size: 0.9rem;
    margin-top: 10px;
}
.warn {
    color: white;
    background-color: crimson;
}
.date-range-text {
    font-family:'Lucida Console', monospace;
    font-weight: bold !important;
}
</style>
