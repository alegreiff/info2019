<template>
  <v-layout row wrap>
    <v-flex xs3>
      <v-card>
        <v-card-title>
          {{ filtroPeliculas.length > 0 ? '' : 'Sin resultados' }}
          <v-chip outline color="retinaazul" v-if="valorfiltro">{{valorfiltro }}</v-chip>
          <v-chip outline color="retinaazul" v-else>Todos los países</v-chip>
          <v-chip
            outline
            color="retinaazul"
            v-if="activas != 'ALL'"
          >{{ activas==='SI' ? 'Activas' : 'Inactivas' }}</v-chip>
          <v-chip outline color="retinaazul" v-else>Activas e inactivas</v-chip>
          <v-chip
            outline
            color="retinaazul"
            v-if="formato != 'ALL'"
          >{{ formato ==='Largometraje' ? 'Largometrajes' : 'Cortometrajes' }}</v-chip>
          <v-chip outline color="retinaazul" v-else>Todos los formatos</v-chip>
          <v-chip
            outline
            color="retinaazul"
            v-if="genero != 'ALL'"
          >{{ genero==='Ficción' ? 'Ficción' : 'Documental' }}</v-chip>
          <v-chip outline color="retinaazul" v-else>Todos los géneros</v-chip>
        </v-card-title>
        <v-divider></v-divider>

        <v-list dense v-if="filtroPeliculas.length > 0">
          <v-list-tile>
            <v-list-tile-content>{{ filtroPeliculas.length }} películas</v-list-tile-content>
            <!-- <v-list-tile-content class="align-end"></v-list-tile-content> -->
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Duración:</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <strong>{{ minutosSubidos | milesNumero }} min.</strong>
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
        <v-card-actions color="red">Fecha actual: {{ datenovo}}</v-card-actions>
      </v-card>
      <v-layout column wrap justify-center align-center>
        <v-flex xs6 class="font-weight-black">País:</v-flex>
        <v-flex xs6>
          <v-menu offset-x top>
            <v-btn dark color="retinaazul" slot="activator">
              {{ !valorfiltro ? 'Todos los países' : valorfiltro }}
              <v-icon right>touch_app</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="campofiltro=null, valorfiltro=null">
                <v-list-tile-title>Todos los países</v-list-tile-title>
              </v-list-tile>
              <v-list-tile
                v-for="(pais, index) in allpaises"
                :key="index"
                @click="campofiltro='pais', valorfiltro=pais"
              >
                <v-list-tile-title>{{ pais }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
        <v-flex xs6 class="font-weight-black">Activas / inactivas:</v-flex>
        <v-flex xs6>
          <v-menu offset-x top>
            <v-btn dark color="retinaazul" slot="activator">
              {{ activas==='ALL' ? 'Películas activas e inactivas' : activas==='SI' ? 'Películas activas' : 'Películas inactivas'}}
              <v-icon right>touch_app</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="activas = 'ALL'">
                <v-list-tile-title>Películas activas e inactivas</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="activas = 'SI'">
                <v-list-tile-title>Películas activas</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="activas = 'NO'">
                <v-list-tile-title>Películas inactivas</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
        <v-flex xs6 class="font-weight-black">Formato:</v-flex>
        <v-flex xs6>
          <v-menu offset-x top>
            <v-btn dark color="retinaazul" slot="activator">
              {{ formato==='ALL' ? 'Todos los formatos' : formato==='Largometraje' ? 'Largometrajes' : 'Cortometrajes'}}
              <v-icon right>touch_app</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="formato = 'ALL'">
                <v-list-tile-title>Todos los formatos</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="formato = 'Largometraje'">
                <v-list-tile-title>Largometrajes</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="formato = 'Cortometraje'">
                <v-list-tile-title>Cortometrajes</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
        <v-flex xs6 class="font-weight-black">Género:</v-flex>
        <v-flex xs6>
          <v-menu offset-x top>
            <v-btn dark color="retinaazul" slot="activator">
              {{ genero==='ALL' ? 'Ficción y documental' : formato==='Ficción' ? 'Ficción' : 'Documental'}}
              <v-icon right>touch_app</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="genero = 'ALL'">
                <v-list-tile-title>Ficción y documental</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="genero = 'Ficción'">
                <v-list-tile-title>Ficción</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="genero = 'Documental'">
                <v-list-tile-title>Documental</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs1></v-flex>
    <v-flex xs8>
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
          no-data-text="Sin datos"
          no-results-text="Sin datos"
          :items="filtroPeliculas"
          :pagination.sync="pagination"
          class="elevation-1"
          locale="es-es"
          :search="search"
          rows-per-page-text="Películas por página"
        >
          <template slot="items" slot-scope="props">
            <td
              class="text-xs-left pelicula"
              :class="props.item.activa==='SI' ? 'titulopelicula' : 'titulomalo'"
            >
              <v-btn
                v-if="correoactivo === 'alegreiff@gmail.com'"
                flat
                small
                color="primary"
                @click="ventanaModalEditaPelicula(props.item.id)"
              >Editar {{props.item.id}}</v-btn>
              <span>{{ props.item.titulo }}</span>
            </td>
            <td class="text-xs-left">{{ props.item.temporadas.length }}</td>
            <td class="text-xs-left">{{ props.item.duracion }}</td>
            <td class="text-xs-left">{{ props.item.temporadas[0].entrada }}</td>
            <td class="text-xs-left">{{ props.item.temporadas[0].salida }}</td>
            <td class="text-xs-left">{{ props.item.sumvisitas | milesNumero }}</td>
            <td class="text-xs-left">{{ props.item.pais }}</td>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >La búsqueda de "{{ search }}" no tiene resultado.</v-alert>
        </v-data-table>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-text-field v-model="busca"></v-text-field>
    </v-flex>
    <v-flex xs6>
      <h1>{{ filtroPeliculas.length}}</h1>
    </v-flex>
    <v-flex xs4 v-for="(peli, index) in peliculas" :key="index">
      <!-- <Pelik
        :pel="peli"
        @activaModal="ventanaModal"
        @activaModalFecha="editafecha"
        :dias="diasalaire(peli)"
      />-->
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
import { mapGetters, mapState } from "vuex";
import moment from "moment";
export default {
  middleware: ["check-auth", "auth"],
  data() {
    return {
      environment: {},
      activas: "SI",
      formato: "ALL",
      genero: "ALL",
      campofiltro: null,
      valorfiltro: null,
      editapelicula: false,
      search: "",
      pagination: {
        sortBy: "temporadas[0].entrada",
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
          value: "titulo",
          width: "500px"
        },
        { text: "Activaciones", value: "temporadas.length", align: "left" },
        { text: "Duración", value: "duracion", align: "left" },
        { text: "Entrada", value: "entrada", align: "left" },
        { text: "Salida", value: "temporadas[0].salida", align: "left" },
        { text: "Visitas totales", value: "sumvisitas", align: "left" },
        { text: "País", value: "pais", align: "left" }
      ]
    };
  },
  methods: {
    updateFechaSalida(fs, id) {
      this.fechasalida = false;
      console.log(`La nueva fecha es` + fs + " para el registro: " + id);
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
    cierraVentanaModalEditaPelicula(salida, id) {
      /*this.pelieditada = id
      this.pelinombre = this.activeFilm.titulo*/
      if (!salida) {
        console.log("cancela guardado");
      } else {
        console.log(`La nueva salida es ${salida} para el filme ${id}`);
        this.updateFechaSalida(salida, id);
      }
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
        this.$router.push("/vencimiento");
      });
    }
  },
  mounted() {
    this.hoy = moment().format("YYYY-MM-DD");
    this.environment = (process.env.PAIS, process.env.NOMUSER);
  },
  computed: {
    ...mapGetters([
      "peliculasCargadas",
      "salidasProximas",
      "correoactivo",
      "allpaises"
    ]),
    ...mapState(["retinapais"]),
    peliculas() {
      /*var t = this.busca;
      return this.lodash.filter(this.peliculasCargadas, function(o) {
        return o.titulo.includes(t);
      });*/
      if (this.activas === "SI") {
        return this.lodash.filter(this.peliculasCargadas, function(o) {
          return o.activa === "SI";
        });
      } else if (this.activas === "NO") {
        return this.lodash.filter(this.peliculasCargadas, function(o) {
          return o.activa === "NO";
        });
      } else {
        return this.peliculasCargadas;
      }

      //return this.peliculasCargadas;
    },
    minutosSubidos() {
      return this.lodash.sumBy(this.filtroPeliculas, "duracion");
    },
    cuentaLargos() {
      return this.lodash.countBy(this.filtroPeliculas, function(pelicula) {
        return pelicula.formato === "Largometraje";
      });
    },
    cuentaDocu() {
      return this.lodash.countBy(this.filtroPeliculas, function(pelicula) {
        return pelicula.genero === "Documental";
      });
    },
    filtroPeliculas() {
      let campo = this.campofiltro;
      let valor = this.valorfiltro;

      let salida;
      if (!campo || !valor) {
        salida = this.peliculas;
      } else {
        salida = this.lodash.filter(this.peliculas, { [campo]: valor });
      }

      if (this.formato != "ALL") {
        let valformato = this.formato;
        salida = this.lodash.filter(salida, { formato: valformato });
      }

      if (this.genero != "ALL") {
        let valgenero = this.genero;
        salida = this.lodash.filter(salida, { genero: valgenero });
      }

      /*return this.lodash.filter(this.peliculasCargadas, function(o) {
        return o.['campo'] == valorfiltro;
      });*/
      return salida;
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
