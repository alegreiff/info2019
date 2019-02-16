<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4 text-xs-left>
        <v-btn color="retinarojo" dark @click="enviaEmail">Prueba correo</v-btn>
        <v-switch
          :label="veracumulado ? 'Ver reportes mensuales' : 'Ver reporte acumulado' "
          v-model="veracumulado"
          color="retinaazul"
        ></v-switch>
        <v-date-picker
          v-if="!veracumulado"
          v-model="picker"
          full-width
          type="month"
          locale="es-es"
          :min="fechamenor"
          :max="fechamayor"
          color="retinaazul"
          class="elevation-1 mb-1"
        ></v-date-picker>
        <bar-chart v-if="veracumulado" :datox="datocarta" :textTitulo="titulo" class="cartta"></bar-chart>
      </v-flex>
      <v-flex xs12 md6 lg8>
        <v-layout row wrap>
          <v-flex xs12>
            <h4>{{ veracumulado ? 'Reporte acumulado' : 'Reportes mensuales' }}</h4>
          </v-flex>
          <v-flex xs12 md6 lg3>
            <InfoDato
              @muestraG="showGraph('kaltura', 'Reproducciones en Kaltura')"
              :dato="numKaltura"
              :fecha="veracumulado ? null : picker"
            >
              <p slot="header">Reproducciones en Kaltura</p>
            </InfoDato>
          </v-flex>
          <v-flex xs12 md6 lg3>
            <InfoDato
              @muestraG="showGraph('sesiones', 'Sesiones')"
              :dato="numSesiones"
              :fecha="veracumulado ? null : picker"
            >
              <p slot="header">Sesiones</p>
            </InfoDato>
          </v-flex>
          <v-flex xs12 md6 lg3>
            <InfoDato
              @muestraG="showGraph('usuarios_wp', 'Usuarios únicos en WordPress')"
              :dato="numUsuariosWp"
              :fecha="veracumulado ? null : picker"
            >
              <p slot="header">Usuarios únicos en WordPress</p>
            </InfoDato>
          </v-flex>
          <v-flex xs12 md6 lg3>
            <InfoDato
              @muestraG="showGraph('duracion_media', 'Duración media de la sesión')"
              :dato="numDuracionMedia"
              :fecha="veracumulado ? null : picker"
              :time="true"
              :filtro="'fminsec'"
            >
              <p slot="header">Duración media de la sesión</p>
            </InfoDato>
          </v-flex>
          <v-flex xs12 md6 lg3>
            <InfoDato
              @muestraG="showGraph('nuevas_sesiones', 'Porcentaje de nuevas sesiones')"
              :dato="numNuevasSesiones"
              :fecha="veracumulado ? null : picker"
              :filtro="'fdec2%'"
            >
              <p slot="header">Porcentaje de nuevas sesiones</p>
            </InfoDato>
          </v-flex>
          <v-flex xs12 md6 lg3>
            <InfoDato
              @muestraG="showGraph('rebote', 'Porcentaje de rebote')"
              :dato="numRebote"
              :fecha="veracumulado ? null : picker"
              :filtro="'fdec2%'"
            >
              <p slot="header">Porcentaje de rebote</p>
            </InfoDato>
          </v-flex>

          <v-flex xs12 md6 lg3>
            <InfoDato
              @muestraG="showGraph('usuarios_analytics', 'Usuarios únicos en Google Analytics')"
              :dato="numUsuariosAnalytics"
              :fecha="veracumulado ? null : picker"
            >
              <p slot="header">Usuarios únicos en Google Analytics</p>
            </InfoDato>
          </v-flex>

          <v-flex xs12 md6 lg3>
            <InfoDato
              @muestraG="showGraph('visitas_paginas', 'Visitas a páginas')"
              :dato="numVisitasPaginas"
              :fecha="veracumulado ? null : picker"
            >
              <p slot="header">Visitas a páginas</p>
            </InfoDato>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12></v-flex>
        <v-flex xs2></v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
//window.emailjs.init("user_wYDPvWn76KJLnrjUWgmAD");
import { mapState, mapGetters } from "vuex";
import BarChart from "@/components/Chart";

export default {
  middleware: ["check-auth", "auth"],
  head: {
    script: [
      { src: "https://cdn.emailjs.com/sdk/2.3.2/email.min.js" }
      /* { src: "js/emailjs.js" } */
    ]
  },
  name: "inicio_retinalatina",
  components: {
    BarChart
  },
  data() {
    return {
      veracumulado: true,
      picker: null,
      fechamayor: null,
      fechamenor: null,
      year: null,
      mes: null,
      parametroGrafica: "kaltura",
      coloresGrafica: [
        "#e63274",
        "#1179a2",
        "#18ace7",
        "#cc195b",
        "#4FC3F7",
        "#81D4FA"
      ],
      titulo: "Reproducciones en Kaltura"
    };
  },
  computed: {
    ...mapState(["datosestadisticos"]),
    ...mapGetters(["acumuladosEstadisticos"]),
    datoActivo() {
      var mes = this.mes;
      var year = this.year;
      var salida = this.datosestadisticos.filter(function(dato) {
        return dato.mes == mes && dato.year == year;
      });
      return salida;
    },
    subconjunto() {
      let salida = [];
      for (let i = 0; i < this.datosestadisticos.length; i++) {
        salida.push({
          periodo:
            this.datosestadisticos[i].mes +
            "--" +
            this.datosestadisticos[i].year,
          year: this.datosestadisticos[i].year,
          kaltura: this.datosestadisticos[i].kaltura
        });
      }
      return salida;
    },
    datocarta() {
      return {
        datasets: [
          {
            label: "2016",
            backgroundColor: this.coloresGrafica[0],
            data: this.valores(this.parametroGrafica, 2016)
            //data: [null, null, 4505, null,1,2,3,4]
          },
          {
            label: "2017",
            backgroundColor: this.coloresGrafica[1],
            data: this.valores(this.parametroGrafica, 2017)
          },
          {
            label: "2018",
            backgroundColor: this.coloresGrafica[2],
            data: this.valores(this.parametroGrafica, 2018)
          },
          {
            label: "2019",
            backgroundColor: this.coloresGrafica[3],
            data: this.valores(this.parametroGrafica, 2019)
          }
        ]
      };
    },
    numKaltura() {
      if (this.veracumulado) {
        return this.acumuladosEstadisticos.kaltura;
      } else {
        return this.datoActivo[0].kaltura;
      }
    },
    numSesiones() {
      if (this.veracumulado) {
        return this.acumuladosEstadisticos.sesiones;
      } else {
        return this.datoActivo[0].sesiones;
      }
    },
    numUsuariosAnalytics() {
      if (this.veracumulado) {
        return this.acumuladosEstadisticos.usuarios_analytics;
      } else {
        return this.datoActivo[0].usuarios_analytics;
      }
    },
    numUsuariosWp() {
      if (this.veracumulado) {
        return this.acumuladosEstadisticos.usuarios_wp;
      } else {
        return this.datoActivo[0].usuarios_wp;
      }
    },
    numVisitasPaginas() {
      if (this.veracumulado) {
        return this.acumuladosEstadisticos.visitas_paginas;
      } else {
        return this.datoActivo[0].visitas_paginas;
      }
    },
    numRebote() {
      if (this.veracumulado) {
        return this.acumuladosEstadisticos.rebote;
      } else {
        return this.datoActivo[0].rebote;
      }
    },
    numNuevasSesiones() {
      if (this.veracumulado) {
        return this.acumuladosEstadisticos.nuevas_sesiones;
      } else {
        return this.datoActivo[0].nuevas_sesiones;
      }
    },
    numDuracionMedia() {
      if (this.veracumulado) {
        //return this.minsec(this.acumuladosEstadisticos.duracion_media)
        return this.acumuladosEstadisticos.duracion_media;
      } else {
        //return this.minsec(this.datoActivo[0].duracion_media)
        return this.datoActivo[0].duracion_media;
      }
    }
  },
  methods: {
    enviaEmail() {
      var templateParams = {
        to_name: "Querido James",
        from_name: "Jaime de Greiff",
        message_html: `Welcome to EmailJS documentation! Here are a few good places to start:

Take a look at EmailJS overview
Get started with setting up your account via the EmailJS dashboard
Dive right in and install EmailJS on your website
Browse through our Javascript or REST APIs`,
        pelicula: "Son los sueños todavía"
      };
      emailjs.init("user_wYDPvWn76KJLnrjUWgmAD");
      emailjs.send("gmail", "template_oeR3IrN9", templateParams).then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function(error) {
          console.log("FAILED...", error);
        }
      );
    },
    colores() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    showGraph(val, titulo) {
      //alert("J")
      this.parametroGrafica = val;
      this.titulo = titulo;
    },
    valores(propiedad, year) {
      let temporal = this.lodash.filter(this.datosestadisticos, ["year", year]);
      let cuenta = temporal.length;

      if (cuenta == 12) {
        return this.lodash.map(temporal, propiedad);
      } else {
        let arr = [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ];
        for (let i = 0; i < cuenta; i++) {
          for (let j = 1; j < 13; j++) {
            if (temporal[i].mes === j) {
              arr[j - 1] = temporal[i][propiedad];
            }
          }
        }
        return arr;
      }
    }
  },
  watch: {
    picker(val) {
      let cadena = val.split("-");
      this.year = cadena[0];
      this.mes = cadena[1];
    }
  },
  mounted() {
    if (this.datosestadisticos) {
      let indice = this.datosestadisticos.length - 1;
      let mes = this.datosestadisticos[0].mes;
      let year = this.datosestadisticos[0].year;
      let primermes = this.datosestadisticos[indice].mes;
      let primeryear = this.datosestadisticos[indice].year;
      this.picker = primeryear + "-" + primermes;
      this.fechamenor = year + "-" + mes;
      this.fechamayor = primeryear + "-" + primermes;
    }
  }
};
</script>
<style scoped>
.caja {
  border-radius: 0.5em;
  border: 2px crimson solid;
}
.charta {
  /*max-height: 200px;*/
  border: 5px dashed crimson;
}
.cartta {
  position: relative;
}
</style>
