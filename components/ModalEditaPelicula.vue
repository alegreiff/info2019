<template >
  <v-dialog v-model="editapelicula" max-width="600" modal :lazy="true" persistent>
    <v-card>
      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex xs9>
              <v-text-field
                label="Nuevo título"
                v-model="peliculaeditada.titulo"
                :disabled="tituloenabled"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-btn color="primary" @click="tituloenabled=!tituloenabled">Editar</v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <table border="1" width="100%">
                <thead>
                  <tr>
                    <th width="30%">Entrada</th>
                    <th width="30%">Salida</th>
                    <th width="40%">Lapso (días)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(fechas, index) in peliculaeditada.temporadas" :key="index">
                    <td>{{ fechas.entrada }}</td>
                    <td>{{ fechas.salida }}</td>
                    <td>{{ lapso(fechas) }}</td>
                  </tr>
                </tbody>
              </table>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="nuevasalida"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="nuevasalida"
                  label="Fecha de salida"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="nuevasalida" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(nuevasalida)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat
          @click="$emit('cierramodaleditapelicula', null, null)"
        >Cerrar</v-btn>
        <v-btn
          v-if="nuevasalida"
          color="green darken-1"
          flat
          @click="$emit('cierramodaleditapelicula', nuevasalida, pelicula.temporadas[0].id)"
        >Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      nuevasalida: null,
      hoy: new Date().toISOString().substr(0, 10),
      modal: false,
      peliculaeditada: this.pelicula
        ? { ...this.pelicula }
        : {
            titulo: ""
          },
      tituloenabled: true
    };
  },
  props: {
    editapelicula: {
      type: Boolean,
      required: true
    },
    pelicula: {
      type: Object,
      required: true
    }
  },
  methods: {
    lapso(fechas) {
      console.log(fechas.salida + " - " + this.hoy);
      let salida;
      if (!fechas.salida) {
        salida = this.hoy;
      } else {
        salida = fechas.salida;
      }
      return moment(salida).diff(fechas.entrada, "days");
    }
  }
};
</script>

