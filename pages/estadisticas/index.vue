<template>
  <v-layout row wrap>
    <v-flex xs4>
      <pre> {{ muestradatos(activas) }} </pre>
    </v-flex>
    <v-flex xs4>
      <pre> {{ muestradatos(peliculasCargadas) }} </pre>
    </v-flex>
    <v-flex xs4>
      <pre> {{ muestradatos(inactivas) }} </pre>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["check-auth", "auth"],
  name: "estadisticas_base",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["peliculasCargadas"]),
    activas() {
      return this.lodash.filter(this.peliculasCargadas, ["activa", "SI"]);
    },
    inactivas() {
      return this.lodash.filter(this.peliculasCargadas, ["activa", "NO"]);
    }
  },
  methods: {
    muestradatos(conjunto) {
      let salida = [];
      salida.push({ cantidad: conjunto.length });
      salida.push({
        largos: this.lodash.filter(conjunto, ["formato", "Largometraje"]).length
      });
      salida.push({
        cortos: this.lodash.filter(conjunto, ["formato", "Cortometraje"]).length
      });
      salida.push({
        documentales: this.lodash.filter(conjunto, ["genero", "Documental"])
          .length
      });
      salida.push({
        ficciones: this.lodash.filter(conjunto, ["genero", "Ficción"]).length
      });
      salida.push({ minutos: this.lodash.sumBy(conjunto, "duracion") });

      return salida;
    }
  }
};
</script>

<style scoped>
</style>