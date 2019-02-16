<script>
//Importing Bar class from the vue-chartjs wrapper
import { Bar } from "vue-chartjs";
//Exporting this so it can be used in other components
export default {
  extends: Bar,
  props: {
    datox: Object,
    borde: Number,
    textTitulo: String
  },
  data() {
    return {
      labels: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      options: {
        title: {
          display: true
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  watch: {
    datox(val) {
      this.datox.labels = this.labels;
      this.options.title.text = this.textTitulo;
      this.renderChart(val, this.options);
    }
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.datox.labels = this.labels;
    this.options.title.text = this.textTitulo;
    this.renderChart(this.datox, this.options);
  }
};
</script>