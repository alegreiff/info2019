<template>
  <v-layout row wrap>
    <v-flex xs4 offset-xs4>
      <h2>Películas publicadas</h2>
      <p>PICKER DATE: {{ pickerDate }}</p>
    </v-flex>
    <v-flex xs6>
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        :events="lasfechas"
        :picker-date.sync="pickerDate"
        :event-color="colores"
        locale="es-es"
        :min="fechamenor"
        :max="fechamayor"
        landscape
        color="retinaazul"
      ></v-date-picker>
    </v-flex>
    <v-flex xs6>
      <v-card>
        <v-card-title>
          <h4>{{ date }}</h4>
        </v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>Películas cargadas:</v-list-tile-content>
            <!-- <v-list-tile-content class="align-end">{{ peliculasSubidas.length }}</v-list-tile-content> -->
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Minutos cargados:</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <strong>{{ minutosSubidos }}</strong>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Largometrajes: {{ cuentaLargos.true ? cuentaLargos.true : 0 }}</v-list-tile-content>
            <v-list-tile-content
              class="align-end"
            >Cortometrajes: {{ cuentaLargos.false ? cuentaLargos.false : 0 }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Documental: {{ cuentaDocu.true ? cuentaDocu.true : 0 }}</v-list-tile-content>
            <v-list-tile-content
              class="align-end"
            >Ficción: {{ cuentaDocu.false ? cuentaDocu.false : 0 }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-container fluid grid-list-md>
      <v-data-iterator
        :items="peliculasSubidas"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="div"
        content-class="layout row wrap"
        hide-actions
      >
        <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
          <v-card>
            <v-card-title>
              <h4>{{ props.item.titulo }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>{{ props.item.pais}}</v-list-tile-content>
                <v-list-tile-content>{{ props.item.year }}</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.duracion }} min.</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>{{ props.item.formato }}</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.genero }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Visitas:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  <strong>{{ props.item.sumvisitas }}</strong>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
//var www = ["2018-03-03", "2018-03-05", "2018-03-19"];
export default {
  middleware: ["check-auth", "auth"],
  name: "Peliculas_publicadas",
  data() {
    return {
      fechamenor: null,
      fechamayor: null,
      colores: ["#e63274"],
      //colores: ['#e63274', '#5ac4ee'],
      arrayEvents: ["2019-01-10", "2019-01-20", "2019-01-22"],
      date: null,
      allowedDates: () => false,
      pickerDate: null,

      rowsPerPageItems: [10, 20, 50, 100],
      pagination: {
        rowsPerPage: 100
      }
    };
  },
  computed: {
    ...mapGetters(["salidasProximas", "peliculasCargadas"]),
    lasfechas() {
      let resultado = [];
      for (let index = 0; index < this.salidasProximas.length; index++) {
        resultado.push(this.salidasProximas[index].entrada);
      }
      resultado = resultado.sort();

      this.fechamenor = resultado[1];
      resultado = resultado.reverse();
      this.fechamayor = resultado[0];
      //this.date = resultado[0];
      return this.lodash.uniq(resultado);
    },
    peliculasSubidas() {
      if (this.date) {
        var salida = this.lodash.filter(this.salidasProximas, [
          "entrada",
          this.date
        ]);
        var peliculas = [];
        for (var i = 0; i < salida.length; i++) {
          peliculas[i] = this.lodash.filter(this.peliculasCargadas, [
            "id",
            salida[i].PeliculaId
          ])[0];
        }
        peliculas = this.lodash.sortBy(peliculas, ["titulo"]);

        return peliculas;
      }
    },
    minutosSubidos() {
      return this.lodash.sumBy(this.peliculasSubidas, "duracion");
    },
    cuentaLargos() {
      return this.lodash.countBy(this.peliculasSubidas, function(pelicula) {
        return pelicula.formato === "Largometraje";
      });
    },
    cuentaDocu() {
      return this.lodash.countBy(this.peliculasSubidas, function(pelicula) {
        return pelicula.genero === "Documental";
      });
    }
  },
  watch: {
    pickerDate() {
      console.log("watcher del picker date");
      this.allowedDates = date => this.lasfechas.includes(date);
    }
  },
  mounted() {
    if (this.lasfechas) {
      console.log("existen las fechas");
      this.date = this.lasfechas[0];
      let partes = this.date.split("-");
      //console.log(partes[0]);
      this.pickerDate = partes[0] + "-" + partes[1];
    }
  }
};
</script>

<style lang="css">
</style>
