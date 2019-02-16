<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h1>Estadísticas de película...</h1>
    </v-flex>
    <v-flex xs12 md4>
      <v-date-picker
        v-model="picker"
        type="month"
        locale="es-es"
        :min="fechamenor"
        :max="fechamayor"
        color="retinaazul"
        class="elevation-10 mb-1"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 md8>
      <p>Visitas mes: {{ visitasMes }}</p>
      <p>{{ fechalop }}</p>
      <v-btn
        dark
        @click="elpais=null"
        v-bind:class="[ !elpais ? 'btn_activo' : 'btn_inactivo']"
      >Todos los países</v-btn>
      <v-btn
        dark
        v-for="(pais, index) in lospaises"
        :key="index"
        v-bind:class="[ elpais===pais ? 'btn_activo' : 'btn_inactivo']"
        @click="elpais=pais"
        small
      >
        <v-icon
          left
          color="retinaazul"
          disabled
          small
          dark
          v-if="['Colombia', 'Uruguay', 'Perú', 'Ecuador', 'Bolivia', 'México'].includes(pais)"
        >starts</v-icon>
        {{ pais }}
      </v-btn>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>Películas Retina Latina
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Busca por título"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filtroVisitas"
            :pagination.sync="pagination"
            class="elevation-1"
            locale="es-es"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.titulo }}</td>
              <td>{{ props.item.pais }}</td>
              <td class="text-xs-right">{{ props.item.visitas }}</td>
              <td class="text-xs-right">{{ props.item.mes }}</td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found
              no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment";
export default {
  middleware: ["check-auth", "auth"],
  name: "estadisticas_peliculas",
  head: {
    title: "Cómo vamos"
  },
  data() {
    return {
      elpais: null,
      isActive: false,
      search: "",
      mes: null,
      year: null,
      picker: null,
      fechamenor: null,
      fechamayor: null,
      headers: [
        {
          text: "Título",
          align: "left",
          value: "titulo"
        },
        {
          text: "País",
          value: "pais"
        },
        {
          text: "Visitas",
          value: "visitas"
        },
        {
          text: "Mes",
          value: "mes"
        }
      ],
      pagination: {
        sortBy: "temporadas[0].salida",
        descending: true,
        rowsPerPage: 10 // -1 for All
      }
    };
  },
  computed: {
    ...mapGetters(["visitasPeliculas", "peliculasCargadas", "allpaises"]),
    ...mapState(["pais"]),
    fechalop() {
      //return moment(this.picker).format("MMMM YYYY");
      return "Hola";
    },
    lospaises() {
      /* let paises = this.allpaises;
      paises.unshift("Todos los países");
      let unique = [...new Set(paises)]; */
      //return unique;
      return this.allpaises;
    },
    filtroVisitas() {
      var mes = this.mes;
      var year = this.year;
      var pais = this.elpais;
      if (!pais) {
        var salida = this.visitasPeliculas.filter(function(dato) {
          return dato.mes == mes && dato.year == year;
        });
      } else {
        var salida = this.visitasPeliculas.filter(function(dato) {
          return dato.mes == mes && dato.year == year && dato.pais == pais;
        });
      }
      return salida;
    },
    visitasMes() {
      return this.lodash.sumBy(this.filtroVisitas, "visitas");
    }
  },
  methods: {
    nombrePelicula(id) {
      return this.lodash.find(this.peliculasCargadas, ["id", id]).titulo;
    },
    paisPelicula(id) {
      return this.lodash.find(this.peliculasCargadas, ["id", id]).pais;
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
    if (this.visitasPeliculas) {
      let indice = this.visitasPeliculas.length - 1;
      let mes = this.visitasPeliculas[0].mes;
      let year = this.visitasPeliculas[0].year;
      let primermes = this.visitasPeliculas[indice].mes;
      let primeryear = this.visitasPeliculas[indice].year;
      this.picker = year + "-" + mes;
      this.fechamayor = year + "-" + mes;
      this.fechamenor = primeryear + "-" + primermes;
    }
  }
};
</script>
<style>
.btn_inactivo {
  background-color: #5ac4ee !important;
}
.btn_activo {
  background-color: #e63274 !important;
}
.btn_retina {
  border: 2px lime dashed;
}
</style>