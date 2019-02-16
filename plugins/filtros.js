import Vue from "vue";
import moment from "moment";

const filtrobase = function(value, modo) {
  if (modo == "fminsec") {
    return moment("1900-01-01 00:00:00")
      .add(value, "seconds")
      .format("HH:mm:ss");
  } else if (modo == "fdec2") {
    let num = value.toFixed(2);
    return `${num.toLocaleString()}`;
  } else if (modo == "fdec2%") {
    let num = value.toFixed(2);
    return `${num.toLocaleString()}%`;
  } else {
    return `${value.toLocaleString()}`;
  }
};

Vue.filter("capitalize", val => val.toUpperCase());
Vue.filter("milesNumero", val => val.toLocaleString());
Vue.filter("filtro", filtrobase);
