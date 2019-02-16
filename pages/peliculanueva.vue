<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <h2 class="text-xs-center">Nuevo filme</h2>
      <v-form>
        <v-layout row wrap>
          <v-flex xs5>
            <v-text-field label="Título" v-model="peliculaNueva.titulo"></v-text-field>
          </v-flex>
          <v-flex xs2></v-flex>
          <v-flex xs5>
            <v-select :items="paises" label="País" outline v-model="peliculaNueva.pais"></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs3>
            <v-select :items="genero" label="Género" outline v-model="peliculaNueva.genero"></v-select>
          </v-flex>
          <v-flex xs2></v-flex>
          <v-flex xs3>
            <v-select :items="formato" label="Formato" outline v-model="peliculaNueva.formato"></v-select>
          </v-flex>
          <v-flex xs2></v-flex>
          <v-flex xs2>
            <v-text-field type="number" label="Año" v-model="peliculaNueva.year"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs3>
            <v-text-field
              type="number"
              label="Duración en minutos"
              v-model="peliculaNueva.duracion"
            ></v-text-field>
          </v-flex>
          <v-flex xs1></v-flex>
          <v-flex xs3>
            <v-dialog
              ref="fechain"
              v-model="modalfechaentrada"
              :return-value.sync="peliculaNueva.temporadas[0].entrada"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="peliculaNueva.temporadas[0].entrada"
                label="Fecha de entrada"
                prepend-icon="event"
                readonly
                @click="modalfechaentrada = true"
              ></v-text-field>
              <v-date-picker v-model="peliculaNueva.temporadas[0].entrada" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modalfechaentrada = false">Cancel</v-btn>
                <v-btn
                  flat
                  color="primary"
                  @click="$refs.fechain.save(peliculaNueva.temporadas[0].entrada)"
                >OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs2></v-flex>
          <v-flex xs3>
            <v-dialog
              ref="fechaout"
              v-model="modalfechasalida"
              :return-value.sync="peliculaNueva.temporadas[0].salida"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="peliculaNueva.temporadas[0].salida"
                label="Fecha de salida"
                prepend-icon="event"
                readonly
                @click="modalfechasalida = true"
              ></v-text-field>
              <v-date-picker v-model="peliculaNueva.temporadas[0].salida" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modalfechasalida = false">Cancel</v-btn>
                <v-btn
                  flat
                  color="primary"
                  @click="$refs.fechaout.save(peliculaNueva.temporadas[0].salida)"
                >OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6 offset-xs3>
            <v-btn color="primary" @click="creaPelicula">Guarda</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>
    <v-flex xs12>
      <pre>{{ peliculaNueva }}</pre>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  middleware: ["check-auth", "auth"],
  data() {
    return {
      modalfechaentrada: false,
      modalfechasalida: false,
      peliculaNueva: {
        temporadas: [{}]
      }
    };
  },
  computed: {
    ...mapState(["genero", "formato"]),
    ...mapGetters(["cuantaspeliculas", "cuantasfechas", "allpaises"]),
    paises() {
      return this.allpaises;
      //return this.pais.sort();
      //return this.allpaises.sort();
    }
  },
  methods: {
    creaPelicula() {
      this.peliculaNueva.id = this.cuantaspeliculas + 1;
      this.peliculaNueva.temporadas[0].id = this.cuantasfechas + 1;

      this.$store.dispatch("creaPelicula", this.peliculaNueva).then(() => {
        this.$router.push("/peliculas");
      });
    }
  }
};
</script>

<style lang="css">
</style>
