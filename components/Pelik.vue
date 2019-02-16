<template>
  <v-card>


        <v-card-title primary-title>
          <div>
            <h4 class="mb-4">{{ pel.titulo }}</h4>
            <h6><pre>{{ pel.temporadas }}</pre> </h6>
            <div>{{ pel.duracion }}</div>
            <v-btn flat color="blue" @click="$emit('activaModal', pel.id)">Cambia {{pel.id}}</v-btn>
            <v-btn color="primary" @click="$emit('activaModalFecha', pel.id)">{{dias - 1 }}</v-btn>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">{{ pel.sumvisitas }}</v-btn>
          <v-btn flat color="red">{{ pel.pais }}</v-btn>
          <v-btn flat color="orange">{{ pel.year }}</v-btn>

        </v-card-actions>
</v-card>
</template>
<script>
export default {

  props: {
    pel: {
      type: Object,
      required: true
    },
    dias: {
      type: Number
    }
  }
}
</script>
