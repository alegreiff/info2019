<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      disable-resize-watcher
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click="drawer=false"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
      {{ correoactivo}}
      <v-btn v-if="esAutenticado" color="primary" @click="onLogout">Salir</v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
        <CabezoteGeneral/>
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "apps",
          title: "Inicio",
          to: "/"
        },
        /* {
          icon: "bubble_chart",
          title: "Comienzo",
          to: "/elinicio"
        }, */
        {
          icon: "bubble_chart",
          title: "Base",
          to: "/base"
        },
        {
          icon: "bubble_chart",
          title: "Inspire",
          to: "/inspire"
        },
        {
          icon: "bubble_chart",
          title: "Películas",
          to: "/peliculas"
        },
        {
          icon: "bubble_chart",
          title: "Salidas próximas",
          to: "/vencimiento"
        },
        {
          icon: "movie",
          title: "Nueva película",
          to: "/peliculanueva"
        },
        {
          icon: "movie",
          title: "Publicadas",
          to: "/publicadas"
        },
        {
          icon: "movie",
          title: "Estadísticas películas",
          to: "/estadisticas/peliculas"
        },
        {
          icon: "movie",
          title: "Estadísticas países",
          to: "/estadisticas/paises"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Retina Latina 2019"
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.drawer = false;
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["esAutenticado", "correoactivo"])
  }
};
</script>
