<template>
  <v-app id="local-weather">
    <!-- Drawer -->
    <v-navigation-drawer 
        v-model="drawer" 
        app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Local Weather
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ current.city }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in drawerItems"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- App Bar -->
    <v-app-bar 
      app
      dark
      src="ga-sky.jpg"
    >

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title 
        style="cursor: pointer" 
        @click="$router.push('/')"
      >
        Simply Weather
      </v-toolbar-title>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['items', 'current'])
  },
  created() {
    this.drawerItems = this.items.filter(item => item.view === true);
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'SET_ITEMS') {
        this.drawerItems = this.items.filter(item => item.view === true);
      }
    });
  },
  data: () => ({
    drawer: false,
    drawerItems: [],
    home: '/'
  })
};
</script>
<style>
  a {
    text-decoration: none;
  }
</style>
