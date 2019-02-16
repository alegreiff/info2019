<template>
  <div class="fichadato retinaazul">
    <span class="periodo">{{ lafecha }}</span>
    <h3>
      <slot name="header"></slot>
    </h3>
    <p class="dato">{{ dato | filtro(filtro) }}</p>
    <footer>
      <v-btn v-if="!fecha" dark color="retinaazul" @click="$emit('muestraG')">Gráfica</v-btn>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: null,
      mes: null
    };
  },
  props: {
    dato: Number,
    fecha: String,
    time: Boolean,
    filtro: String
  },
  computed: {
    lafecha() {
      if (this.fecha) {
        return this.$moment(this.fecha).format("MMMM [de] YYYY");
      } else {
        return "Acumulado";
      }
    }
  },
  watch: {
    fecha(val) {
      if (val) {
        let cadena = val.split("-");
        this.year = cadena[0];
        this.mes = cadena[1];
      }
    }
  },
  methods: {
    minsec(seconds) {
      return this.$moment("1900-01-01 00:00:00")
        .add(seconds, "seconds")
        .format("HH:mm:ss");
    }
  }
};
</script>
<style scoped>
.fichadato {
  border: 2px crimson solid;
}
h3 {
  min-height: 50px;
  background-color: azure;
  padding: 0 0.5em;
  margin: 0;
  font-weight: 200;
}
p.dato {
  font-weight: 800;
  font-size: 1.5em;
  padding: 0;
  margin: 0;
}
span.periodo {
  display: block;
  text-align: right;
  margin: 5px 5px 0 0;
}
span.periodo:first-letter {
  text-transform: capitalize;
}
</style>
<!-- 
<div class="fichadato">
  <h3>Título</h3>
  <p class="dato">el dato</p>
  <footer>
    El cierre
  </footer>
</div>
-->


<!--<v-card class="mx-auto" color="#26c6da" dark min-height="260">
    <v-card-title class="">
      <p class="text-xs-left"><span class="title"><slot name="header"></slot></span></p>
    </v-card-title>
    <v-card-text class="headline font-weight-bold">
      {{ dato | filtro(filtro) }}

    </v-card-text>
    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-content>
          <v-list-tile-title>{{ lafecha }}</v-list-tile-title>
        </v-list-tile-content>
        <v-layout align-center justify-end>
          <span class="subheading">---</span>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
  </v-card>-->