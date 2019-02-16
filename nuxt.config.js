const pkg = require("./package");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const env = require("dotenv").config();
//console.log(env);
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
console.log("IMPORTANTE ====== " + process.env.DEPLOY_ENV);
console.log("IMPORTANTE ====== " + process.env.NODE_ENV);

const routerBase =
  process.env.DEPLOY_ENV === "RETINA"
    ? {
        router: {
          base: "/jaime/"
        }
      }
    : {};

module.exports = {
  ...routerBase,
  router: {
    // Run the middleware/user-agent.js on every page
    middleware: "biko",
    beforeEach(to, from, next) {
      console.log(to);
    }
  },
  mode: "universal",
  env: env.parsed,
  /*router: {
    base: "/jaime/"

  },*/
  server: {
    port: 3005, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  watchers: {
    webpack: {
      poll: true
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "Retina Latina 2019 (en desarollo)",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ],
    script: [
      { src: "https://www.gstatic.com/charts/loader.js" },
      { src: "js/cargaGoogleMap.js" }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl", "@/assets/sass/estilos.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vuetify",
    "~plugins/base-componentes",
    "~plugins/lodash",
    "~plugins/filtros"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", ["@nuxtjs/moment", { locales: ["es-us"] }]],
  axios: {
    baseURL: process.env.BASE_URL || "https://js.presencia.co",
    credentials: false
  },
  //APIKEY FIREBASE = AIzaSyCcS-fd7pP5fpQbNXtLvABn0ZWUQE2L8S4
  /*
   ** Build configuration
   */
  build: {
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
