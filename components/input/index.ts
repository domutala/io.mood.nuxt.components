import { Plugin } from "@nuxt/types";
import Vue from "vue";

import base from "./base";
import input from "./input";
import date from "./date";
import sexe from "./sexe";
import select from "./select";

const plugin: Plugin = () => {
  Vue.component("N2InputBase", base);
  Vue.component("N2Input", input);
  Vue.component("N2InputDate", date);
  Vue.component("N2InputSexe", sexe);
  Vue.component("N2InputSelect", select);
};

export default plugin;
