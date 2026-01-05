<template>
  <v-app>
    <v-navigation-drawer
      v-if="hasSidebar"
      expand-on-hover
      rail
      permanent
      color="#f1f1f1"
    >
      <v-list density="comfortable" nav class="mt-4">
        <v-list-item
          link
          :title="section.name"
          :to="section.url"
          v-for="section in sections"
          :key="section.name"
          :prepend-icon="section.icon"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="#fff"
      flat
      height="70"
      style="left: 0; border-bottom: 3px #f3b228 solid"
    >
      <!-- <v-icon color="#f3b228" class="mr-5">{{ applicationIcon }}</v-icon> -->
      <img src="/yukon.svg" style="margin: -8px 155px 0 0" height="44" />
      <v-toolbar-title>
        <span style="font-weight: 700">{{ applicationName }}</span>

        <v-progress-circular
          :class="loadingClass"
          indeterminate
          color="#f3b228"
          size="20"
          width="2"
          class="ml-4"
        ></v-progress-circular>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-label dark>License Year:</v-label>
      <v-select
        v-model="licenseYear"
        smaller
        :items="licenseYears"
        dense
        style="margin-left: 15px; max-width: 150px; margin-right: 20px"
        hide-details
      ></v-select> -->

      <div v-if="isAuthenticated">
        <span>{{ username }}</span>
        <v-menu location="bottom" class="ml-0">
          <template #activator="{ props }">
            <v-btn icon color="primary" v-bind="props">
              <v-icon icon="mdi-dots-vertical"></v-icon>
            </v-btn>
          </template>

          <v-list density="comfortable" style="min-width: 200px">
            <v-list-item to="/profile" link :prepend-icon="'mdi-account'" title="My profile" />
            <v-divider />
            <v-list-item @click="signOut" link :prepend-icon="'mdi-exit-run'" title="Sign out" />
          </v-list>
        </v-menu>
      </div>
      <div v-else>
        <router-link to="/sign-in">Sign in</router-link>
      </div>

      <!-- <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon> -->
    </v-app-bar>

    <v-main v-bind:style="{ 'padding-left: 33px !important': !hasSidebar }">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-row>
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import router from "./router";
import store from "./store";
import * as config from "./config";

export default {
  name: "App",
  components: {},
  computed: {
    username() {
      return store.getters.fullName;
    },
    isAuthenticated() {
      return store.getters.isAuthenticated;
    }
  },
  data: () => ({
    dialog: false,
    drawer: null,
    drawerRight: null,
    headerShow: false,
    menuShow: false,
    loadingClass: "d-none",
    applicationName: config.applicationName,
    applicationIcon: config.applicationIcon,
    sections: config.sections,
    hasSidebar: false, //config.hasSidebar,
    hasSidebarClosable: config.hasSidebarClosable
  }),
  created: async function() {
    await store.dispatch("checkAuthentication");
    //this.username = store.getters.fullName
    console.log(this.isAuthenticated);

    if (!this.isAuthenticated) this.hasSidebar = false;
    else this.hasSidebar = config.hasSidebar;
  },
  watch: {
    isAuthenticated: function(val) {
      if (!val) this.hasSidebar = false;
      else this.hasSidebar = config.hasSidebar;
    }
  },
  methods: {
    nav: function(location) {
      router.push(location);
      console.log(location);
    },
    toggleHeader: function() {
      this.headerShow = !this.headerShow;
    },
    toggleMenu: function() {
      this.menuShow = !this.menuShow;
    },
    signOut: function() {
      store.dispatch("signOut");
      router.push("/");
    }
  }
};
</script>
