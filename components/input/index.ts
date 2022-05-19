import { Plugin } from "@nuxt/types";
import Vue from "vue";

import base from "./base";
import input from "./input";

const plugin: Plugin = () => {
  Vue.component("N2InputBase", base);
  Vue.component("N2Input", input);
};

export default plugin;
