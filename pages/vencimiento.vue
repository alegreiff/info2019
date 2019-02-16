<template>
  <v-layout row wrap>
    <v-flex xs12>{{ hoy }} KOY: {{ koy }}</v-flex>
    <v-flex xs10 offset-xs1>
      <v-data-table
        v-if="datosSalidas"
        :headers="headers"
        :items="datosSalidas"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.pelicula }}</td>
          <td
            class="text-xs-left"
            :class="comparafechas(props.item.salida) ? 'alerta' : ''"
          >{{ props.item.salida }}</td>
          <td class="text-xs-left">{{ props.item.entrada }}</td>
          <td class="text-xs-left">{{ props.item.diasactiva }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  middleware: ["check-auth", "auth"],
  data() {
    return {
      koy: new Date().toISOString().substr(0, 10),
      hoy: moment().format("YYYY-MM-DD"),
      pagination: {
        sortBy: "salida",
        descending: true,
        rowsPerPage: 10 // -1 for All
      },
      headers: [
        {
          text: "Película",
          align: "left",
          value: "pelicula"
        },
        {
          text: "Fecha de salida",
          value: "salida"
        },
        {
          text: "Ingreso",
          value: "entrada"
        },
        {
          text: "Días activa",
          value: "diasactiva"
        }
      ],
      datosSalidas: []
    };
  },
  methods: {
    comparafechas(fecha) {
      if (moment(fecha).isSameOrAfter(this.hoy)) {
        console.log(moment(fecha).diff(this.hoy, "days"));
      }

      return moment(fecha).isSameOrAfter(this.hoy);
    }
  },
  computed: {
    ...mapGetters(["salidasProximas"])
  },
  mounted() {
    if (this.salidasProximas) {
      for (let index = 0; index < this.salidasProximas.length; ++index) {
        let salida;
        if (
          moment(this.salidasProximas[index].salida).isSameOrBefore(
            this.hoy,
            "day"
          )
        ) {
          salida = moment(this.salidasProximas[index].salida);
        } else {
          salida = moment(this.hoy);
        }
        this.datosSalidas.push({
          pelicula: this.salidasProximas[index].Pelicula.titulo,
          salida: this.salidasProximas[index].salida,
          entrada: this.salidasProximas[index].entrada,
          diasactiva: salida.diff(this.salidasProximas[index].entrada, "days")
        });
      }
      this.datosSalidas = this.lodash.orderBy(
        this.datosSalidas,
        ["pelicula"],
        ["desc"]
      );
      //this.datosSalidas = this.lodash.filter(this.datosSalidas, function(o) { return (o.salida)!=null});
      //this.datosSalidas = this.lodash.filter(this.datosSalidas, function(o) { return moment(o.salida).isSameOrAfter(moment().format("YYYY-MM-DD"), 'day')});
    }
  }
};
</script>
