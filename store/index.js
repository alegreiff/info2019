import Vuex from "vuex";
import axios from "axios";
import lodash from "lodash";
import Cookie from "js-cookie";
import moment from "moment";
export const state = () => ({
  peliculas: [],
  codepaises: [
    {
      pais: "Afghanistan",
      code: "AF"
    },
    {
      pais: "Albania",
      code: "AL"
    },
    {
      pais: "Algeria",
      code: "DZ"
    },
    {
      pais: "Andorra",
      code: "AD"
    },
    {
      pais: "Angola",
      code: "AO"
    },
    {
      pais: "Anguilla",
      code: "AI"
    },
    {
      pais: "Antigua & Barbuda",
      code: "AG"
    },
    {
      pais: "Argentina",
      code: "AR"
    },
    {
      pais: "Armenia",
      code: "AM"
    },
    {
      pais: "Aruba",
      code: "AW"
    },
    {
      pais: "Australia",
      code: "AU"
    },
    {
      pais: "Austria",
      code: "AT"
    },
    {
      pais: "Azerbaijan",
      code: "AZ"
    },
    {
      pais: "Bahamas",
      code: "BS"
    },
    {
      pais: "Bahrain",
      code: "BH"
    },
    {
      pais: "Bangladesh",
      code: "BD"
    },
    {
      pais: "Barbados",
      code: "BB"
    },
    {
      pais: "Belarus",
      code: "BY"
    },
    {
      pais: "Belgium",
      code: "BE"
    },
    {
      pais: "Belize",
      code: "BZ"
    },
    {
      pais: "Benin",
      code: "BJ"
    },
    {
      pais: "Bermuda",
      code: "BM"
    },
    {
      pais: "Bolivia",
      code: "BO"
    },
    {
      pais: "Bosnia & Herzegovina",
      code: "BA"
    },
    {
      pais: "Brazil",
      code: "BR"
    },
    {
      pais: "Brunei",
      code: "BN"
    },
    {
      pais: "Bulgaria",
      code: "BG"
    },
    {
      pais: "Burkina Faso",
      code: "BF"
    },
    {
      pais: "Cambodia",
      code: "KH"
    },
    {
      pais: "Cameroon",
      code: "CM"
    },
    {
      pais: "Canada",
      code: "CA"
    },
    {
      pais: "Cape Verde",
      code: "CV"
    },
    {
      pais: "Caribbean Netherlands",
      code: "BQ"
    },
    {
      pais: "Cayman Islands",
      code: "KY"
    },
    {
      pais: "Central African Republic",
      code: "CF"
    },
    {
      pais: "Chile",
      code: "CL"
    },
    {
      pais: "China",
      code: "CN"
    },
    {
      pais: "Christmas Island",
      code: "CX"
    },
    {
      pais: "Colombia",
      code: "CO"
    },
    {
      pais: "Congo - Brazzaville",
      code: "CG"
    },
    {
      pais: "Congo - Kinshasa",
      code: "CD"
    },
    {
      pais: "Costa Rica",
      code: "CR"
    },
    {
      pais: "Côte d’Ivoire",
      code: "CI"
    },
    {
      pais: "Croatia",
      code: "HR"
    },
    {
      pais: "Cuba",
      code: "CU"
    },
    {
      pais: "Curaçao",
      code: "CW"
    },
    {
      pais: "Cyprus",
      code: "CY"
    },
    {
      pais: "Czechia",
      code: "CZ"
    },
    {
      pais: "Denmark",
      code: "DK"
    },
    {
      pais: "Djibouti",
      code: "DJ"
    },
    {
      pais: "Dominica",
      code: "DM"
    },
    {
      pais: "Dominican Republic",
      code: "DO"
    },
    {
      pais: "Ecuador",
      code: "EC"
    },
    {
      pais: "Egypt",
      code: "EG"
    },
    {
      pais: "El Salvador",
      code: "SV"
    },
    {
      pais: "Equatorial Guinea",
      code: "GQ"
    },
    {
      pais: "Estonia",
      code: "EE"
    },
    {
      pais: "Ethiopia",
      code: "ET"
    },
    {
      pais: "Faroe Islands",
      code: "FO"
    },
    {
      pais: "Finland",
      code: "FI"
    },
    {
      pais: "France",
      code: "FR"
    },
    {
      pais: "French Guiana",
      code: "GF"
    },
    {
      pais: "French Polynesia",
      code: "PF"
    },
    {
      pais: "Gabon",
      code: "GA"
    },
    {
      pais: "Georgia",
      code: "GE"
    },
    {
      pais: "Germany",
      code: "DE"
    },
    {
      pais: "Ghana",
      code: "GH"
    },
    {
      pais: "Gibraltar",
      code: "GI"
    },
    {
      pais: "Greece",
      code: "GR"
    },
    {
      pais: "Grenada",
      code: "GD"
    },
    {
      pais: "Guadeloupe",
      code: "GP"
    },
    {
      pais: "Guam",
      code: "GU"
    },
    {
      pais: "Guatemala",
      code: "GT"
    },
    {
      pais: "Guinea",
      code: "GN"
    },
    {
      pais: "Guinea-Bissau",
      code: "GW"
    },
    {
      pais: "Guyana",
      code: "GY"
    },
    {
      pais: "Haiti",
      code: "HT"
    },
    {
      pais: "Honduras",
      code: "HN"
    },
    {
      pais: "Hong Kong",
      code: "HK"
    },
    {
      pais: "Hungary",
      code: "HU"
    },
    {
      pais: "Iceland",
      code: "IS"
    },
    {
      pais: "India",
      code: "IN"
    },
    {
      pais: "Indonesia",
      code: "ID"
    },
    {
      pais: "Iran",
      code: "IR"
    },
    {
      pais: "Iraq",
      code: "IQ"
    },
    {
      pais: "Ireland",
      code: "IE"
    },
    {
      pais: "Israel",
      code: "IL"
    },
    {
      pais: "Italy",
      code: "IT"
    },
    {
      pais: "Jamaica",
      code: "JM"
    },
    {
      pais: "Japan",
      code: "JP"
    },
    {
      pais: "Jersey",
      code: "JE"
    },
    {
      pais: "Jordan",
      code: "JO"
    },
    {
      pais: "Kazakhstan",
      code: "KZ"
    },
    {
      pais: "Kenya",
      code: "KE"
    },
    {
      pais: "Kosovo",
      code: "XK"
    },
    {
      pais: "Kuwait",
      code: "KW"
    },
    {
      pais: "Kyrgyzstan",
      code: "KG"
    },
    {
      pais: "Laos",
      code: "LA"
    },
    {
      pais: "Latvia",
      code: "LV"
    },
    {
      pais: "Lebanon",
      code: "LB"
    },
    {
      pais: "Liberia",
      code: "LR"
    },
    {
      pais: "Libya",
      code: "LY"
    },
    {
      pais: "Lithuania",
      code: "LT"
    },
    {
      pais: "Luxembourg",
      code: "LU"
    },
    {
      pais: "Macau",
      code: "MO"
    },
    {
      pais: "Macedonia (FYROM)",
      code: "MK"
    },
    {
      pais: "Madagascar",
      code: "MG"
    },
    {
      pais: "Malawi",
      code: "MW"
    },
    {
      pais: "Malaysia",
      code: "MY"
    },
    {
      pais: "Mali",
      code: "ML"
    },
    {
      pais: "Malta",
      code: "MT"
    },
    {
      pais: "Marshall Islands",
      code: "MH"
    },
    {
      pais: "Martinique",
      code: "MQ"
    },
    {
      pais: "Mauritania",
      code: "MR"
    },
    {
      pais: "Mauritius",
      code: "MU"
    },
    {
      pais: "Mayotte",
      code: "YT"
    },
    {
      pais: "Mexico",
      code: "MX"
    },
    {
      pais: "Moldova",
      code: "MD"
    },
    {
      pais: "Monaco",
      code: "MC"
    },
    {
      pais: "Mongolia",
      code: "MN"
    },
    {
      pais: "Montenegro",
      code: "ME"
    },
    {
      pais: "Morocco",
      code: "MA"
    },
    {
      pais: "Mozambique",
      code: "MZ"
    },
    {
      pais: "Myanmar (Burma)",
      code: "MM"
    },
    {
      pais: "Nepal",
      code: "NP"
    },
    {
      pais: "Netherlands",
      code: "NL"
    },
    {
      pais: "New Caledonia",
      code: "NC"
    },
    {
      pais: "New Zealand",
      code: "NZ"
    },
    {
      pais: "Nicaragua",
      code: "NI"
    },
    {
      pais: "Niger",
      code: "NE"
    },
    {
      pais: "Nigeria",
      code: "NG"
    },
    {
      pais: "Norway",
      code: "NO"
    },
    {
      pais: "Oman",
      code: "OM"
    },
    {
      pais: "Pakistan",
      code: "PK"
    },
    {
      pais: "Palau",
      code: "PW"
    },
    {
      pais: "Palestine",
      code: "PS"
    },
    {
      pais: "Panama",
      code: "PA"
    },
    {
      pais: "Paraguay",
      code: "PY"
    },
    {
      pais: "Peru",
      code: "PE"
    },
    {
      pais: "Philippines",
      code: "PH"
    },
    {
      pais: "Poland",
      code: "PL"
    },
    {
      pais: "Portugal",
      code: "PT"
    },
    {
      pais: "Puerto Rico",
      code: "PR"
    },
    {
      pais: "Qatar",
      code: "QA"
    },
    {
      pais: "Réunion",
      code: "RE"
    },
    {
      pais: "Romania",
      code: "RO"
    },
    {
      pais: "Russia",
      code: "RU"
    },
    {
      pais: "Rwanda",
      code: "RW"
    },
    {
      pais: "Saudi Arabia",
      code: "SA"
    },
    {
      pais: "Senegal",
      code: "SN"
    },
    {
      pais: "Serbia",
      code: "RS"
    },
    {
      pais: "Seychelles",
      code: "SC"
    },
    {
      pais: "Sierra Leone",
      code: "SL"
    },
    {
      pais: "Singapore",
      code: "SG"
    },
    {
      pais: "Sint Maarten",
      code: "SX"
    },
    {
      pais: "Slovakia",
      code: "SK"
    },
    {
      pais: "Slovenia",
      code: "SI"
    },
    {
      pais: "South Africa",
      code: "ZA"
    },
    {
      pais: "South Korea",
      code: "KR"
    },
    {
      pais: "Spain",
      code: "ES"
    },
    {
      pais: "Sri Lanka",
      code: "LK"
    },
    {
      pais: "St. Lucia",
      code: "LC"
    },
    {
      pais: "St. Martin",
      code: "MF"
    },
    {
      pais: "St. Vincent & Grenadines",
      code: "VC"
    },
    {
      pais: "Sudan",
      code: "SD"
    },
    {
      pais: "Suriname",
      code: "SR"
    },
    {
      pais: "Swaziland",
      code: "SZ"
    },
    {
      pais: "Sweden",
      code: "SE"
    },
    {
      pais: "Switzerland",
      code: "CH"
    },
    {
      pais: "Syria",
      code: "SY"
    },
    {
      pais: "Taiwan",
      code: "TW"
    },
    {
      pais: "Tajikistan",
      code: "TJ"
    },
    {
      pais: "Tanzania",
      code: "TZ"
    },
    {
      pais: "Thailand",
      code: "TH"
    },
    {
      pais: "Timor-Leste",
      code: "TL"
    },
    {
      pais: "Togo",
      code: "TG"
    },
    {
      pais: "Trinidad & Tobago",
      code: "TT"
    },
    {
      pais: "Tunisia",
      code: "TN"
    },
    {
      pais: "Turkey",
      code: "TR"
    },
    {
      pais: "Turkmenistan",
      code: "TM"
    },
    {
      pais: "Turks & Caicos Islands",
      code: "TC"
    },
    {
      pais: "Uganda",
      code: "UG"
    },
    {
      pais: "Ukraine",
      code: "UA"
    },
    {
      pais: "United Arab Emirates",
      code: "AE"
    },
    {
      pais: "United Kingdom",
      code: "GB"
    },
    {
      pais: "United States",
      code: "US"
    },
    {
      pais: "Uruguay",
      code: "UY"
    },
    {
      pais: "Uzbekistan",
      code: "UZ"
    },
    {
      pais: "Venezuela",
      code: "VE"
    },
    {
      pais: "Vietnam",
      code: "VN"
    },
    {
      pais: "Western Sahara",
      code: "EH"
    },
    {
      pais: "Yemen",
      code: "YE"
    },
    {
      pais: "Zambia",
      code: "ZM"
    },
    {
      pais: "Zimbabwe",
      code: "ZW"
    },
    {
      pais: "Czech Republic",
      code: "CZ"
    },
    {
      pais: "Congo (Republic)",
      code: "CG"
    }
  ],
  datosestadisticos: [],
  vencimientos: [],
  visitaspaises: [],
  genero: ["Documental", "Ficción"],
  formato: ["Cortometraje", "Largometraje"],
  pais: [
    "Bolivia",
    "Colombia",
    "Ecuador",
    "Perú",
    "México",
    "Uruguay",
    "Brasil",
    "Venezuela",
    "Chile",
    "Paraguay",
    "Argentina",
    "Cuba",
    "Costa Rica"
  ],
  retinapais: ["Bolivia", "Colombia", "Ecuador", "Perú", "México", "Uruguay"],
  token: null,
  email: null,
  estadologin: null,
  //hoy: new Date().toISOString().substr(0, 10),
  hoy: moment().format("YYYY-MM-DD")
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setEstadoLogin(state, mensaje) {
    if (mensaje === "EMAIL_NOT_FOUND") {
      state.estadologin =
        "El correo no está registrado. Por favor comuníquese al correo cinebid.jaime@gmail.com y solicite un acceso";
    } else if (mensaje === "INVALID_PASSWORD") {
      state.estadologin = "La contraseña está errada";
    } else if (mensaje === "exito") {
      state.estadologin = "Ingreso exitoso";
    } else {
      state.estadologin = mensaje;
    }
  },
  setEmail(state, token) {
    state.email = token;
  },
  clearToken(state) {
    state.token = null;
  },
  clearEstadologin(state) {
    state.estadologin = null;
  },
  clearEmail(state) {
    state.email = null;
  },

  /*setPeliculas(state, peliculas) {
    state.peliculas = peliculas;
  },*/
  guardafechas(state, datos) {
    state.vencimientos = datos;
    console.log("guardafechas======");
  },
  guardaEstadisticas(state, datos) {
    state.datosestadisticos = datos;
    console.log("guardaEstadisticas======");
  },
  /*
  titlecambiado(state, peli) {
    const postIndex = state.peliculas.findIndex(pel => pel.id === peli.id);
    state.peliculas[postIndex].titulo = peli.titulo;
  },
  */
  visitaspaises(state, datos) {
    for (let index = 0; index < datos.length; ++index) {
      const postIndex = state.codepaises.findIndex(
        codigo => codigo.pais == datos[index].pais
      );

      //state.peliculas[postIndex].titulo = peli.titulo;
      if (postIndex >= 0) {
        datos[index].code = state.codepaises[postIndex].code;
      } else {
        console.log(postIndex + " <===" + datos[index].pais);
        datos[index].code = "ERRRRRORE";
      }
    }

    state.visitaspaises = datos;
  },
  sumatoriaPeliculas(state, datos) {
    datos.map(
      v =>
        (v.sumvisitas = v.visitas.reduce((prev, cur) => prev + cur.visitas, 0))
    );
    datos.sort(function(a, b) {
      return b.sumvisitas - a.sumvisitas;
    });

    /*MODIFICA Y ORDENA LAS TEMPORADAS*/
    for (var i = 0; i < datos.length; i++) {
      if (datos[i].temporadas.length > 1) {
        console.log(datos[i].temporadas.length + " <===");
        datos[i].temporadas = lodash.orderBy(
          datos[i].temporadas,
          ["entrada"],
          ["desc"]
        );
        //datos[i].tempes = datos[i].temporadas.length;
      }
    }
    /*FIN MODIFICA Y ORDENA LAS TEMPORADAS*/
    datos.map(datos => {
      let esactiva = "NO";
      /* var dias = 0; */
      if (datos.temporadas[0].salida == null) {
        esactiva = "SI";
      } else if (moment(datos.temporadas[0].salida).isSameOrAfter(state.hoy)) {
        esactiva = "SI";
      }
      datos.activa = esactiva;
      return datos;
    });
    state.peliculas = datos;
    console.log("sumatoriaPeliculas======");
  },
  titlecambiado(state, peli) {
    const postIndex = state.peliculas.findIndex(pel => pel.id === peli.id);
    state.peliculas[postIndex].titulo = peli.titulo;
  },
  fechasalidacambiada(state, datofecha) {
    const postIndex = state.vencimientos.findIndex(
      pel => pel.id === datofecha.id
    );
    console.log(postIndex + " -------------------------------------");
    state.vencimientos[postIndex].salida = datofecha.salida;
    let idpeliculaAfectada = state.vencimientos[postIndex].PeliculaId;
    const peliculaAfectada = state.peliculas.findIndex(
      pel => pel.id === idpeliculaAfectada
    );
    /* const temporadaafectada = state.peliculas[
      peliculaAfectada
    ].temporadas.findIndex(temporada => temporada.id === datofecha.id); */
    state.peliculas[peliculaAfectada].temporadas[0].salida = datofecha.salida;
  },
  guardaNuevaPelicula(state, datos) {
    state.peliculas.push(datos);
  }
};
export const actions = {
  /* cargaPeliculas(vuexContext, context) {
        return this.$axios
          .$get("peliculas?auth=" + vuexContext.state.token)
          .then(data => {
            vuexContext.commit("sumatoriaPeliculas", data);
          })
          .catch(e => context.error(e));
      },
      cargaEstadisticas(vuexContext, context) {
        return this.$axios
          .$get("estadisticas?auth=" + vuexContext.state.token)
          .then(data => {
            vuexContext.commit("guardaEstadisticas", data);
          })
          .catch(e => context.error(e));
      },
      cargaFechas(vuexContext, context) {
        return this.$axios
          .$get("fechas?auth=" + vuexContext.state.token)
          .then(data => {
            vuexContext.commit("guardafechas", data);
          })
          .catch(e => context.error(e));
      }, */
  nuxtServerInit(vuexContext, context) {
    return Promise.all([
      context.app.$axios
        .$get("peliculas?auth=" + vuexContext.state.token)
        .then(data => {
          vuexContext.commit("sumatoriaPeliculas", data);
        })
        .catch(e => context.error(e)),
      context.app.$axios
        .$get("estadisticas?auth=" + vuexContext.state.token)
        .then(data => {
          vuexContext.commit("guardaEstadisticas", data);
        })
        .catch(e => context.error(e)),
      context.app.$axios
        .$get("fechas?auth=" + vuexContext.state.token)
        .then(data => {
          vuexContext.commit("guardafechas", data);
          console.log(`Fechas: ${data.length}`);
        })
        .catch(e => context.error(e))
    ]);
  },
  cambiaTitulo(vuexContext, peli) {
    console.log(peli);
    return this.$axios
      .$put("peliculas/" + peli.id, peli)
      .then(res => {
        vuexContext.commit("titlecambiado", peli);
      })
      .catch(e => console.log(e));
  },
  cambiaFechaSalida(vuexContext, datosFechaCambiada) {
    return this.$axios
      .$put("fechas/" + datosFechaCambiada.id, datosFechaCambiada)
      .then(res => {
        vuexContext.commit("fechasalidacambiada", datosFechaCambiada);
      })
      .catch(e => console.log(e));
  },
  creaPelicula(vuexContext, datos) {
    console.log(datos);
    return this.$axios
      .$post("peliculas/", datos)
      .then(res => {
        console.log(" - - - creada la pelí...");
        vuexContext.commit("guardaNuevaPelicula", datos);
      })
      .catch(e => console.log(e));
  },
  restablecerpasswordusuario(vuexContext, correo) {
    let authURL =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyCcS-fd7pP5fpQbNXtLvABn0ZWUQE2L8S4";
    return this.$axios
      .$post(authURL, {
        email: correo,
        requestType: "PASSWORD_RESET"
      })
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data.error.message);
          console.log(error.response.status);
          return error.response.status;
        }
        //console.log(error.config);
      });
  },
  authenticateUser(vuexContext, authData) {
    let authURL =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCcS-fd7pP5fpQbNXtLvABn0ZWUQE2L8S4";

    return this.$axios
      .$post(authURL, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(result => {
        console.log(result);
        vuexContext.commit("setToken", result.idToken);
        vuexContext.commit("setEmail", result.email);
        if (process.client) {
          localStorage.setItem("email", result.email);
          localStorage.setItem("token", result.idToken);
          localStorage.setItem(
            "tokenExpiration",
            new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
          );
        }

        Cookie.set("email", result.email);
        Cookie.set("jwt", result.idToken);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        );
        /* return this.$axios.$post("http://localhost:3000/api/track-data", {
          data: "Authenticated Jimmy"
        }); */
        vuexContext.commit("setEstadoLogin", "exito");
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //console.log(error.response.data);

          console.log(error.response.data.error.message);
          console.log(error.response.status);
          //let salida = error.response.data.error.message;
          vuexContext.commit(
            "setEstadoLogin",
            error.response.data.error.message
          );

          //console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        //console.log(error.config);
      });
  },
  initAuth(vuexContext, req) {
    let email;
    let token;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("expirationDate="))
        .split("=")[1];
    } else {
      if (process.client) {
        token = localStorage.getItem("token");
        email = localStorage.getItem("email");
        expirationDate = localStorage.getItem("tokenExpiration");
      }
    }
    if (new Date().getTime() > +expirationDate || !token) {
      console.log("No token or inválido");
      vuexContext.dispatch("logout");
      return;
    }
    vuexContext.commit("setToken", token);
    vuexContext.commit("setEmail", email);
  },
  logout(vuexContext) {
    vuexContext.commit("clearToken");
    vuexContext.commit("clearEmail");
    vuexContext.commit("clearEstadologin");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  }
};
export const getters = {
  correoactivo(state) {
    return state.email;
  },
  esAutenticado(state) {
    return state.token != null;
  },
  visitaspaises(state) {
    return lodash.orderBy(
      state.visitaspaises,
      ["year", "mes"],
      ["desc", "desc"]
    );
  },
  acumuladosEstadisticos(state) {
    let acumulados = {};
    acumulados.sesiones = lodash.sumBy(state.datosestadisticos, "sesiones");
    acumulados.usuarios_analytics = lodash.sumBy(
      state.datosestadisticos,
      "usuarios_analytics"
    );
    acumulados.usuarios_wp = lodash.sumBy(
      state.datosestadisticos,
      "usuarios_wp"
    );
    acumulados.visitas_paginas = lodash.sumBy(
      state.datosestadisticos,
      "visitas_paginas"
    );
    acumulados.kaltura = lodash.sumBy(state.datosestadisticos, "kaltura");
    acumulados.duracion_media = lodash.meanBy(
      state.datosestadisticos,
      "duracion_media"
    );
    acumulados.rebote = lodash.meanBy(state.datosestadisticos, "rebote");
    acumulados.nuevas_sesiones = lodash.meanBy(
      state.datosestadisticos,
      "nuevas_sesiones"
    );
    return acumulados;
  },
  peliculasCargadas(state) {
    return state.peliculas;
  },
  salidasProximas(state) {
    return state.vencimientos;
  },
  cuantaspeliculas(state) {
    return state.peliculas.length;
  },
  cuantasfechas(state) {
    return state.vencimientos.length;
  },
  visitasPeliculas(state) {
    let datos = state.peliculas;
    let visitas = [];
    //recorro la película
    for (let i = 0; i < datos.length; ++i) {
      for (let j = 0; j < datos[i].visitas.length; ++j) {
        let nombrepelicula = lodash.find(state.peliculas, ["id", datos[i].id])
          .titulo;
        let paispelicula = lodash.find(state.peliculas, ["id", datos[i].id])
          .pais;
        visitas.push({
          pais: paispelicula,
          titulo: nombrepelicula,
          pelicula: datos[i].id,
          mes: datos[i].visitas[j].month,
          year: datos[i].visitas[j].year,
          visitas: datos[i].visitas[j].visitas
        });
      }
    }
    /*for (let index = 0; index < datos.length; ++index) {
      visitas.push({id: datos[index].id , visitas: datos[index].visitas})
    }*/
    visitas = lodash.orderBy(
      visitas,
      ["year", "mes", "visitas"],
      ["desc", "desc", "desc"]
    );
    return visitas;
  },
  allpaises(state) {
    return state.peliculas
      .map(item => item.pais)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
  }
};
