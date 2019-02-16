<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h1>Estadísticas de película...</h1>
    </v-flex>
    <v-flex xs12 md3>
      <v-switch
        :label="veracumulado ? 'Ver reportes mensuales' : 'Ver reporte acumulado' "
        v-model="veracumulado"
        color="retinaazul"
      ></v-switch>
      <v-date-picker
        v-if="!veracumulado"
        v-model="picker"
        type="month"
        locale="es-es"
        :min="fechamenor"
        :max="fechamayor"
        color="retinaazul"
        class="elevation-10 mb-1"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 md6>
      <div id="regions_div" class="elevation-10 mb-1 mapagoogle"></div>
    </v-flex>
    <v-flex xs12 md3>
      <v-data-table
        :headers="headers"
        :items="veracumulado ?  paises : filtroVisitas"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.pais }}</td>
          <td class="text-xs-right">{{ props.item.sesiones }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["check-auth", "auth"],
  name: "estadisticas_paises",
  head: {
    link: [
      /* {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.min.css"
      } */
    ]
  },
  data() {
    return {
      lg: null,
      lgtotal: null,
      veracumulado: false,
      mes: null,
      year: null,
      picker: null,
      fechamenor: null,
      fechamayor: null,
      headers: [
        {
          text: "Título",
          align: "left",
          value: "pais"
        },
        {
          text: "Sesiones",
          value: "sesiones"
        }
      ],
      pagination: {
        sortBy: "sesiones",
        descending: true,
        rowsPerPage: 10 // -1 for All
      }
    };
  },
  asyncData(context) {
    return context.app.$axios
      .$get("paises/")
      .then(data => {
        /* return {
          datospaises: { ...data }
        }; */
        context.store.commit("visitaspaises", data);
      })
      .catch(e => context.error());
  },
  computed: {
    ...mapGetters(["visitaspaises"]),
    filtroVisitas() {
      var mes = this.mes;
      var year = this.year;
      var salida = this.visitaspaises.filter(function(dato) {
        return dato.mes == mes && dato.year == year;
      });
      let listagoogle = [["País", "Visitas"]];
      for (let i = 0; i < salida.length; i++) {
        listagoogle.push([salida[i].pais, salida[i].sesiones]);
      }
      this.lg = listagoogle;

      return salida;
      //return this.lodash.orderBy(salida, ["sesiones"], ["desc"]);
    },
    paises() {
      let listapaises = [...new Set(this.visitaspaises.map(item => item.pais))];
      let salida = [];
      for (let index = 0; index < listapaises.length; index++) {
        let visitaspais = this.lodash.filter(this.visitaspaises, [
          "pais",
          listapaises[index]
        ]);

        salida.push({
          pais: listapaises[index],
          sesiones: this.lodash.sumBy(visitaspais, "sesiones")
        });
      }
      let listagoogle = [["País", "Visitas"]];
      for (let i = 0; i < salida.length; i++) {
        listagoogle.push([salida[i].pais, salida[i].sesiones]);
      }
      this.lgtotal = listagoogle;
      this.mappa(listagoogle);

      return salida;
    }
  },
  mounted() {
    let arreglo = this.visitaspaises;
    let indice = arreglo.length - 1;
    let mes = arreglo[0].mes;
    let year = arreglo[0].year;
    let primermes = arreglo[indice].mes;
    let primeryear = arreglo[indice].year;
    this.picker = year + "-" + mes;
    this.fechamayor = year + "-" + mes;
    this.fechamenor = primeryear + "-" + primermes;
    this.mappa(this.lg);
  },
  methods: {
    mappa(val) {
      //console.log("Sil Va");

      var data = google.visualization.arrayToDataTable(val);

      var options = {
        displayMode: "region",
        legend: {
          textStyle: {
            color: "#ed347d",
            fontSize: 16,
            bold: true
          }
        },
        magnifyingGlass: {
          enable: true,
          zoomFactor: 7.5
        },
        tooltip: {
          textStyle: {
            color: "#5ac4ee",
            showColorCode: true
          }
        },
        region: "world",
        colorAxis: {
          colors: ["#eeeeee", "#ed347d"]
        },
        backgroundColor: "#81d4fa",
        datalessRegionColor: "#fff"
      };

      var chart = new google.visualization.GeoChart(
        document.getElementById("regions_div")
      );

      chart.draw(data, options);
    },
    mappaa() {}
  },
  watch: {
    picker(val) {
      let cadena = val.split("-");
      this.year = cadena[0];
      this.mes = cadena[1];
    },
    lg(val) {
      this.mappa(val);
    },
    veracumulado(val) {
      if (!val) {
        this.mappa(this.lg);
      } else {
        if (this.lgtotal) {
          this.mappa(this.lgtotal);
        }
      }
    }
  }
};
</script>

<style scoped>
.mapagoogle {
  width: 100%;
  height: 500px;
}
</style>