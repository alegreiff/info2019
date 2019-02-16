<template>
  <v-layout>
    <v-flex xs12>
      <h2>FILM'SS</h2>
      <no-ssr>
        <pre> {{ peliculasCargadas }}</pre>
      </no-ssr>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["check-auth", "auth"],
  computed: {
    ...mapGetters(["peliculasCargadas"])
  }
};
</script>
