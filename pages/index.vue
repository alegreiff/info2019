<template>
  <v-layout row wrap text-xs-center>
    <v-flex xs12>-- {{ esAutenticado }} -- ESTADO LOGIN: {{ estadologin }}</v-flex>
    <v-flex xs4>
      <v-btn dark color="retinaazul" @click="abreLogin">Acceder a estadísticas Retina Latina</v-btn>
    </v-flex>
    <v-flex xs4>
      <v-btn dark color="retinaazul" @click="abreSolicitaracceso">Solicitar acceso</v-btn>
    </v-flex>
    <v-flex xs4>
      <v-btn dark color="retinaazul" @click="abreRestablecer">Restablecer contraseña</v-btn>
    </v-flex>
    <!-- MODAL LOGIN -->
    <v-dialog v-model="modallogin" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Acceder a las estadísticas de Retina Latina</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form v-model="valid" v-if="!esAutenticado">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                          ref="focoinicial"
                          v-model="email"
                          :rules="emailRules"
                          label="Correo electrónico"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'visibility_off' : 'visibility'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Contraseña"
                          hint="Por lo menos 8 caracteres"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
              <v-flex xs10 offset-xs1>
                <p class="mensajeError">{{ estadologin }}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="valid && !esAutenticado" color="success" @click="onSubmit">Enviar</v-btn>
          <v-btn
            v-if="estadologin==='Ingreso exitoso'"
            color="success"
            @click="accesoexitoso"
          >Continuar</v-btn>

          <v-btn color="blue darken-1" flat @click="modallogin = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- FIN MODAL LOGIN -->
    <!-- MODAL SOLICITAACESO -->
    <v-dialog v-model="modalacceso" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Solicitud de acceso</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form v-model="valid_solicitaaceso">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                          ref="focoinicialacceso"
                          v-if="status_solicitaacceso!=200"
                          v-model="email_solicitaaceso"
                          :rules="emailRules"
                          label="Correo electrónico"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs10 offset-xs1>{{ mensaje_solicitaacceso }}</v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="valid_solicitaaceso && status_solicitaacceso!=200"
            color="blue darken-1"
            flat
            @click="enviaEmail"
          >Envía</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="modalacceso = false, mensaje_solicitaacceso = null, status_solicitaacceso = null, email_solicitaaceso=''"
          >Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- FIN MODAL SOLICITAACESO -->
    <!-- MODAL RESTABLECER -->
    <v-dialog v-model="modalrestablecer" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Restablecer contraseña</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form v-model="valid_restablecer">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                          ref="focoinicialrestablecer"
                          v-model="email_restablecer"
                          :rules="emailRules"
                          label="Correo electrónico"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs10 offset-xs1>{{ mensaje_restablecer }}</v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="valid_restablecer && !status_restablecer"
            color="blue darken-1"
            flat
            @click="restablecerpassword"
          >Enviar solicitud</v-btn>
          <v-btn
            v-if="status_restablecer==400"
            color="blue darken-1"
            flat
            @click="modalrestablecer = false, modalacceso=true, email_solicitaaceso = email_restablecer"
          >Solicitar acceso</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="modalrestablecer = false, email_restablecer=''"
          >Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- FIN MODAL RESTABLECER -->
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";
export default {
  middleware: ["check-auth", "auth", "biko"],
  head: {
    script: [
      { src: "https://cdn.emailjs.com/sdk/2.3.2/email.min.js" }
      /* { src: "js/emailjs.js" } */
    ]
  },
  data() {
    return {
      modallogin: false,
      modalacceso: false,
      modalrestablecer: false,
      /* FORMULARIO LOGIN*/
      valid: false,
      email: "",
      emailRules: [
        v => !!v || "Debe escribir una dirección de correo",
        v => /.+@.+/.test(v) || "El correo debe ser válido"
      ],
      password: "Password",
      show1: false,
      rules: {
        required: value => !!value || "Requerido.",
        min: v => v.length >= 8 || "Mínimo 8 caracteres"
      },
      /* FIN FORMULARIO LOGIN*/
      /* FORMULARIO SOLICITUD DE ACCESO*/
      email_solicitaaceso: "",
      valid_solicitaaceso: false,
      mensaje_solicitaacceso: null,
      status_solicitaacceso: null,
      /* FIN FORMULARIO SOLICITUD DE ACCESO*/
      /* FORMULARIO RESTABLECER CONTRASEÑA*/
      email_restablecer: "",
      valid_restablecer: false,
      mensaje_restablecer: null,
      status_restablecer: null
      /* FIN FORMULARIO RESTABLECER CONTRASEÑA*/
    };
  },
  computed: {
    ...mapGetters(["esAutenticado"]),
    ...mapState(["estadologin"])
  },
  methods: {
    abreLogin() {
      this.modallogin = true;
      if (this.$refs.focoinicial) {
        this.$nextTick(() => this.$refs.focoinicial.focus());
      }
    },
    abreSolicitaracceso() {
      this.modalacceso = true;

      if (this.$refs.focoinicialacceso) {
        this.$nextTick(() => this.$refs.focoinicialacceso.focus());
      }
    },
    abreRestablecer() {
      this.modalrestablecer = true;

      if (this.$refs.focoinicialrestablecer) {
        this.$nextTick(() => this.$refs.focoinicialrestablecer.focus());
      }
    },

    onSubmit() {
      this.$store.dispatch("authenticateUser", {
        email: this.email,
        password: this.password
      });
    },
    accesoexitoso() {
      this.modallogin = false;
      this.$router.push("/base");
    },
    enviaEmail() {
      let mensaje_respuesta;
      var templateParams = {
        to_name: "Querido James",
        correo: this.email_solicitaaceso,
        message_html: `Welcome to EmailJS documentation! Here are a few good places to start:`
      };
      emailjs.init("user_wYDPvWn76KJLnrjUWgmAD");
      emailjs
        .send("gmail", "solicitaaceso", templateParams)
        .then(res => {
          this.status_solicitaacceso = res.status;
          this.mensaje_solicitaacceso = `Mensaje enviado. Muy pronto recibirá respuesta e indicaciones al correo ${
            this.email_solicitaaceso
          }`;
          console.log(res);
        })
        .catch(error => {
          this.status_solicitaacceso = res.status;
          this.mensaje_solicitaacceso = `La cagamos y mal ${error.text}`;
          console.log(error);
        });
      //this.mensaje_solicitaacceso = mensaje_respuesta;
    },
    restablecerpassword() {
      let authURL =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyCcS-fd7pP5fpQbNXtLvABn0ZWUQE2L8S4";
      return axios
        .post(authURL, {
          email: this.email_restablecer,
          requestType: "PASSWORD_RESET"
        })
        .then(result => {
          console.log(result.status);
          this.status_restablecer = result.status;
          this.mensaje_restablecer =
            "Solicitud enviada. Consulte su correo electrónico para continuar con el cambio de la contraseña";
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data.error.message);
            console.log(err.response.status);
            this.status_restablecer = err.response.status;
            this.mensaje_restablecer = `El correo no ha sido activado para las Estadísticas de Retina Latina. Por favor solicite su acceso.`;
            //status_restablecer
          }
        });
    }
  }
};
</script>

<style scoped>
p.mensajeError {
  color: red;
  font-weight: 400;
  font-size: 1.4em;
}
</style>