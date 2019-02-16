<template>
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
          :items="peliculas"
          :pagination.sync="pagination"
          class="elevation-1"
          locale="es-es"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <td @click="ventanaModalEditaPelicula(props.item.id)">
              <v-btn flat small color="primary">{{ props.item.titulo }}</v-btn>
              - {{ props.item.temporadas.length }}
            </td>
            <td class="text-xs-right">{{ props.item.duracion }}</td>
            <td class="text-xs-right">{{ props.item.temporadas[0].entrada }}</td>
            <td class="text-xs-right">{{ props.item.temporadas[0].salida }}</td>
            <td class="text-xs-right">{{ props.item.sumvisitas }}</td>
            <td class="text-xs-right">{{ props.item.pais }}</td>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </v-data-table>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-text-field v-model="busca"></v-text-field>
    </v-flex>
    <v-flex xs6>
      <h1>{{ peliculas.length}}</h1>
    </v-flex>
    <v-flex xs4 v-for="(peli, index) in peliculas" :key="index">
      <Pelik
        :pel="peli"
        @activaModal="ventanaModal"
        @activaModalFecha="editafecha"
        :dias="diasalaire(peli)"
      />
    </v-flex>
    <v-dialog v-model="dialog" max-width="480">
      <v-card>
        <v-card-text>
          <Hed/>
          <h3>{{ pelieditada }}</h3>
          <v-text-field label="Nuevo título" v-model="pelinombre"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click="updatePelicula">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="fechasalida" max-width="480" v-if="pelieditada">
      <v-card>
        <v-card-text>
          <Hed/>
          <h3>{{ pelieditada }} - {{ activeFilm.temporadas[0].salida }}</h3>
          <h5>{{ datenovo }}</h5>
          <v-date-picker v-model="datenovo" full-width landscape class="mt-3" locale="es-es"></v-date-picker>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="fechasalida = false">Disagree</v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click="updateFechaSalida(datenovo, activeFilm.temporadas[0].id)"
          >Cambiar fecha de salida</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--EDICIÓN DE PELÍCULA -->
    <ModalEditaPelicula
      v-if="activeFilm"
      :editapelicula="editapelicula"
      @cierramodaleditapelicula="cierraVentanaModalEditaPelicula"
      :pelicula="activeFilm"
    />

    <!--EDICIÓN DE PELÍCULA -->
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  middleware: ["check-auth", "auth"],
  data() {
    return {
      editapelicula: false,
      search: "",
      pagination: {
        sortBy: "temporadas[0].salida",
        descending: true,
        rowsPerPage: 10 // -1 for All
      },
      busca: "",
      dialog: false,
      pelinombre: "",
      pelieditada: null,
      hoy: "",
      salidasfuturas: [],
      fechasalida: false,
      datenovo: new Date().toISOString().substr(0, 10),

      headers: [
        {
          text: "Título (temporadas)",
          align: "left",
          value: "titulo"
        },
        { text: "Duración", value: "duracion" },
        { text: "Entrada", value: "entrada" },
        { text: "Salida", value: "temporadas[0].salida" },
        { text: "Visitas totales", value: "sumvisitas" },
        { text: "Iron (%)", value: "iron" }
      ]
    };
  },
  methods: {
    updateFechaSalida(fs, id) {
      this.fechasalida = false;
      console.log(`La nueva fecha es` + fs + " para el regitro: " + id);
      const lapelifecha = { salida: fs, id: id };

      this.guardafechapeli(lapelifecha);
    },
    ventanaModal(id) {
      this.pelieditada = id;
      this.pelinombre = this.activeFilm.titulo;
      this.dialog = true;
    },
    ventanaModalEditaPelicula(id) {
      this.pelieditada = id;
      this.pelinombre = this.activeFilm.titulo;
      this.editapelicula = true;
    },
    cierraVentanaModalEditaPelicula() {
      /*this.pelieditada = id
      this.pelinombre = this.activeFilm.titulo*/
      this.editapelicula = false;
    },
    editafecha(id) {
      this.pelieditada = id;
      this.pelinombre = this.activeFilm.titulo;
      this.fechasalida = true;
    },
    diasalaire(peli) {
      var dias = 0;
      for (let index = 0; index < peli.temporadas.length; ++index) {
        //if(peli.temporadas[index].salida == null){
        if (
          peli.temporadas[index].salida == null ||
          moment(peli.temporadas[index].salida).isAfter(this.hoy)
        ) {
          dias += moment(this.hoy).diff(peli.temporadas[index].entrada, "days");
          //this.guardafecha(peli.id, peli.temporadas[index].salida)
        } else {
          dias += moment(peli.temporadas[index].salida).diff(
            peli.temporadas[index].entrada,
            "days"
          );
        }
      }
      return dias;
      //moment().format("YYYY-MM-DD");
      //return moment().format("YYYY-MM-DD");
    },
    guardafecha(id, fecha) {
      console.log(id + "  ::: " + fecha);
      //this.salidasfuturas.push('hola')
      this.salidasfuturas.push({ id: id, fecha: fecha });
      //var datoFuturo = {'id': peli.id, 'fecha':  peli.temporadas[index].salida}
    },
    updatePelicula() {
      this.dialog = false;
      console.log(`El nuevo título es` + this.pelinombre);
      const lapeli = { titulo: this.pelinombre, id: this.pelieditada };

      this.guardapeli(lapeli);
    },
    guardapeli(peli) {
      //console.log(peli)
      this.$store.dispatch("cambiaTitulo", peli).then(() => {
        this.$router.push("/peliculas");
      });
    },
    guardafechapeli(peli) {
      console.log(peli);
      this.$store.dispatch("cambiaFechaSalida", peli).then(() => {
        this.$router.push("/peliculas");
      });
    }
  },
  mounted() {
    this.hoy = moment().format("YYYY-MM-DD");
  },
  computed: {
    ...mapGetters(["peliculasCargadas", "salidasProximas"]),
    peliculas() {
      var t = this.busca;
      /**/
      //Para cada película cuente las temporadas. Si es una temporada sigue igual
      //Si hay dos o mas, se comparan //  se ordenan
      for (var i = 0; i < this.peliculasCargadas.length; i++) {
        if (this.peliculasCargadas[i].temporadas.length > 1) {
          console.log(this.peliculasCargadas[i].temporadas.length + " <===");
          this.peliculasCargadas[i].temporadas = this.lodash.orderBy(
            this.peliculasCargadas[i].temporadas,
            ["entrada"],
            ["desc"]
          );
        }
      }
      /**/
      return this.lodash.filter(this.peliculasCargadas, function(o) {
        return o.titulo.includes(t);
      });
      //return this.lodash.filter(this.peliculasCargadas, function(o) { return o.activa === 'SI' });
    },
    activeFilm() {
      return this.lodash.find(this.peliculasCargadas, { id: this.pelieditada });
    }
  },
  watch: {
    fechasalida(val) {
      if (!val) {
        this.datenovo = new Date().toISOString().substr(0, 10);
        this.pelieditada = null;
      }
    },
    dialog(val) {
      if (!val) {
        this.pelieditada = null;
      }
    },
    editapelicula(val) {
      if (!val) {
        this.pelieditada = null;
      }
    }
  }
};
</script>

<style lang="css">
</style>
